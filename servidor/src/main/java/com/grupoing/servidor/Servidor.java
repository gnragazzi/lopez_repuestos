import com.grupoing.servidor.manejadorMantenimiento;
import com.grupoing.servidor.manejadorMecanicos;
import java.io.IOException;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpServer;

import com.grupoing.servidor.manejadorVehiculos;

public class Servidor {
    public static int port = 8080;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        System.out.println("Servidor Montado en el puerto " + port);
	server.createContext("/vehiculos",new manejadorVehiculos());
	server.createContext("/mecanicos",new manejadorMecanicos());
	server.createContext("/mantenimiento",new manejadorMantenimiento());
        server.setExecutor(null);
        server.start();
    }
}
