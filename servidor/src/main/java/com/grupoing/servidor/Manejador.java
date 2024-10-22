package com.grupoing.servidor;

import com.fasterxml.jackson.core.JsonProcessingException;
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
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class Manejador implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException, JsonProcessingException {
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");     
        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }
        String response = null;
        String token = null;
        int codigo_respuesta = 200;
        // manejar acceso no autorizado
        try { 
            token = he.getRequestHeaders().getFirst("Authorization").split(" ")[1];
            if (!Autorización.decode(token)) {
                response = "USUARIO NO VALIDO";
            } else {

                String método = he.getRequestMethod();

                if (método.equalsIgnoreCase("get")) {
                    try {
                        response = manejarGet(he);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(manejadorEmpleado.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (Exception ex) {
                        Logger.getLogger(manejadorEmpleado.class.getName()).log(Level.SEVERE, null, ex);
                    }
                } else if (método.equalsIgnoreCase("post")) {
                    try {
                        response = manejarPost(he);
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(Manejador.class.getName()).log(Level.SEVERE, null, ex);
                    } catch (Exception ex) {
                        Logger.getLogger(Manejador.class.getName()).log(Level.SEVERE, null, ex);
                    }
                } else {
                    response = "MÉTODO NO IMPLEMENTADO";
                }
            }
        } catch (Exception ex) {
            // NO SE PROPORCIONÓ UN TOKEN
            response = "NO PROPORCIONÓ UN TOKEN VÁLIDO";
            codigo_respuesta = 401;
        }

        // parse request 
        he.getResponseHeaders().set("Content-Type", "application/json");
        he.sendResponseHeaders(codigo_respuesta, response.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    protected abstract String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception;

    protected abstract String manejarPost(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception;

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
