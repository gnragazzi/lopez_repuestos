package com.grupoing.servidor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class manejadorRefresh implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {
        String response;
        String refreshToken = he.getRequestHeaders().containsKey("Cookie") ? obtenerToken(he) : null;
        int codigo_respuesta = 0;

        if (Autorización.validarToken(Autorización.REFRESH, refreshToken)) {
            System.out.println("Se solicito un nuevo token...");
            String jwtToken = Autorización.nuevoTokenDeAcceso();
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            Respuesta obRespuesta = new Respuesta("Nuevo Token", jwtToken);
            response = ow.writeValueAsString(obRespuesta);
            codigo_respuesta = 200;
        } else {
            response = "Este token ya no es válido... Tiene que volverse a logear";
            codigo_respuesta = 401;
        }

        String origin = he.getRequestHeaders().get("Origin").get(0);
        he.getResponseHeaders().add("Access-Control-Allow-Origin", origin);
        he.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");

        he.getResponseHeaders().set("Content-Type", "application/json");
        he.sendResponseHeaders(codigo_respuesta, response.getBytes().length);
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

    private class Respuesta {

        String msj;
        String Token;

        public Respuesta(String msj, String Token) {
            this.msj = msj;
            this.Token = Token;
        }

        public String getToken() {
            return Token;
        }

        public String getMsj() {
            return msj;
        }

        public void setMsj(String msj) {
            this.msj = msj;
        }

        public void setToken(String Token) {
            this.Token = Token;
        }

    }
}
