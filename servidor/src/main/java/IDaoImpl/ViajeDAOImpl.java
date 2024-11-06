/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Camion;
import Clases.Chofer;
import Clases.Costos;
import Clases.Semirremolque;
import Clases.Viaje;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public class ViajeDAOImpl implements IDAO<Viaje> {

    private Connection conexion;

    public ViajeDAOImpl() throws ClassNotFoundException {
        this.conexion = Conexion.getInstancia().getConexion();
    }

    @Override
    public void create(Viaje viaje) throws Exception {
        PreparedStatement envioViaje;
        envioViaje = conexion.prepareStatement("insert into Viajes(Fecha_partida, Fecha_llegada, Fecha_esperada, Kilometros_realizados, Costos_combustibles, Destino, Peso, Camiones_Vehiculos_Patente, Semirremolques_Vehiculos_Patente, Choferes_Empleados_DNI) "
                + "value(? , ? , ? , ? , ? , ? , ? , ? , ? , ?);");
        envioViaje.setString(1,String.valueOf(viaje.getFecha_partida()));
        envioViaje.setString(2,String.valueOf(viaje.getFecha_llegada()));
        envioViaje.setString(3,String.valueOf(viaje.getFecha_esperada()));
        envioViaje.setInt(4, viaje.getKilometros_realizados());
        envioViaje.setDouble(5, viaje.getCostos_combustibles());
        envioViaje.setString(6, viaje.getDestino());
        envioViaje.setInt(7, viaje.getPeso());
        envioViaje.setString(8, viaje.getCamion().getPatente());
        envioViaje.setString(9, viaje.getSemirremolque().getPatente());
        envioViaje.setString(10, viaje.getChofer().getDni());
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
        Statement statement = conexion.createStatement();
        ResultSet rs = statement.executeQuery("select * from Viajes;");
        ArrayList<Viaje> viajes = new ArrayList<>();
        while (rs.next()) {
            Viaje viaje = new Viaje();
            Camion camion = new Camion();
            Semirremolque semi = new Semirremolque();
            Chofer chofer = new Chofer();
            camion.setPatente(rs.getString("Camiones_Vehiculos_Patente"));
            semi.setPatente(rs.getString("Semirremolques_Vehiculos_Patente"));
            chofer.setDni(rs.getString("Choferes_Empleados_DNI"));
            viaje.setCamion(camion);
            viaje.setSemirremolque(semi);
            viaje.setChofer(chofer);
            viaje.setFecha_llegada(LocalDate.parse(rs.getString("Fecha_llegada")));
            viaje.setFecha_partida(LocalDate.parse(rs.getString("Fecha_partida")));
            viaje.setPeso(rs.getInt("peso"));
            viaje.setDestino(rs.getString("destino"));
            viajes.add(viaje);
        }
        return viajes;
    }

    public ArrayList<Viaje> comprobarfechas(String Fecha_partida, String Fecha_llegada) throws Exception {
        PreparedStatement comprobarFechas = conexion.prepareStatement("select * from Viajes where (Fecha_partida between ?  and ? ) or (Fecha_llegada between ? and  ?);");
        comprobarFechas.setString(1, Fecha_partida);
        comprobarFechas.setString(2, Fecha_llegada);
        comprobarFechas.setString(3, Fecha_partida);
        comprobarFechas.setString(4, Fecha_llegada);
        
        ResultSet rs = comprobarFechas.executeQuery();
        ArrayList<Viaje> viajes = new ArrayList<>();
        while (rs.next()) {
            Viaje viaje = new Viaje();
            Camion camion = new Camion();
            Semirremolque semi = new Semirremolque();
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
    
    public ArrayList<Viaje> ver_entregas_tardias() throws SQLException{
        ArrayList<Viaje> viajes=new ArrayList<>();
        
        Statement statement = conexion.createStatement();
        ResultSet rs = statement.executeQuery("select * from Viajes where fecha_llegada > fecha_esperada");
        
        while(rs.next()){
            Viaje viaje = new Viaje();
            Camion camion = new Camion();
            Semirremolque semi = new Semirremolque();
            Chofer chofer = new Chofer();
            camion.setPatente(rs.getString("Camiones_Vehiculos_Patente"));
            semi.setPatente(rs.getString("Semirremolques_Vehiculos_Patente"));
            chofer.setDni(rs.getString("Choferes_Empleados_DNI"));
            viaje.setCamion(camion);
            viaje.setSemirremolque(semi);
            viaje.setChofer(chofer);
            viaje.setFecha_llegada(LocalDate.parse(rs.getString("Fecha_llegada")));
            viaje.setFecha_partida(LocalDate.parse(rs.getString("Fecha_partida")));
            viaje.setFecha_esperada(LocalDate.parse(rs.getString("Fecha_esperada")));
            viaje.setDestino(rs.getString("destino"));
            viajes.add(viaje);
        }
        
        
        return viajes;
    }

    @Override
    public Viaje read(Viaje obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    public Costos calcular_costos_viaje (String patente, LocalDate fecha) throws SQLException{
        Costos respuesta = new Costos();

        PreparedStatement costoViaje= conexion.prepareStatement("SELECT sum(Costos_combustibles), sum(Kilometros_realizados) FROM Viajes WHERE MONTH(Fecha_partida) = ? AND YEAR(Fecha_partida) = ? and Camiones_Vehiculos_Patente= ? ;");
        costoViaje.setInt(1, fecha.getMonthValue());
        costoViaje.setInt(2, fecha.getYear());
        costoViaje.setString(3, patente);
        ResultSet rs= costoViaje.executeQuery();
        rs=costoViaje.executeQuery();
        while(rs.next()){
            respuesta.setCosto_combustible(rs.getFloat("sum(Costos_combustibles)")); 
            respuesta.setKilometros_realizados(rs.getFloat("sum(Kilometros_realizados)"));
        }
        
        return respuesta;
    }
}
