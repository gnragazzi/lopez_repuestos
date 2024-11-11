package com.grupoing.servidor;

import IDaoImpl.ChoferDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.net.URI;

public class temp extends Manejador {

    InterfacesDAO.IDAO dao;

    public temp() {
        try {
            dao = new ChoferDAOImpl();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }


    @Override
    protected String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        String response = "";
        URI uri = he.getRequestURI();
        
        String id = obtenerParámetros(uri, "id");
        
        
        if(id != null){
            response = "Se busca la entrada " + id; 
        }
        else
        {
            response = "SE BUSCA LA TOTALIDAD DE LAS ENTRADAS";
        }
        return response;
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
