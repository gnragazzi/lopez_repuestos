package com.grupoing.servidor;

import Clases.Camion;
import Clases.Chofer;
import Clases.Semirremolque;
import Clases.Viaje;
import IDaoImpl.ViajeDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

public class manejadorViaje implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException, UnsupportedEncodingException {
        // CON ESTO SOLUCIONAMOS EL PROBLEMA DEL CORS
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }

        String response = null;

        String método = he.getRequestMethod();

        if (método.equalsIgnoreCase("post")) {
            try {
                response = manejarPost(he);
            } catch (Exception ex) {
                Logger.getLogger(manejadorViaje.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (método.equalsIgnoreCase("get")) {
            try {
                response = manejarGet(he);
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(manejadorViaje.class.getName()).log(Level.SEVERE, null, ex);
            } catch (Exception ex) {
                Logger.getLogger(manejadorViaje.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else {
            response = "Error: método aún no implementado";
        }
        //CREAR HTTP RESPONSE
        he.sendResponseHeaders(200, response.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    private String manejarPost(HttpExchange he) throws UnsupportedEncodingException, IOException, ClassNotFoundException, Exception {
        //USAR EL InputStreamReadr NOS PERMITE PARSEAR EL CUERPO DEL POST
        InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
        BufferedReader br = new BufferedReader(isr);
        int b;
        StringBuilder buf = new StringBuilder(512);
        while ((b = br.read()) != -1) {
            buf.append((char) b);
        }
        br.close();
        isr.close();

        try {
            JSONObject jsonobj = new JSONObject(buf.toString());
            LocalDate fecha_partida = LocalDate.parse(jsonobj.getString("fecha_partida"));
            LocalDate fecha_llegada = LocalDate.parse(jsonobj.getString("fecha_llegada"));
            LocalDate fecha_esperada = LocalDate.parse(jsonobj.getString("fecha_esperada"));

            int kilometros_realizados = jsonobj.getInt("kilometros_realizados");
            float costos_combustibles = (float) jsonobj.getDouble("costos_combustibles");

            Camion camion = new Camion();
            //IDEALMENTE, BUSCAMOS EL CAMION EN LA BASE DE DATOS
            camion.setPatente(jsonobj.getString("camion"));
            camion.setKilometraje(123);
            // al camión recuperado, le sumamos los kilometros realizados en el viaje
            camion.setKilometraje(camion.getKilometraje()+ kilometros_realizados);
            //LUEGO DE ESTO ES NECESARIO HACER EL UPDATE DEL CAMIÓN EN LA BASE DE DATOS. 
            
            String destino = jsonobj.getString("destino");
            int peso = jsonobj.getInt("peso");

            Semirremolque semirremolque = new Semirremolque();
            semirremolque.setPatente(jsonobj.getString("semirremolque"));

            Chofer chofer = new Chofer();
            chofer.setDni(jsonobj.getString("chofer"));

            Viaje v = new Viaje(fecha_partida, fecha_llegada, fecha_esperada, kilometros_realizados, costos_combustibles, peso, destino, camion, chofer, semirremolque);

            System.out.printf("Fecha partida: %s\n"
                    + "Fecha llegada: %s\nFecha Esperada: %s\n"
                    + "Km realizados: %d\nCostos: %f\nDestinos: %s\npeso: %d"
                    + "\ncamion: %s\nsemirremolque: %s\nchofer: %s\n",
                    v.getFecha_partida().toString(),
                    v.getFecha_llegada().toString(),
                    v.getFecha_esperada().toString(),
                    v.getKilometros_realizados(),
                    v.getCostos_combustibles(),
                    v.getDestino(),
                    v.getPeso(),
                    v.getCamion().getPatente(),
                    v.getSemirremolque().getPatente(),
                    v.getChofer().getDni()
            );
            
            ViajeDAOImpl viajeDAO= new ViajeDAOImpl();
            viajeDAO.create(v);
            
            return "Carga Exitosa";
        } catch (JSONException ex) {
            System.out.println("ERROR: " + ex);
            return "Error en la carga";
        }

    }

    private String manejarGet(HttpExchange he) throws JsonProcessingException, UnsupportedEncodingException, ClassNotFoundException, Exception {
        String fecha_partida, fecha_llegada;
        fecha_partida = obtenerParámetros(he.getRequestURI(), "fecha_partida");
        fecha_llegada = obtenerParámetros(he.getRequestURI(), "fecha_llegada");

        ArrayList<Viaje> viajes = new ArrayList<>();
        if (fecha_partida == null && fecha_llegada == null) {
            // SE DEVUEVLVEN TODOS VIAJES  
        } else if (fecha_llegada == null) {
            // SE DEVUEVLVEN TODOS VIAJES  A PARTIR DE FECHAPARTIDA

        } else if (fecha_partida == null) {
            // SE DEVUEVLVEN TODOS VIAJES  A PARTIR DE FECHAPARTIDA

        } else {
            LocalDate partida, llegada;
            partida = LocalDate.parse(fecha_partida);
            llegada = LocalDate.parse(fecha_llegada);

            ViajeDAOImpl viajeDAO= new ViajeDAOImpl();
            viajes=viajeDAO.comprobarfechas(fecha_partida, fecha_llegada);
            
            //viaje 1
//            Camion c1 = new Camion();
//            c1.setPatente("WUB 750");
//            Semirremolque sr = new Semirremolque();
//            sr.setPatente("ABC 123");
//            Chofer ch1 = new Chofer();
//            ch1.setDni("33069732");
//            Viaje v1 = new Viaje(
//                    LocalDate.parse("2024-08-10"),
//                    LocalDate.parse("2024-08-15"),
//                    LocalDate.parse("2024-08-15"),
//                    15,
//                    154,
//                    159,
//                    "San Juan",
//                    c1,
//                    ch1,
//                    sr
//            );
//
//            //viaje 2
//            Camion c2 = new Camion();
//            c2.setPatente("WUB 752");
//            Semirremolque se2 = new Semirremolque();
//            se2.setPatente("ABC 321");
//            Chofer ch2 = new Chofer();
//            ch2.setDni("31999999");
//            Viaje v2 = new Viaje(
//                    LocalDate.parse("2024-08-10"),
//                    LocalDate.parse("2024-08-15"),
//                    LocalDate.parse("2024-08-15"),
//                    15,
//                    15,
//                    159,
//                    "Rosario",
//                    c2,
//                    ch2,
//                    se2
//            );

//            viajes.add(v1);
//            viajes.add(v2);
//            System.out.printf("Es la partida anterior a la llegada %s ?", Boolean.toString(partida.isBefore(llegada)));
        }
        // send response
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

        return ow.writeValueAsString(viajes);
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
