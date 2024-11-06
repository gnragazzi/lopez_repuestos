/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.grupoing.servidor;

import IDaoImpl.ChoferDAOImpl;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.IOException;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author gera
 */
public class temp implements HttpHandler{

    @Override
    public void handle(HttpExchange he) throws IOException {
        String res = "Ok";
        
        try {
            //
            ChoferDAOImpl c = new ChoferDAOImpl();
            c.list();
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
