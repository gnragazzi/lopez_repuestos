package com.grupoing.servidor;

import Clases.Camion;
import Clases.Semirremolque;
import Clases.Tecnica;
import Clases.Vehiculo;
import IDaoImpl.TecnicaDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.time.LocalDate;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONObject;

public class manejadorTecnica extends Manejador {

    TecnicaDAOImpl tecnicaDAO;
    Tecnica tecnica;

    public manejadorTecnica() {
        try {
            tecnicaDAO = new TecnicaDAOImpl();
            tecnica = new Tecnica();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(manejadorTecnica.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public String manejarPost(HttpExchange he) throws Exception {

        //USAR EL InputStreamReadr NOS PERMITE PARSEAR EL CUERPO DEL POST
        URI uri = he.getRequestURI();

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
            String ubicacion = jsonobj.getString("ubicacion");


            String tipo = obtenerParámetros(uri, "tipo");

            Vehiculo vehiculo;
            
            if (tipo.equalsIgnoreCase("camion")) {
                vehiculo = new Camion();

            } else if (tipo.equalsIgnoreCase("semirremolque")) {
                vehiculo = new Semirremolque();
            } else {
                //entonces está intentando acceder a un tipo incorrecto, por lo que el mensaje de respuesta debería ser 404 
                throw new Exception();
            }

            vehiculo.setPatente(jsonobj.getString("vehiculo_seleccionado"));
            
            //no interesan los otros datos de vehiculo, en todo caso si necesitamos buscarlo lo consultamos en la base de datos

            Tecnica aux = new Tecnica(fecha_emision, fecha_vencimiento, ubicacion, vehiculo);
            

            tecnicaDAO.create(aux);

            //CREAR HTTP RESPONSE
            return "Cargado Correctamente.";
        } catch (Exception ex) {
            System.out.println("Ocurrió un error en el parseo del JSON.");
            throw ex;
        }
    }

    @Override
    protected String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
