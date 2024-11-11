/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Tecnica;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public class TecnicaDAOImpl implements IDAO<Tecnica>{
    
    private Connection conexion;
    
    public TecnicaDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();
    }
    @Override
    public void create(Tecnica tecnica) throws Exception {
        PreparedStatement envioTecnica;
        envioTecnica = conexion.prepareStatement("insert into tecnicas(Fecha_emision, Fecha_vencimiento, Ubicacion, Vehiculo) "
                + "value ( ? , ? , ? , ? );");
        envioTecnica.setString(1,String.valueOf(tecnica.getFecha_emision()));
        envioTecnica.setString(2,String.valueOf(tecnica.getFecha_vencimiento()));
        envioTecnica.setString(3,tecnica.getUbicacion());
        envioTecnica.setString(4,tecnica.getVehiculo().getPatente());
        
        envioTecnica.executeUpdate();
    }

    @Override
    public ArrayList<Tecnica> list() throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Tecnica read(String clave) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Tecnica obj, String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
