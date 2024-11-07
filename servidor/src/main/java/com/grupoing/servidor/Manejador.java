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

public abstract class Manejador implements HttpHandler {
    URI uri;

    @Override
    public void handle(HttpExchange he) throws IOException, JsonProcessingException {
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }
        
        uri = he.getRequestURI();
        
        String response = null;
        String token = null;
        int codigo_respuesta = 200;
        // manejar acceso no autorizado
        try {
            token = he.getRequestHeaders().getFirst("Authorization").split(" ")[1];
            if (!Autorización.validarToken(Autorización.ACCESO, token)) {
                response = "USUARIO NO VALIDO";
                codigo_respuesta = 403;
            } else {

                String método = he.getRequestMethod();
                try {

                } catch (Exception ex) {
                    codigo_respuesta = 500;
                    response = "Error de " + método.toUpperCase() + ". No se pudo leer la entrada.";
                }
                if (método.equalsIgnoreCase("get")) {
                    response = manejarGet(he);
                } else if (método.equalsIgnoreCase("post")) {
                    response = manejarPost(he);
                } else if (método.equalsIgnoreCase("PATCH")) {
                    response = manejarPatch(he);
                } else if (método.equalsIgnoreCase("DELETE")) {
                    response = manejarDelete(he);
                } else {
                    codigo_respuesta = 501;
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

    protected abstract String manejarPatch(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception;

    protected abstract String manejarDelete(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception;

    protected static String obtenerParámetros(URI requestUri, String clave) throws UnsupportedEncodingException {
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
