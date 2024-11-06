/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Chofer;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;


public class ChoferDAOImpl implements IDAO<Chofer>{
    
    private Connection conexion;
    
    public ChoferDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();
    }

    
    public void create(Chofer obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public Chofer read(Chofer obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
     public void update(Chofer obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public void delete(Chofer obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    
    public ArrayList<Chofer> list() throws Exception {
        Statement statement= conexion.createStatement();
        ResultSet rs = statement.executeQuery("select * from Empleados, Choferes where dni=Empleados_DNI;");
        ArrayList<Chofer> choferes= new ArrayList<>(); 
        while(rs.next()){
            Chofer chofer= new Chofer();
            chofer.setDni(rs.getString("Empleados_DNI"));
            chofer.setCuil(rs.getString("Cuil"));
            chofer.setNombre(rs.getString("Nombre"));
            chofer.setApellido(rs.getString("Apellido"));
            chofer.setTelefono(rs.getString("Telefono"));
            chofer.setActivo(rs.getBoolean("EsActivo"));
            choferes.add(chofer);
        }
        return choferes;
    }

}
