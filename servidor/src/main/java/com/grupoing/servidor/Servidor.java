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
        server.createContext("/tecnica", new manejadorTecnica());
        server.createContext("/seguro", new manejadorSeguro());
        server.createContext("/auth", new manejadorAuth());
        server.createContext("/refresh", new manejadorRefresh());
        server.setExecutor(null);
        server.start();
    }
}
