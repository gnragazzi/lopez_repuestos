package com.grupoing.servidor;

import Clases.Camion;
import Clases.Chofer;
import Clases.Costos;
import Clases.Semirremolque;
import Clases.Viaje;
import IDaoImpl.ViajeDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sun.net.httpserver.HttpExchange;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.time.LocalDate;
import java.util.ArrayList;
import org.json.JSONException;
import org.json.JSONObject;

public class manejadorViaje extends Manejador {

    ViajeDAOImpl viajeDAO;

    public manejadorViaje() {
        try {
            viajeDAO = new ViajeDAOImpl();
        } catch (ClassNotFoundException ex) {
            System.out.println(ex);
        }

    }

    @Override
    protected String manejarPost(HttpExchange he) throws UnsupportedEncodingException, IOException, ClassNotFoundException, Exception {
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
            camion.setPatente(jsonobj.getString("camion"));
            String destino = jsonobj.getString("destino");
            int peso = jsonobj.getInt("peso");

            Semirremolque semirremolque = new Semirremolque();
            semirremolque.setPatente(jsonobj.getString("semirremolque"));

            Chofer chofer = new Chofer();
            chofer.setDni(jsonobj.getString("chofer"));

            Viaje v = new Viaje(fecha_partida, fecha_llegada, fecha_esperada, kilometros_realizados, costos_combustibles, peso, destino, camion, chofer, semirremolque);

            viajeDAO.create(v);
            return "Carga Exitosa";
        } catch (JSONException ex) {
            System.out.println("ERROR: " + ex);
            throw ex;
        }
    }

    @Override
    protected String manejarGet(HttpExchange he) throws JsonProcessingException, UnsupportedEncodingException, ClassNotFoundException, Exception {
        String fecha_partida, fecha_llegada;
        fecha_partida = obtenerParámetros(he.getRequestURI(), "fecha_partida");
        fecha_llegada = obtenerParámetros(he.getRequestURI(), "fecha_llegada");

        URI uri = he.getRequestURI();
        ArrayList<Viaje> viajes = new ArrayList<>();

        String fechaCostos = obtenerParámetros(uri, "costos");
        String patente = obtenerParámetros(uri, "patente");

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();

        if (fechaCostos != null && patente != null) {
            LocalDate ld = LocalDate.parse(fechaCostos + "-01");
            Costos costos = viajeDAO.obtener_costos_viaje(patente, ld);
            return ow.writeValueAsString(costos);
        } else if (obtenerParámetros(uri, "entregas_tardias") != null) {
            viajes.addAll(viajeDAO.ver_entregas_tardias());
        } else {
            if (fecha_partida == null && fecha_llegada == null) {

                viajes = viajeDAO.list();

            } else if (fecha_llegada == null) {
                // SE DEVUEVLVEN TODOS VIAJES  A PARTIR DE FECHAPARTIDA
            } else if (fecha_partida == null) {
                // SE DEVUEVLVEN TODOS VIAJES  A PARTIR DE FECHAPARTIDA

            } else {

                viajes = viajeDAO.comprobarfechas(fecha_partida, fecha_llegada);

            }
        }

        return ow.writeValueAsString(viajes);
    }
    @Override
    protected String manejarPatch(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    protected String manejarDelete(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
