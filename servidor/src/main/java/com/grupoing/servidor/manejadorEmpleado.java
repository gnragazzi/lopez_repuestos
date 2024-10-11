package com.grupoing.servidor;

import Clases.Chofer;
import Clases.Empleado;
import Clases.Mecanico;
import IDaoImpl.ChoferDAOImpl;
import IDaoImpl.MecanicoDAOImpl;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import java.util.Iterator;

public class manejadorEmpleado extends Manejador {

    public String manejarGet(HttpExchange he) throws UnsupportedEncodingException, ClassNotFoundException, Exception {

        String tipo = obtenerParámetros(he.getRequestURI(), "tipo");

        ArrayList<Empleado> empleados = new ArrayList<>();
        if (tipo == null) {
            //Es decir, en este caso no se quiso acceder a ningún tipo de empleado en particular, y se busca choferes y mecánicos por igual
        } else if (tipo.equalsIgnoreCase("chofer")) {
            ChoferDAOImpl choferDAO = new ChoferDAOImpl();
            Iterator<Chofer> iteratorChofer = choferDAO.list().iterator();
            while (iteratorChofer.hasNext()) {
                empleados.add(iteratorChofer.next());
            }

        } else if (tipo.equalsIgnoreCase("mecánico")) {
            MecanicoDAOImpl mecánicoDao = new MecanicoDAOImpl();
            Iterator<Mecanico> iteratorMecanico = mecánicoDao.list().iterator();
            while (iteratorMecanico.hasNext()) {
                empleados.add(iteratorMecanico.next());
            }
        } else {
            //entonces está intentando acceder a un tipo incorrecto, por lo que el mensaje de respuesta debería ser 404
        }
        // send response

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(empleados);
    }

    public String manejarPost(HttpExchange he) {
        //IMPLEMENTAR MÉTODOS PARA SUBIR 
        return "POST REQUEST";
    }

}
