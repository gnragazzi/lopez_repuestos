package com.grupoing.servidor;

import java.io.IOException;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;

import Conexion.Conexion;
import com.grupoing.servidor.manejadorMantenimiento;
import com.grupoing.servidor.manejadorMecanicos;
import java.io.IOException;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpServer;
import com.grupoing.servidor.manejadorVehiculos;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Servidor {

    public static int port = 8080;
    public static void main(String[] args) throws IOException, SQLException, ClassNotFoundException {
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        System.out.println("Servidor Montado en el puerto " + port);
        server.createContext("/vehiculos", new manejadorVehiculos());
        server.createContext("/mecanicos", new manejadorMecanicos());
        server.createContext("/mantenimiento", new manejadorMantenimiento());
        server.createContext("/cargar_viaje", new manejadorViaje());
        
        
        server.setExecutor(null);
        Connection conexion = Conexion.getInstancia().getConexion();
        String sql = "insert into tarjetas_ruta (Fecha_Emision, Fecha_Vencimiento) value ('2024-03-01','2024-03-02');";
        PreparedStatement envio;
            envio = conexion.prepareStatement("insert into tarjetas_ruta (Fecha_Emision, Fecha_Vencimiento) value ('2024-04-01','2024-05-02');");
            envio.executeUpdate();  
        server.start();
    }
}
