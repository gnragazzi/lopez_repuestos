package com.grupoing.servidor;

import Clases.Camion;
import Clases.Costos;
import Clases.Semirremolque;
import Clases.Vehiculo;
import IDaoImpl.CamionDAOImpl;
import IDaoImpl.SemirremolqueDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import java.net.URI;
import java.time.LocalDate;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONObject;

public class manejadorVehiculos extends Manejador {

    CamionDAOImpl camionDAO;
    SemirremolqueDAOImpl semirremolqueDAO;

    public manejadorVehiculos() {
        try {
            System.out.println("Constructor de manejador vehículos");
            this.semirremolqueDAO = new SemirremolqueDAOImpl(); 
            this.camionDAO = new CamionDAOImpl();
        } catch (ClassNotFoundException err) {
            System.err.println(err);
        }
    }

    @Override
    public String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {

        URI uri = he.getRequestURI();
        String costos = obtenerParámetros(uri, "costos");
        if (costos != null) {
            return obtenerCostos(costos, obtenerParámetros(uri, "patente"));
        } else {
            String tipo = obtenerParámetros(uri, "tipo");

            ArrayList<Vehiculo> vehiculos = new ArrayList<>();
            if (tipo == null) {
                try {
                    ArrayList<Camion> camiones = camionDAO.list();
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
                    ArrayList<Camion> camiones = camionDAO.list();
                    Iterator<Camion> iteratorCamion = camiones.iterator();
                    while (iteratorCamion.hasNext()) {
                        vehiculos.add(iteratorCamion.next());
                    }
                } catch (Exception ex) {
                    Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
                }
            } else if (tipo.equalsIgnoreCase("semirremolque")) {
                try {
                    ArrayList<Semirremolque> semirremolques = semirremolqueDAO.list();
                    Iterator<Semirremolque> iteratorSemirremolque = semirremolques.iterator();
                    while (iteratorSemirremolque.hasNext()) {
                        vehiculos.add(iteratorSemirremolque.next());
                    }

                } catch (Exception ex) {
                    Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
                }
            } else {
                //entonces está intentando acceder a un tipo incorrecto, por lo que el mensaje de respuesta debería ser 404 
            }
            // send response

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(vehiculos);
        }
    }

    @Override
    public String manejarPost(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        return "POST-REQUEST";
    }

    public String obtenerCostos(String c, String p) throws Exception {
        LocalDate ld = LocalDate.parse(c + "-01");
        Costos costos = camionDAO.calcular_costos(p, ld);
        
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(costos);  
    }

}
