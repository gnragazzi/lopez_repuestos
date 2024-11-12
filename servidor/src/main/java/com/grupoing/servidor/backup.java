package com.grupoing.servidor;

import Conexion.Credenciales;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import control_acceso.ControlAcceso;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.security.CodeSource;
import java.time.LocalDate;
import javax.swing.JOptionPane;

public class backup implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");

        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS, DELETE, PATCH");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }

        String response = "CHEQUEAR DATA";
        he.getResponseHeaders().set("Content-Type", "application/json");
        he.getResponseHeaders().set("Clear-Site-Data", "\"*\"");
        he.sendResponseHeaders(201, response.getBytes().length);
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    public static void backup() {
        try {
            ControlAcceso ca = new ControlAcceso();
            LocalDate ld = LocalDate.parse(ca.getUltimaFecha());

            System.out.println(ld.compareTo(LocalDate.now()) );  
            
            Process p = Runtime
                    .getRuntime()
                    //.exec("C:/Aplicaciones/wamp/bin/mysql/mysql5.1.36/bin/mysqldump -u root -ppassword database"); Por ahí esto funciona en windows
                    .exec("mysqldump -u " + Credenciales.getUsuario() + " -p" + Credenciales.getContraseña() + " --databases lopez_repuestos"); 
            
            
            InputStream is = p.getInputStream();
            FileOutputStream fos = new FileOutputStream("backup_pruebas.sql");
            byte[] buffer = new byte[1000];

            int leido = is.read(buffer);
            while (leido > 0) {
                fos.write(buffer, 0, leido); 
                leido = is.read(buffer);
            }

            fos.close();

        } catch (Exception e) {
            System.out.println("No se pudo realizar el BACKUP... Contactesé con el equipo de SOPORTE");
        }
    }

}
