package com.grupoing.servidor;

import Clases.Mecanico;
import IDaoImpl.MecanicoDAOImpl;
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
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDate;
import java.util.logging.Level;
import java.util.logging.Logger;

public class manejadorMecanicos implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }
 
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule()); 
        mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

        try {
            MecanicoDAOImpl mecanicoDAO= new MecanicoDAOImpl();
            ArrayList<Mecanico> mecanicos=new ArrayList<>();
            mecanicos= mecanicoDAO.list();
            String response = ow.writeValueAsString(mecanicos);
            he.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = he.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(manejadorMecanicos.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(manejadorMecanicos.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void parseQuery(String query, Map<String, Object> parameters) throws UnsupportedEncodingException {
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
    }
}
