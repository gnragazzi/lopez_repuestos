/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Camion;
import Clases.Costos;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import org.json.JSONObject;

 
public class CamionDAOImpl implements IDAO<Camion>{

    private Connection conexion;
    
    public CamionDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();
    }

    public void create(Camion obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    public Camion read(String clave) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    public void update(Camion obj, String key) throws Exception {
        PreparedStatement envioCamion;
        envioCamion = conexion.prepareStatement("update Camiones set kilometraje=kilometraje + ? where Vehiculos_Patente= ?;");
        envioCamion.setInt(1,obj.getKilometraje());
        envioCamion.setString(2,obj.getPatente());
        envioCamion.executeUpdate();
    }
    

    
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

    public Costos calcular_costos(String patente, LocalDate fecha) throws Exception {
        Costos respuesta = new Costos();
        respuesta.setPeríhodo(fecha);
        respuesta.setPatente(patente);
        
        MantenimientoDAOImpl mantenimientoDAO= new  MantenimientoDAOImpl();
        ViajeDAOImpl viajeDAO= new  ViajeDAOImpl();
        
        Costos costoM= mantenimientoDAO.calcular_costos_mantenimiento(patente, fecha);
        Costos costoV= viajeDAO.calcular_costos_viaje(patente, fecha);
        
        respuesta.setCost_mano_de_obra(costoM.getCost_mano_de_obra());
        respuesta.setCosto_repuestos(costoM.getCosto_repuestos());
        respuesta.setCosto_combustible(costoV.getCosto_combustible());
        respuesta.setKilometros_realizados(costoV.getKilometros_realizados());
        
        
        respuesta.calcularCostos_por_kilometros();
        
        return respuesta;
    }

    @Override
    public void delete(String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }


}
