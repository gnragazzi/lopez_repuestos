package com.grupoing.servidor;

import Clases.Camion;
import Clases.Seguro;
import Clases.Semirremolque;
import Clases.Vehiculo;
import IDaoImpl.SeguroDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.time.LocalDate;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONObject;

public class manejadorSeguro extends Manejador {

    SeguroDAOImpl seguroDAO;
    Seguro seguro;

    public manejadorSeguro() {
        try {
            seguroDAO = new SeguroDAOImpl();
            seguro = new Seguro();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(manejadorTecnica.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public String manejarPost(HttpExchange he) throws Exception {

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
            LocalDate fecha_emision = LocalDate.parse(jsonobj.getString("fecha_emision"));
            LocalDate fecha_vencimiento = LocalDate.parse(jsonobj.getString("fecha_vencimiento"));
            float pago = (float) jsonobj.getDouble("pago");
            String tipo = jsonobj.getString("tipo");
            String nombre_aseguradora = jsonobj.getString("nombre_aseguradora");

            String tipoVehiculo = jsonobj.getString("esCamion");

            Vehiculo vehiculo;

            String patente = jsonobj.getString("vehiculo_seleccionado");

            if (tipoVehiculo.equalsIgnoreCase("camion")) {
                vehiculo = new Camion();
                vehiculo.setPatente(patente);
                Seguro aux = new Seguro(fecha_emision, fecha_vencimiento, nombre_aseguradora, pago, tipo, vehiculo);
                seguroDAO.create(aux);
            } else {
                if (tipoVehiculo.equalsIgnoreCase("semirremolque")) {
                    vehiculo = new Semirremolque();
                    vehiculo.setPatente(patente);
                    Seguro aux = new Seguro(fecha_emision, fecha_vencimiento, nombre_aseguradora, pago, tipo, vehiculo);
                    seguroDAO.create(aux);
                } else {
                    System.out.println("Hubo un error en determinar el tipo de vehiculo");
                }
            }

            //CREAR HTTP RESPONSE
            return "Cargado Correctamente.";
        } catch (Exception ex) {
            System.out.println("Ocurrió un error en el parseo del JSON.");
            throw ex;
        }
    }

    @Override
    protected String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {

        URI uri = he.getRequestURI();
        String patente = obtenerParámetros(uri, "patente");

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(seguroDAO.ultimoSeguro(patente));

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
