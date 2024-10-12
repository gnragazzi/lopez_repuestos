package com.grupoing.servidor;

import Clases.Camion;
import Clases.Mantenimiento;
import Clases.Mecanico;
import Clases.Semirremolque;
import Clases.Vehiculo;
import IDaoImpl.MantenimientoDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sun.net.httpserver.HttpExchange;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONObject;

public class manejadorMantenimiento extends Manejador {

    MantenimientoDAOImpl mantenimientoDAO;

    public manejadorMantenimiento() {
        try {
            mantenimientoDAO = new MantenimientoDAOImpl();
        } catch (ClassNotFoundException ex) {
            System.err.println(ex);
        }
    }

    @Override
    public String manejarGet(HttpExchange he) throws JsonProcessingException, UnsupportedEncodingException, ClassNotFoundException, Exception {
        ArrayList<Mantenimiento> mantenimientos = new ArrayList<>();
        mantenimientos = mantenimientoDAO.list();

        JSONArray jsonArray = new JSONArray(mantenimientos);
        System.out.println(jsonArray); 
        
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(mantenimientos);
    }

    @Override
    public String manejarPost(HttpExchange he) throws UnsupportedEncodingException, IOException {
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
            String trabajos_realizados = jsonobj.getString("trabajos_realizados");
            LocalDate fecha = LocalDate.parse(jsonobj.getString("fecha"));
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

            Mantenimiento m = new Mantenimiento(trabajos_realizados, fecha, costo_repuestos, costo_manodeobra, 0, mecanicos, vehiculo);
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

            mantenimientoDAO.create(m);

            //CREAR HTTP RESPONSE
            return "Cargado Correctamente.";
        } catch (Exception ex) {
            System.err.println("Ocurrió el siguiente error durante la carga del mantenimiento: " + ex);
            return "ERROR EN LA CARGA";
        }
    }

}
