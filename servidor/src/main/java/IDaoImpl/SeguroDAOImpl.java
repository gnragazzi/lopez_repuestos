/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Seguro;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public class SeguroDAOImpl implements IDAO<Seguro>{
    
    private Connection conexion;
    
    public SeguroDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();
    }
    @Override
    public void create(Seguro seguro) throws Exception {
        
        PreparedStatement envioSeguro;
        envioSeguro = conexion.prepareStatement("insert into Seguros(Fecha_emision, Fecha_vencimiento, Pago, Tipo, Nombre_aseguradora, Vehiculo) "
                + "value ( ? , ? , ? , ? , ?, ?);");
        envioSeguro.setString(1,String.valueOf(seguro.getFecha_emision()));
        envioSeguro.setString(2,String.valueOf(seguro.getFecha_vencimiento()));
        envioSeguro.setFloat(3, seguro.getPago());
        envioSeguro.setString(4, seguro.getTipo());
        envioSeguro.setString(5, seguro.getNombre_aseguradora());
        envioSeguro.setString(6, seguro.getVehiculo());

        envioSeguro.executeUpdate();
        
    }

    @Override
    public void delete(Seguro seguro) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Seguro seguro) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public ArrayList<Seguro> list() throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Seguro read(Seguro obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
