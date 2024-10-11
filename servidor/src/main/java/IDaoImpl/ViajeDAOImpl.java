/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Camion;
import Clases.Chofer;
import Clases.Semirremolque;
import Clases.Viaje;
import Conexion.Conexion;
import InterfacesDAO.IViajeDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public class ViajeDAOImpl implements IViajeDAO{
    
    private Connection conexion;
    
    
    public ViajeDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();;
    }
    
    @Override
    public void create(Viaje viaje) throws Exception {
        PreparedStatement envioViaje;
        envioViaje= conexion.prepareStatement("insert into viajes(Fecha_partida, Fecha_llegada, Fecha_esperada, Kilometros_realizados, Costos_combustibles, Destino, Peso, Camiones_Vehiculos_Patente, Semirremolques_Vehiculos_Patente, Choferes_Empleados_DNI)" +
        "value('" + viaje.getFecha_partida() + "', '" + viaje.getFecha_llegada() + "','" + viaje.getFecha_esperada() + "'," + viaje.getKilometros_realizados() + "," +viaje.getCostos_combustibles() + ", '" + viaje.getDestino() + "', "
                + viaje.getPeso() + ", '" + viaje.getCamion().getPatente() + "', '" + viaje.getSemirremolque().getPatente() + "', '" + viaje.getChofer().getDni() + "');");
        envioViaje.executeUpdate();
    }

    @Override
    public void delete(Viaje viaje) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Viaje viaje) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public ArrayList<Viaje> list() throws Exception {
        Statement statement= conexion.createStatement();
        ResultSet rs=statement.executeQuery("select * from Viajes;");
        ArrayList<Viaje> viajes = new ArrayList<>();
        while(rs.next()){
            Viaje viaje= new Viaje();
            Camion camion = new Camion();
            Semirremolque semi= new Semirremolque();
            Chofer chofer = new Chofer();
            camion.setPatente(rs.getString("Camiones_Vehiculos_Patente"));
            semi.setPatente(rs.getString("Semirremolques_Vehiculos_Patente"));
            chofer.setDni(rs.getString("Choferes_Empleados_DNI"));
            viaje.setCamion(camion);
            viaje.setSemirremolque(semi);
            viaje.setChofer(chofer);
            viaje.setFecha_llegada(LocalDate.parse(rs.getString("Fecha_llegada")));
            viaje.setFecha_partida(LocalDate.parse(rs.getString("Fecha_partida")));
            viajes.add(viaje);
        }
        return viajes;
    }

    @Override
    public void find(Viaje viaje) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public ArrayList<Viaje> comprobarfechas(String Fecha_partida, String Fecha_llegada) throws Exception {
        Statement statement= conexion.createStatement();
        ResultSet rs= statement.executeQuery("select * from viajes where (Fecha_partida between '" + Fecha_partida + "'  and '" + Fecha_llegada + "' ) or (Fecha_llegada between '" + Fecha_partida + "' and  '" + Fecha_llegada + "');");
        ArrayList<Viaje> viajes= new ArrayList<>();
        while(rs.next()){
            Viaje viaje= new Viaje();
            Camion camion = new Camion();
            Semirremolque semi= new Semirremolque();
            Chofer chofer = new Chofer();
            camion.setPatente(rs.getString("Camiones_Vehiculos_Patente"));
            semi.setPatente(rs.getString("Semirremolques_Vehiculos_Patente"));
            chofer.setDni(rs.getString("Choferes_Empleados_DNI"));
            viaje.setCamion(camion);
            viaje.setSemirremolque(semi);
            viaje.setChofer(chofer);
            viaje.setFecha_llegada(LocalDate.parse(rs.getString("Fecha_llegada")));
            viaje.setFecha_partida(LocalDate.parse(rs.getString("Fecha_partida")));
            viajes.add(viaje);
        }
        
        return viajes;
    }
    
   
    
}
