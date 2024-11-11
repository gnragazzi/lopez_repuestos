package com.grupoing.servidor;

import Clases.Chofer;
import Clases.Empleado;
import Clases.Mecanico;
import IDaoImpl.ChoferDAOImpl;
import IDaoImpl.MecanicoDAOImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.sun.net.httpserver.HttpExchange;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import static com.grupoing.servidor.Manejador.obtenerParámetros;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.Iterator;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONObject;

public class manejadorEmpleado extends Manejador {

    ChoferDAOImpl choferDAO;
    MecanicoDAOImpl mecánicoDao;

    public manejadorEmpleado() {
        try {
            choferDAO = new ChoferDAOImpl();
            mecánicoDao = new MecanicoDAOImpl();
        } catch (Exception ex) {
            Logger.getLogger(manejadorEmpleado.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    public String manejarGet(HttpExchange he) throws UnsupportedEncodingException, ClassNotFoundException, Exception {
        String tipo = obtenerParámetros(uri, "tipo");
        String esActivo = obtenerParámetros(uri, "activo");
        String id = obtenerParámetros(uri, "id");

        ArrayList<Empleado> empleados = new ArrayList<>();
        if (tipo == null) {
            //Es decir, en este caso no se quiso acceder a ningún tipo de empleado en particular, y se busca choferes y mecánicos por igual
            throw new Exception(); // TODAVÍA NO ESTÁ IMPLEMENTADO
        } else if (tipo.equalsIgnoreCase("chofer")) {
            // SI HAY CAMPO ID, SE BUSCA UN SUJETO, SINO LA LISTA COMPLETA
            if (id != null) {
                Chofer temp = choferDAO.read(id);
                empleados.add(temp);
            } else {
                Iterator<Chofer> iteratorChofer = choferDAO.list().iterator();
                if (esActivo == null) {
                    while (iteratorChofer.hasNext()) {
                        empleados.add(iteratorChofer.next());
                    }
                } else {
                    while (iteratorChofer.hasNext()) {
                        Chofer temp = iteratorChofer.next();
                        if (temp.getActivo() == Boolean.parseBoolean(esActivo)) {
                            empleados.add(temp);
                        }
                    }
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
                    if (temp.getActivo() == Boolean.parseBoolean(esActivo)) {
                        empleados.add(temp);
                    }
                }
            }
        } else {
            //entonces está intentando acceder a un tipo incorrecto, por lo que el mensaje de respuesta debería ser 404 
        }
        // send response

        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        return ow.writeValueAsString(id != null ? empleados.get(0) : empleados);
    }

    @Override
    public String manejarPost(HttpExchange he) throws Exception {

        InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
        BufferedReader br = new BufferedReader(isr);
        int b;
        StringBuilder buf = new StringBuilder(512);
        while ((b = br.read()) != -1) {
            buf.append((char) b);
        }
        br.close();
        isr.close();

        JSONObject jsonobj = new JSONObject(buf.toString());

        Chofer temp = new Chofer(
                LocalDate.parse(jsonobj.getString("fecha_psicotecnico")),
                null,
                jsonobj.getString("dni"),
                jsonobj.getString("cuil"),
                jsonobj.getString("nombre"),
                jsonobj.getString("apellido"),
                jsonobj.getString("domicilio"),
                LocalDate.parse(jsonobj.getString("fecha_nacimiento")),
                jsonobj.getString("telefono"),
                Boolean.TRUE);
        choferDAO.create(temp);

        return "Alta Exitosa";
    }

    @Override
    protected String manejarPatch(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        String id = obtenerParámetros(uri, "id");
        InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
        BufferedReader br = new BufferedReader(isr);
        int b;
        StringBuilder buf = new StringBuilder(512);
        while ((b = br.read()) != -1) {
            buf.append((char) b);
        }
        br.close();
        isr.close();
        JSONObject jsonobj = new JSONObject(buf.toString());

        
        //System.out.println("Aqui: " + buf.toString());  
        System.out.println("Fecha_psicotécnico: " + LocalDate.parse(jsonobj.getString("fecha_psicotecnico")) );  
        System.out.println("fecha_nacimiento: " + LocalDate.parse(jsonobj.getString("fecha_nacimiento")));   
        Chofer temp = new Chofer(
                LocalDate.parse(jsonobj.getString("fecha_psicotecnico")),
                null,
                jsonobj.getString("dni"),
                jsonobj.getString("cuil"),
                jsonobj.getString("nombre"),
                jsonobj.getString("apellido"),
                jsonobj.getString("domicilio"),
                LocalDate.parse(jsonobj.getString("fecha_nacimiento")),
                jsonobj.getString("telefono"),
                jsonobj.getBoolean("esActivo"));
        System.out.println("Llegar acá, estaría buenísimo."); 
        choferDAO.update(temp, id);

        return "Actualización Exitosa";
    }

    @Override
    protected String manejarDelete(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        String tipo = obtenerParámetros(uri, "tipo");
        String id = obtenerParámetros(uri, "id");

        if (tipo.equalsIgnoreCase("Chofer")) {
            choferDAO.delete(id);
        } else {
            throw new Exception();// NO SOPORTADO TODAVÍA
        }

        return "Empleado Borrado Exitosamente (DNI=" + id + ")";
    }

}
