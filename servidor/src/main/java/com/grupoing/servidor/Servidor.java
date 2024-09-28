import Clases.Mecanico;
import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;

import com.grupoing.servidor.manejadorVehiculos;
import java.util.Date;

public class Servidor {
    public static int port = 8080;

    public static void main(String[] args) throws IOException {
	            Date fecha=new Date(2024,8,27);

	    Mecanico mecanico1= new Mecanico("45555555", "2044444442", "Ezequiel",  "Nodar", "La Toma (pueblito)", fecha, "2664555555",   null);
        Mecanico mecanico2= new Mecanico("45555555", "2044444442", "Ezequiel",  "Bernaldez", "San Luis (ciudad)", fecha, "2664555555",   null);
        Mecanico mecanico3= new Mecanico("45555555", "2044444442", "Gerardo", " Ragazzi", "Rosario (tiene armas en la casa)", fecha, "2664555555",   null);
	    
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        System.out.println("Servidor Montado en el puerto " + port);
	server.createContext("/vehiculos",new manejadorVehiculos());
        server.setExecutor(null);
        server.start();

    }
}
