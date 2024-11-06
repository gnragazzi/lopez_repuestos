/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupoing.servidor;

import Clases.Chofer;
import IDaoImpl.ChoferDAOImpl;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author gera
 */
public class temp implements HttpHandler {

    InterfacesDAO.IDAO dao;
    Chofer chofer;

    public temp() {
        chofer = new Chofer(
                LocalDate.parse("1024-06-17"),
                null,
                "35703559", "20355035598", 
                "Laria Maura",
                "Onemig",
                "Sydneyville 123",
                LocalDate.parse("1004-03-14"),
                "341 7070709",
                true);
        try {
            dao = new ChoferDAOImpl();
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    @Override
    public void handle(HttpExchange he) throws IOException {
        String res = "Ok";

        try {
            // ALTA CHOFER
            //dao.create(chofer);
            // BAJA CHOFER
            //dao.delete("35703579");
            // MODIFICACIÓN CHOFER
            //dao.update(chofer, "35703579");  
            // LECTURA CHOFER
            Chofer temp = (Chofer) dao.read("35703559");
            
            
        } catch (Exception ex) {
            Logger.getLogger(temp.class.getName()).log(Level.SEVERE, null, ex);
        }

        //
        he.getResponseHeaders().set("Content-Type", "application/json");
        he.sendResponseHeaders(200, res.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(res.getBytes());
        os.close();

    }

}
