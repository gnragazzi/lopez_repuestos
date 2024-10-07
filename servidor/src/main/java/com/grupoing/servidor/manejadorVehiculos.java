package com.grupoing.servidor;

import Clases.Camion;
import Clases.Seguro;
import Clases.Semirremolque;
import Clases.Tarjeta_Ruta;
import Clases.Tecnica;
import Clases.Vehiculo;
import IDaoImpl.CamionDAOImpl;
import IDaoImpl.SemirremolqueDAOImpl;
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
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;

public class manejadorVehiculos implements HttpHandler {

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    LocalDate fecha = LocalDate.parse("2024-08-15");

    @Override

    public void handle(HttpExchange he) throws IOException {
//        System.out.println("HOLA"); 
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }
        // parse request
        String tipo = obtenerParámetros(he.getRequestURI(), "tipo");

        ArrayList<Vehiculo> vehiculos = new ArrayList<>();
        if (tipo == null) {
            CamionDAOImpl camionDAO;
            try {
                camionDAO = new CamionDAOImpl();
                ArrayList<Camion> camiones = camionDAO.list();
                SemirremolqueDAOImpl semirremolqueDAO = new SemirremolqueDAOImpl();
                ArrayList<Semirremolque> semirremolques = semirremolqueDAO.list();

                Iterator<Camion> iteratorCamion = camiones.iterator();
                while (iteratorCamion.hasNext()) {
                    vehiculos.add(iteratorCamion.next());
                }

                Iterator<Semirremolque> iteratorSemirremolque = semirremolques.iterator();
                while (iteratorSemirremolque.hasNext()) {
                    vehiculos.add(iteratorSemirremolque.next());
                }

            } catch (ClassNotFoundException ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
            } catch (Exception ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (tipo.equalsIgnoreCase("camion")) {
            try {
                CamionDAOImpl camionDAO;
                camionDAO = new CamionDAOImpl();
                ArrayList<Camion> camiones = camionDAO.list();
                Iterator<Camion> iteratorCamion = camiones.iterator();
                while (iteratorCamion.hasNext()) {
                    vehiculos.add(iteratorCamion.next());
                }

            } catch (ClassNotFoundException ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
            } catch (Exception ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (tipo.equalsIgnoreCase("semiremolque")) {
            try {
                SemirremolqueDAOImpl semirremolqueDAO = new SemirremolqueDAOImpl();
                ArrayList<Semirremolque> semirremolques = semirremolqueDAO.list();
                Iterator<Semirremolque> iteratorSemirremolque = semirremolques.iterator();
                while (iteratorSemirremolque.hasNext()) {
                    vehiculos.add(iteratorSemirremolque.next());
                }

            } catch (ClassNotFoundException ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
            } catch (Exception ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            //entonces está intentando acceder a un tipo incorrecto, por lo que el mensaje de respuesta debería ser 404 
        }
        // send response

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String response = ow.writeValueAsString(vehiculos);
        he.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
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
