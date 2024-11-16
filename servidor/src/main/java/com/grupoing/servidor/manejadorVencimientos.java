package com.grupoing.servidor;

import IDaoImpl.ChoferDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import Clases.Chofer;
import Clases.Vehiculo;
import Clases.Seguro;
import Clases.Tarjeta_Ruta;
import Clases.Tecnica;
import Clases.Vencimientos;
import IDaoImpl.SeguroDAOImpl;
import IDaoImpl.Tarjeta_RutaDAOImpl;
import IDaoImpl.TecnicaDAOImpl;
import IDaoImpl.VehiculoDAOImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import java.time.LocalDate;

public class manejadorVencimientos extends Manejador {

    private static final int LIMITE = 30;
    ChoferDAOImpl choferDao;
    VehiculoDAOImpl vehiculoDao;
    SeguroDAOImpl seguroDao;
    Tarjeta_RutaDAOImpl tRutaDao;
    TecnicaDAOImpl tecnicaDao;

    public manejadorVencimientos() {
        try {
            choferDao = new ChoferDAOImpl();
            vehiculoDao = new VehiculoDAOImpl();
            seguroDao = new SeguroDAOImpl();
            tRutaDao = new Tarjeta_RutaDAOImpl();
            tecnicaDao = new TecnicaDAOImpl();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    @Override
    protected String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        
        Vencimientos venc_prox; 
        ArrayList<Vehiculo> vehiculos;
         
        try {
            // TÉCNICA
            venc_prox = new Vencimientos();
            vehiculos = vehiculoDao.list(); 
            venc_prox.setChoferes(choferDao.listarVencimiento(LIMITE));
        } catch (Exception e) {
            return "primer Catch";
        }

        try {
            
            for (Vehiculo v : vehiculos) {
                String patente = v.getPatente();

                Seguro s = seguroDao.ultimoSeguro(patente);
                v.agregarSeguro(s);

                Tarjeta_Ruta tr = tRutaDao.ultimaTarjetaRuta(patente);
                v.setTarjeta_ruta(tr);

                Tecnica t = tecnicaDao.ultimaTecnica(patente);
                v.agregarTecnica(t);

                if (s == null) {
                    venc_prox.agregarSinSeguro(v);
                } else if (s.getFecha_vencimiento().toEpochDay() - LocalDate.now().toEpochDay() <= LIMITE) {
                    venc_prox.agregarSeguroVencido(v);
                }

                if (tr == null) {
                    venc_prox.agregarSinTarjetaRuta(v);
                } else if (tr.getFecha_vencimiento().toEpochDay() - LocalDate.now().toEpochDay() <= LIMITE) {
                    venc_prox.agregarTarjetaRutaVencida(v);
                }

                if (t == null) {
                    venc_prox.agregarSinTecnica(v);
                } else if (t.getFecha_vencimiento().toEpochDay() - LocalDate.now().toEpochDay() <= LIMITE) {
                    venc_prox.agregarTecnicaVencida(v);
                }
            }
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage()); 
            return "Segundo Catch";
        }
        
        // DEVOLVER INFORMACIÓN 
        try {
            ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
            return ow.writeValueAsString(venc_prox);

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return "Salio Mal...";
        }
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
