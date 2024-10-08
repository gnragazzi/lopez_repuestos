package com.grupoing.servidor;

import Clases.Camion;
import Clases.Mantenimiento;
import Clases.Mecanico;
import Clases.Semirremolque;
import Clases.Vehiculo;
import IDaoImpl.MantenimientoDAOImpl;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
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
            String trabajos_realizados =  jsonobj.getString("trabajos_realizados");
            LocalDate fecha = LocalDate.parse( jsonobj.getString("fecha"));
            Double costo_repuestos = jsonobj.getDouble("costo_repuestos");
            Double costo_manodeobra = jsonobj.getDouble("costo_manodeobra");
            //int kilometros_en_que_se_realizo= jsonobj.getInt("kilometros_en_que_se_realizo");

            /*
            //ACA DEBERÍA HACERSE UNA CONSULTA A LA BASE DE DATOS PARA TRAER EL MECÁNICO Y EL VEHÍCULO CORRESPONDIENTE...
            // HASTA QUE ESA FUNCIONALIDAD ESTÉ IMPLEMENTADA, CREAREMOS UN NUEVO MECÁNICO Y VEHÍCULO...
            try{
                buscarMecánico y Vehículo de la base de datos
            }
            catch(sqlexception){}
             */
            Vehiculo vehiculo = jsonobj.getJSONObject("vehiculo").getBoolean("esCamion") ? new Camion() : new Semirremolque();
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

            Mantenimiento m = new Mantenimiento(trabajos_realizados, fecha, costo_repuestos, costo_manodeobra,0, mecanicos, vehiculo);
            System.out.printf(
              "Trabajo: %s\n fecha: %s\ncosto_repuestos: %f\ncosto_manodeobra: %s\nkilometros_en_que_se_realizo: %d\nDni mecánico: %s\nMatrícula Vehículo: %s\n",
                    m.getTrabajos_realizados(),
                    m.getFecha().toString(),
                    m.getCostos_repuestos(),
                    m.getCostos_manodeobra(),
                    m.getKilometros_en_que_se_realizo(),
                    m.getMecanico().get(0).getDni(),
                    m.getVehiculo().getPatente() 
            
            );
            //MANDAR Mantenimiento A LA BASE DE DATOS
            
            MantenimientoDAOImpl mantenimientoDAO= new MantenimientoDAOImpl();
            mantenimientoDAO.create(m);
            
            //CREAR HTTP RESPONSE
            String response = "Cargado Correctamente.";
            he.sendResponseHeaders(200, response.toString().getBytes().length);
            OutputStream os = he.getResponseBody();
            os.write(response.toString().getBytes());
            os.close();
        } catch (JSONException ex) {
            System.out.println("ERROR al parsear el cuerpo del request: " + ex);
            // CREAR LA RESPUESTA CON EL ERROR DEL SERVIDOR...
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(manejadorMantenimiento.class.getName()).log(Level.SEVERE, null, ex);
        } catch (Exception ex) {
            Logger.getLogger(manejadorMantenimiento.class.getName()).log(Level.SEVERE, null, ex);
        }

    }

    
}
