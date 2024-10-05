package com.grupoing.servidor;

import Clases.Camion;
import Clases.Semirremolque;
import Clases.Viaje;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.time.LocalDate;
import org.json.JSONException;
import org.json.JSONObject;

public class manejadorViaje implements HttpHandler {

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
            JSONObject jsonobj = new JSONObject(buf.toString());
            LocalDate fecha_partida = LocalDate.parse(jsonobj.getString("fecha_partida"));
            LocalDate fecha_llegada = LocalDate.parse(jsonobj.getString("fecha_llegada"));
            LocalDate fecha_esperada = LocalDate.parse(jsonobj.getString("fecha_esperada"));
            
            int kilometros_realizados = jsonobj.getInt("kilometros_realizados");
            float costos_combustibles = (float )jsonobj.getDouble("costos_combustibles");
            
            Camion camion = new Camion();
            //IDEALMENTE, BUSCAMOS EL CAMION EN LA BASE DE DATOS
            camion.setPatente(jsonobj.getString("camion"));
            
            String destinos = jsonobj.getString("destinos");
            float peso = (float) jsonobj.getDouble("peso");
            
            Semirremolque semirremolque = new Semirremolque();
            semirremolque.setPatente(jsonobj.getString("semirremolque"));

            Viaje v = new Viaje(fecha_partida, fecha_llegada, fecha_esperada, kilometros_realizados, costos_combustibles, destinos,peso ,camion,semirremolque);
            
            
            System.out.printf("Fecha partida: %s\n"
                    + "Fecha llegada: %s\nFecha Esperada: %s\n"
                    + "Km realizados: %d\nCostos: %f\nDestinos: %s\npeso: %f\ncamion: %s,semirremolque: %s\n",
                    v.getFecha_partida().toString(),
                    v.getFecha_llegada().toString(),
                    v.getFecha_esperada().toString(),
                    v.getKilometros_realizados(),
                    v.getCostos_combustibles(),
                    v.getDestino(),
                    v.getPeso(),
                    v.getCamion().getPatente(), 
                    v.getSemirremolque().getPatente()
            );
            //MANDAR VIAJE A LA BASE DE DATOS...
            //CREAR HTTP RESPONSE
            String response = "Viaje Cargado...";
            he.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = he.getResponseBody();
            os.write(response.getBytes());
            os.close();
        } catch (JSONException ex) {
            System.out.println("ERROR: " + ex);
        }
    }

}
