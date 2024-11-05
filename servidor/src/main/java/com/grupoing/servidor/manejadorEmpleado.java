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
import java.util.logging.Level;
import java.util.logging.Logger;

public class manejadorEmpleado extends Manejador {

    ChoferDAOImpl choferDAO;
    MecanicoDAOImpl mecánicoDao;

    public manejadorEmpleado() {
        try {
            choferDAO = new ChoferDAOImpl();
            mecánicoDao = new MecanicoDAOImpl();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(manejadorEmpleado.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public String manejarGet(HttpExchange he) throws UnsupportedEncodingException, ClassNotFoundException, Exception {

        String tipo = obtenerParámetros(he.getRequestURI(), "tipo");

        String esActivo = obtenerParámetros(he.getRequestURI(), "activo");

        ArrayList<Empleado> empleados = new ArrayList<>();
        if (tipo == null) {
            //Es decir, en este caso no se quiso acceder a ningún tipo de empleado en particular, y se busca choferes y mecánicos por igual
            throw new Exception(); // TODAVÍA NO ESTÁ IMPLEMENTADO
        } else if (tipo.equalsIgnoreCase("chofer")) {

            Iterator<Chofer> iteratorChofer = choferDAO.list().iterator();
            if (esActivo == null) {
                while (iteratorChofer.hasNext()) {
                    empleados.add(iteratorChofer.next());
                }
            } else {
                while (iteratorChofer.hasNext()) {
                    Chofer temp = iteratorChofer.next();
                    if(temp.getActivo() == Boolean.parseBoolean(esActivo))
                       empleados.add(temp);
                }
            }

        } else if (tipo.equalsIgnoreCase("mecánico")) {

            Iterator<Mecanico> iteratorMecanico = mecánicoDao.list().iterator();
            if (esActivo == null) {
                while (iteratorMecanico.hasNext()) {
                    empleados.add(iteratorMecanico.next());
                }
            } else {
                while (iteratorMecanico.hasNext()) {
                    Mecanico temp = iteratorMecanico.next();
                    if(temp.getActivo() == Boolean.parseBoolean(esActivo)) 
                       empleados.add(temp);
                }
            }
        } else {
            //entonces está intentando acceder a un tipo incorrecto, por lo que el mensaje de respuesta debería ser 404
        }
        // send response

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(empleados);
    }

    public String manejarPost(HttpExchange he) throws Exception {
        throw new Exception();
    }

}
