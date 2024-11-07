package com.grupoing.servidor;

import Clases.Camion;
import Clases.Costos;
import Clases.Semirremolque;
import Clases.Vehiculo;
import IDaoImpl.CamionDAOImpl;
import IDaoImpl.SemirremolqueDAOImpl;
import IDaoImpl.VehiculoDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import java.net.URI;
import java.time.LocalDate;
import java.util.Iterator;

public class manejadorVehiculos extends Manejador {

    CamionDAOImpl camionDAO;
    SemirremolqueDAOImpl semirremolqueDAO;
    VehiculoDAOImpl vehiculoDAO;

    public manejadorVehiculos() {
        try {
            System.out.println("Constructor de manejador vehículos");
            this.semirremolqueDAO = new SemirremolqueDAOImpl();
            this.camionDAO = new CamionDAOImpl();
            this.vehiculoDAO=new VehiculoDAOImpl();
            
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
               
                vehiculos= vehiculoDAO.list();
                
            } else if (tipo.equalsIgnoreCase("camion")) {
                ArrayList<Camion> camiones = camionDAO.list();
                Iterator<Camion> iteratorCamion = camiones.iterator();
                while (iteratorCamion.hasNext()) {
                    vehiculos.add(iteratorCamion.next());
                }

            } else if (tipo.equalsIgnoreCase("semirremolque")) {
                ArrayList<Semirremolque> semirremolques = semirremolqueDAO.list();
                Iterator<Semirremolque> iteratorSemirremolque = semirremolques.iterator();
                while (iteratorSemirremolque.hasNext()) {
                    vehiculos.add(iteratorSemirremolque.next());
                }
            } else {
                //entonces está intentando acceder a un tipo incorrecto, por lo que el mensaje de respuesta debería ser 404 
                throw new Exception();
            }
            // send response

            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(vehiculos);
        }
    }

    @Override
    public String manejarPost(HttpExchange he) throws Exception {
        throw new Exception();
    }

    public String obtenerCostos(String c, String p) throws Exception {
        LocalDate ld = LocalDate.parse(c + "-01");
        Costos costos = camionDAO.calcular_costos(p, ld);

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(costos);
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
