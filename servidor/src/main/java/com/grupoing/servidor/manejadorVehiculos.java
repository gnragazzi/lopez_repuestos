package com.grupoing.servidor;

import Clases.Camion;
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
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.Iterator;
import org.json.JSONObject;

public class manejadorVehiculos extends Manejador {

    CamionDAOImpl camionDAO;
    SemirremolqueDAOImpl semirremolqueDAO;
    VehiculoDAOImpl vehiculoDAO;

    public manejadorVehiculos() {
        try {
            System.out.println("Constructor de manejador vehículos");
            this.semirremolqueDAO = new SemirremolqueDAOImpl();
            this.camionDAO = new CamionDAOImpl();
            this.vehiculoDAO = new VehiculoDAOImpl();

        } catch (ClassNotFoundException err) {
            System.err.println(err);
        }
    }

    @Override
    public String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        URI uri = he.getRequestURI();
        String tipo = obtenerParámetros(uri, "tipo");

        ArrayList<Vehiculo> vehiculos = new ArrayList<>();
        if (tipo == null) {

            vehiculos = vehiculoDAO.list();

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

    @Override
    public String manejarPost(HttpExchange he) throws Exception {
        throw new Exception();
    }

    @Override
    protected String manejarPatch(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        /*String patente = obtenerParámetros(uri, "km_realizados");
        int km_realizados = Integer.valueOf(obtenerParámetros(uri,"patente"));*/
        JSONObject jsonobj = null;
        String patente;
        int km_realizados;
        Camion camion = null;
        try {
            InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
            BufferedReader br = new BufferedReader(isr);
            int b;
            StringBuilder buf = new StringBuilder(512);
            while ((b = br.read()) != -1) {
                buf.append((char) b);
            }
            br.close();
            isr.close();
            jsonobj = new JSONObject(buf.toString());
            patente = jsonobj.getString("patente");
            km_realizados = jsonobj.getInt("km_realizados");
            camion = camionDAO.read(patente);
            // al camión recuperado, le sumamos los kilometros realizados en el viaje 
            camion.setKilometraje(km_realizados + camion.getKilometraje());
        } catch (Exception e) {
            System.out.println(e.getMessage()); 
            return "FALLO";
        }
         
        camionDAO.update(camion, camion.getPatente()); 
        return camion.getModelo();
    }

    @Override
    protected String manejarDelete(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
