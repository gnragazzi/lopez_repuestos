package com.grupoing.servidor;

import Clases.Camion;
import Clases.Mantenimiento;
import Clases.Mecanico;
import Clases.Semirremolque;
import Clases.Vehiculo;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

public class manejadorMantenimiento implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {

        // CON ESTO SOLUCIONAMOS EL PROBLEMA DEL CORS
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }

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
            // CONVERTIR EL JSONString a JSONObject

            JSONObject jsonobj = new JSONObject(buf.toString());
            String trabajos_realizados = (String) jsonobj.get("trabajos_realizados");
            LocalDate fecha = LocalDate.parse(((String) jsonobj.get("fecha")));
            Float costo_repuestos = Float.parseFloat((String) jsonobj.get("costo_repuestos"));
            Float costo_manodeobra = Float.parseFloat((String) jsonobj.get("costo_manodeobra"));

            /*
            //ACA DEBERÍA HACERSE UNA CONSULTA A LA BASE DE DATOS PARA TRAER EL MECÁNICO Y EL VEHÍCULO CORRESPONDIENTE...
            // HASTA QUE ESA FUNCIONALIDAD ESTÉ IMPLEMENTADA, CREAREMOS UN NUEVO MECÁNICO Y VEHÍCULO...
            try{
                buscarMecánico y Vehículo de la base de datos
            }
            catch(sqlexception){}
             */
            Vehiculo vehiculo = Boolean.getBoolean((String) jsonobj.getJSONObject("vehiculo").get("esCamion")) ? new Camion() : new Semirremolque();
            vehiculo.setPatente((String) jsonobj.getJSONObject("vehiculo").get("vehiculoSeleccionado"));

            ArrayList<Mecanico> mecanicos = new ArrayList<>();

            JSONArray arr = jsonobj.getJSONArray("mecanicosSeleccionados");

            if (arr != null) {
                int len = arr.length();
                for (int i = 0; i < len; i++) {
                    String dni = (String) arr.get(i);
                    Mecanico temp = new Mecanico();
                    temp.setDni(dni);
                    mecanicos.add(temp);
                }
            }

            System.out.println("Es camión? :" + jsonobj.getJSONObject("vehiculo").getString("esCamion"));

            Mantenimiento m = new Mantenimiento(trabajos_realizados, fecha, costo_repuestos, costo_manodeobra, mecanicos, vehiculo);
            //MANDAR EL MECÁNICO A LA BASE DE DATOS
            String response = "Gracias por todo";
            he.sendResponseHeaders(200, response.toString().getBytes().length);
            OutputStream os = he.getResponseBody();
            os.write(response.toString().getBytes());
            os.close();
        } catch (JSONException ex) {
            System.out.println("ERROR al parsear el cuerpo del request: " + ex);
            // CREAR LA RESPUESTA CON EL ERROR DEL SERVIDOR...
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
