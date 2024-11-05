package com.grupoing.servidor;

import com.grupoing.servidor.manejadorMantenimiento;
import java.io.IOException;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import com.grupoing.servidor.manejadorVehiculos;
import java.sql.SQLException;

public class Servidor {
 
    public static int port = 8080;

    public static void main(String[] args) throws IOException, SQLException, ClassNotFoundException, Exception {

        //Eventualmente, hay que implementar un singleton o restringir de alguna forma nuevas instancias
        Autorización auth = new Autorización();
        //***************************************************//
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        System.out.println("Servidor Montado en el puerto " + port);
        
        server.createContext("/vehiculos", new manejadorVehiculos());
        server.createContext("/mantenimiento", new manejadorMantenimiento());
        server.createContext("/viajes", new manejadorViaje());
        server.createContext("/empleados", new manejadorEmpleado());
        server.createContext("/auth", new manejadorAuth());
        server.createContext("/refresh", new manejadorRefresh());
        server.createContext("/alta_chofer", new alta_chofer());
        server.createContext("/baja_chofer", new baja_chofer()); 
        server.createContext("/update_chofer", new update_chofer()); 
        server.createContext("/temp", new temp());
        server.setExecutor(null);
        server.start();
    }
}
