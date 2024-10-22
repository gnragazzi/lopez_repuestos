package com.grupoing.servidor;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class manejadorRefresh implements HttpHandler{

    @Override
    public void handle(HttpExchange he) throws IOException {
        String refreshToken = null; 
        String response;
        if (he.getRequestHeaders().containsKey("Cookie")) {
            refreshToken = obtenerToken(he);
//            System.out.println("REFRESH TOKEN: "+refreshToken);   
        }
        
        if(Autorización.validarToken(Autorización.REFRESH,refreshToken))
            response = "Se genera un nuevo token de acceso";
        else
            response = "Este token ya no es válido... Tiene que volverse a logear"; 

        String origin = he.getRequestHeaders().get("Origin").get(0);

        he.getResponseHeaders().add("Access-Control-Allow-Origin", origin);
        he.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");
        
        he.getResponseHeaders().set("Content-Type", "application/json"); 
        he.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
    protected String obtenerToken(HttpExchange he) throws UnsupportedEncodingException {
        String cookies = he.getRequestHeaders().get("Cookie").get(0);
        
        Map<String, Object> cookies_separadas = new HashMap<String, Object>();
        
        if (cookies != null) {
            String pairs[] = cookies.split("[;]");
            for (String pair : pairs) { 
                String param[] = pair.split("[=]");
                String key = null;
                String value = null;
                if (param.length > 0) {
                    key = URLDecoder.decode(param[0], System.getProperty("file.encoding"));
                }
                if (param.length > 1) {
                    value = URLDecoder.decode(param[1], System.getProperty("file.encoding"));
                }
                if (cookies_separadas.containsKey(key)) {
                    Object obj = cookies_separadas.get(key);
                    if (obj instanceof List<?>) {
                        List values = (List) obj;
                        values.add(value);
                    } else if (obj instanceof String) {
                        List values = new ArrayList();
                        values.add((String) obj);
                        values.add(value);
                        cookies_separadas.put(key, values);
                    }
                } else {
                    cookies_separadas.put(key, value);
                }
            }
        }
        return (String) cookies_separadas.get("refresh");
    }
    
    
}
