package com.grupoing.servidor;

import Clases.Chofer;
import IDaoImpl.ChoferDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class update_chofer implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException, JsonProcessingException {

        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }
        String response = "Actualización Correcta";
        int codigo_respuesta = 200;
        
        
        Chofer chofer = new Chofer(LocalDate.parse("1918-09-24"), null, "35703579", "321-8", "Verónica", "Cortiñescas", "La patadita 321", LocalDate.parse("1985-12-24"), "2664 6",true);
        
        try {
            ChoferDAOImpl cdi = new ChoferDAOImpl();
            cdi.update(chofer,"35703579");  
        } catch (Exception ex) {
            System.out.println(ex.getMessage()); 
            response = "No se encontró...";
            codigo_respuesta = 404;
        }
        

        // parse request 
        he.getResponseHeaders().set("Content-Type", "application/json");
        he.sendResponseHeaders(codigo_respuesta, response.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }


    protected String obtenerParámetros(URI requestUri, String clave) throws UnsupportedEncodingException {
        Map<String, Object> parameters = new HashMap<String, Object>();
        String query = requestUri.getRawQuery();
        if (query != null) {
            String pairs[] = query.split("[&]");
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
                if (parameters.containsKey(key)) {
                    Object obj = parameters.get(key);
                    if (obj instanceof List<?>) {
                        List values = (List) obj;
                        values.add(value);
                    } else if (obj instanceof String) {
                        List values = new ArrayList();
                        values.add((String) obj);
                        values.add(value);
                        parameters.put(key, values);
                    }
                } else {
                    parameters.put(key, value);
                }
            }
        }
        return (String) parameters.get(clave);
    }
}
