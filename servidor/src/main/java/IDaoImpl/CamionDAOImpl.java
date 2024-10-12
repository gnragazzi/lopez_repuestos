/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Camion;
import Clases.Costos;
import Conexion.Conexion;
import InterfacesDAO.ICamionDAO;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import org.json.JSONObject;

 
public class CamionDAOImpl implements ICamionDAO{

    private Connection conexion;
    
    public CamionDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();;
    }

    @Override
    public void create(Camion camion) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        /*ACA VA LA CONSULTA A LA BASE DE DATOS */
    }

    @Override
    public void delete(Camion camion) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        /*ACA VA LA CONSULTA A LA BASE DE DATOS */
    }

    @Override
    public void update(Camion camion) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        /*ACA VA LA CONSULTA A LA BASE DE DATOS */
    }

    @Override
    public ArrayList<Camion> list() throws Exception {
        Statement statement = conexion.createStatement();
        ResultSet rs = statement.executeQuery("select * from Camiones, Vehiculos where Patente=Vehiculos_Patente;");
        ArrayList<Camion> camiones = new ArrayList<>();
        while (rs.next()) {
            Camion camion = new Camion();
            camion.setPatente(rs.getString("Patente"));
            camion.setMarca(rs.getString("Marca"));
            camion.setModelo(rs.getString("Modelo"));
            camion.setKilometraje(rs.getInt("Kilometraje"));
            camion.setPotencia(rs.getString("Potencia"));
            camiones.add(camion);
            }
        return camiones;
    }

    @Override
    public void find(Camion camion) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Costos calcular_costos(String patente, LocalDate fecha) throws Exception {
        Costos respuesta = new Costos();
        respuesta.setPeríhodo(fecha);
        respuesta.setPatente(patente);
        
        Statement statement= conexion.createStatement();
        ResultSet rs= statement.executeQuery("SELECT sum(Costos_mano_de_obra), sum(Costos_repuestos) FROM Mantenimientos WHERE MONTH(Fecha) = "+ fecha.getMonthValue() +" AND YEAR(Fecha) = " + fecha.getYear() + " and Vehiculos_Patente= '" +patente + "'");
        while(rs.next()){
            respuesta.setCosto_repuestos(rs.getFloat("sum(Costos_repuestos)"));
            respuesta.setCost_mano_de_obra(rs.getFloat("sum(Costos_mano_de_obra)"));
        }
        rs=statement.executeQuery("SELECT sum(Costos_combustibles), sum(Kilometros_realizados) FROM Viajes WHERE MONTH(Fecha_partida) = "+ fecha.getMonthValue() +" AND YEAR(Fecha_partida) = " + fecha.getYear() + " and Camiones_Vehiculos_Patente='" +patente + "';");
        while(rs.next()){
            respuesta.setCosto_combustible(rs.getFloat("sum(Costos_combustibles)")); 
            respuesta.setKilometros_realizados(rs.getFloat("sum(Kilometros_realizados)"));
        }
        respuesta.calcularCostos_por_kilometros();
        
        return respuesta;
    }

}
