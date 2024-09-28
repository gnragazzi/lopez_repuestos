import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.Date;

import com.sun.net.httpserver.HttpServer;

import Clases.Camion;
import Clases.Seguro;
import Clases.Semirremolque;
import Clases.Tarjeta_Ruta;
import Clases.Tecnica;

public class Servidor {
    public static int port = 9000;

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        System.out.println("Servidor Montado en el puerto " + port);
        server.setExecutor(null);
        server.start();

        Date fecha=new Date(2024,8,27);

        Camion camion1= new Camion("Scania","WUB 750",
        new Seguro(fecha, fecha,"Seguro Metal",51251, "todo_riesgo"),
        new Tarjeta_Ruta(fecha,fecha,null),
        new Tecnica(fecha,fecha, "San Luis", null),
        null, 
        "R123", 
        "360", 
        "100.000km", 
        null, 
        null);

        Semirremolque semirremolque1= new Semirremolque(
        "Patito",
        "ABC 321",
        new Seguro (fecha,fecha,"Seguro Madera", 65466,"algún riesgo"),
        new Tarjeta_Ruta(fecha,fecha,null),
        new Tecnica(fecha,fecha,"San Luis", null),
        null,
        "Tolva",
        "Cemento",
        null
        ); 
    }
}
