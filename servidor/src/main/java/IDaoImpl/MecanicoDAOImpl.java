/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Mecanico;
import Conexion.Conexion;
import InterfacesDAO.IMecanicoDAO;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public class MecanicoDAOImpl implements IMecanicoDAO{
    
    private Connection conexion;
    
    public MecanicoDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();;
    }
    @Override
    public void create(Mecanico mecanico) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(Mecanico mecanico) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Mecanico mecanico) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public ArrayList<Mecanico> list() throws Exception {
        Statement statement=conexion.createStatement();
        ResultSet rs=statement.executeQuery("Select * from Mecanicos, Empleados where DNI=Empleados_DNI;");
        ArrayList<Mecanico> mecanicos= new ArrayList<>();
        while(rs.next()){
            Mecanico mecanico=new Mecanico();
            mecanico.setDni(rs.getString("Dni"));
            mecanico.setNombre(rs.getString("Nombre"));
            mecanico.setApellido(rs.getString("Apellido"));
            mecanicos.add(mecanico);
        }
        
       return mecanicos;
    }

    @Override
    public void find(Mecanico mecanico) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    
}
