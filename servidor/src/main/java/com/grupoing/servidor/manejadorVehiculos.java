package com.grupoing.servidor;

import Clases.Camion;
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
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;

public class manejadorVehiculos extends Manejador {

    @Override
    public String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        String tipo = obtenerParámetros(he.getRequestURI(), "tipo");

        ArrayList<Vehiculo> vehiculos = new ArrayList<>();
        if (tipo == null) {
            CamionDAOImpl camionDAO;
            try {
                camionDAO = new CamionDAOImpl();
                ArrayList<Camion> camiones = camionDAO.list();
                SemirremolqueDAOImpl semirremolqueDAO = new SemirremolqueDAOImpl();
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
                CamionDAOImpl camionDAO;
                camionDAO = new CamionDAOImpl();
                ArrayList<Camion> camiones = camionDAO.list();
                Iterator<Camion> iteratorCamion = camiones.iterator();
                while (iteratorCamion.hasNext()) {
                    vehiculos.add(iteratorCamion.next());
                }

            } catch (ClassNotFoundException ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
            } catch (Exception ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
            }
        } else if (tipo.equalsIgnoreCase("semirremolque")) {
            try {
                SemirremolqueDAOImpl semirremolqueDAO = new SemirremolqueDAOImpl();
                ArrayList<Semirremolque> semirremolques = semirremolqueDAO.list();
                Iterator<Semirremolque> iteratorSemirremolque = semirremolques.iterator();
                while (iteratorSemirremolque.hasNext()) {
                    vehiculos.add(iteratorSemirremolque.next());
                }

            } catch (ClassNotFoundException ex) {
                Logger.getLogger(manejadorVehiculos.class.getName()).log(Level.SEVERE, null, ex);
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

    @Override
    public String manejarPost(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        return "POST-REQUEST";
    }

}
