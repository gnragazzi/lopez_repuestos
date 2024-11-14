package com.grupoing.servidor;

import IDaoImpl.ChoferDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import Clases.Chofer;
import Clases.Vehiculo;
import Clases.Seguro;
import IDaoImpl.SeguroDAOImpl;
import IDaoImpl.VehiculoDAOImpl;
import java.time.LocalDate;

public class manejadorVencimientos extends Manejador {

    ChoferDAOImpl choferDao;
    VehiculoDAOImpl vehiculoDao;
    SeguroDAOImpl seguroDao;

    public manejadorVencimientos() {
        try {
            choferDao = new ChoferDAOImpl();
            vehiculoDao = new VehiculoDAOImpl();
            seguroDao = new SeguroDAOImpl();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    @Override
    protected String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        // PREGUNTAR A LA BASE DE DATOS
        // PSICOTÉCNICO :-)
        ArrayList<Chofer> choferes = choferDao.listarVencimiento(30);
        // SEGURO :-(
        ArrayList<Vehiculo> vehiculos = vehiculoDao.list();
        ArrayList<Vehiculo> sinSeguro = new ArrayList<>();
        ArrayList<Vehiculo> seguroVencido = new ArrayList<>();
        for (Vehiculo v : vehiculos) {
            Seguro s = seguroDao.ultimoSeguro(v.getPatente());
            if (s == null) {
                sinSeguro.add(v);
            } else if (s.getFecha_vencimiento().toEpochDay() - LocalDate.now().toEpochDay() > 30) {
                seguroVencido.add(v);
            }
        }
        System.out.println("Sin seguro: ");
        for (Vehiculo v : sinSeguro) {
            System.out.println(v.getPatente());
        }
        System.out.println("Seguro Vencido: ");
        for (Vehiculo v : seguroVencido) {
            System.out.println(v.getPatente());
        }
        // Tarjeta RUTA :-(
        // TÉCNICA :-( 
        // DEVOLVER INFORMACIÓN
        return "holis";
    }

    @Override
    protected String manejarPost(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
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
