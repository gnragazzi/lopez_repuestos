/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupoing.servidor;

import Clases.Camion;
import Clases.Seguro;
import Clases.Semirremolque;
import Clases.Tarjeta_Ruta;
import Clases.Tecnica;
import Clases.Vehiculo;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
/**
 *
 * @author gera
 */
public class manejadorVehiculos implements HttpHandler{
	int contador = 0;
        Date fecha=new Date(2024,8,27);

        Camion camion1= new Camion("Scania","WUB 750",
        new Seguro(fecha, fecha,"Seguro Metal",51251, "todo_riesgo"),
        new Tarjeta_Ruta(fecha,fecha,null),
        new Tecnica(fecha,fecha, "San Luis", null),
        null, 
        "R123", 
        "360", 
        "100.000km", 
        null, 
        null);

        Semirremolque semirremolque1= new Semirremolque(
        "Patito",
        "ABC 321",
        new Seguro (fecha,fecha,"Seguro Madera", 65466,"algún riesgo"),
        new Tarjeta_Ruta(fecha,fecha,null),
        new Tecnica(fecha,fecha,"San Luis", null),
        null,
        "Tolva",
        "Cemento",
        null
        ); 
         @Override
	 
         public void handle(HttpExchange he) throws IOException {
            he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
                he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
                he.sendResponseHeaders(204, -1);
                return;
            }
            // parse request
            Map<String, Object> parameters = new HashMap<String, Object>();
            URI requestedUri = he.getRequestURI();
            String query = requestedUri.getRawQuery();
            parseQuery(query, parameters);
            // send response
	    
	    ArrayList<Vehiculo> vehiculos = new ArrayList<>();
	    vehiculos.add(camion1);
	    vehiculos.add(semirremolque1);
	    
	    ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	    
	    String response = ow.writeValueAsString(vehiculos);

	    
	    he.sendResponseHeaders(200, response.toString().getBytes().length);
            OutputStream os = he.getResponseBody();
            os.write(response.toString().getBytes());
            os.close();
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
