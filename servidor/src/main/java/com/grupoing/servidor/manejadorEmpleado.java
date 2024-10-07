package com.grupoing.servidor;

import Clases.Camion;
import Clases.Chofer;
import Clases.Empleado;
import Clases.Seguro;
import Clases.Semirremolque;
import Clases.Tarjeta_Ruta;
import Clases.Tecnica;
import Clases.Vehiculo;
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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;

public class manejadorEmpleado implements HttpHandler {

    @Override

    public void handle(HttpExchange he) throws IOException {
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }
        String método = he.getRequestMethod();
        String response;

        if (método.equalsIgnoreCase("get")) {
            response = manejarGet(he);
        } else if (método.equalsIgnoreCase("post")) {
            response = manejarPost(he);
        } else {
            response = "MÉTODO NO IMPLEMENTADO";
        }

        // parse request 
        he.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    public String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException {

        String tipo = obtenerParámetros(he.getRequestURI(), "tipo");

        ArrayList<Empleado> empleados = new ArrayList<>();
        if (tipo == null) {
            //Es decir, en este caso no se quiso acceder a ningún tipo de empleado en particular, y se busca camiones y semiremolques por igual
        } else if (tipo.equalsIgnoreCase("chofer")) {
            //en este caso, solo se buscan choferes
            //se debería buscar la lista completa de camiones en la BD
            Chofer ch1 = new Chofer();
            ch1.setDni("31999766");
            Chofer ch2 = new Chofer();
            ch2.setDni("33069732");
            Chofer ch3 = new Chofer();
            ch3.setDni("31999999");
            Chofer ch4 = new Chofer();
            ch4.setDni("35703559");
            empleados.add(ch1);
            empleados.add(ch2);
            empleados.add(ch3); 
            empleados.add(ch4);

        } else if (tipo.equalsIgnoreCase("mecánico")) {
            // implementar lógica de búsqueda de mecánicos
        } else {
            //entonces está intentando acceder a un tipo incorrecto, por lo que el mensaje de respuesta debería ser 404
        }
        // send response

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(empleados);
    }

    public String manejarPost(HttpExchange he) {
        //IMPLEMENTAR MÉTODOS PARA SUBIR 
        return "POST REQUEST";
    }

    public String obtenerParámetros(URI requestUri, String clave) throws UnsupportedEncodingException {
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
