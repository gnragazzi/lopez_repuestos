/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Chofer;
import Conexion.Conexion;
import InterfacesDAO.IChoferDAO;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;


public class ChoferDAOImpl implements IChoferDAO{
    
    private Connection conexion;
    
    public ChoferDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();;
    }
    @Override
    public void create(Chofer chofer) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(Chofer chofer) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Chofer chofer) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public ArrayList<Chofer> list() throws Exception {
        Statement statement= conexion.createStatement();
        ResultSet rs = statement.executeQuery("select * from empleados, choferes where dni=Empleados_DNI;");
        ArrayList<Chofer> choferes= new ArrayList<>(); 
        while(rs.next()){
            Chofer chofer= new Chofer();
            chofer.setDni(rs.getString("Empleados_DNI"));
            chofer.setCuil(rs.getString("Cuil"));
            chofer.setNombre(rs.getString("Nombre"));
            chofer.setApellido(rs.getString("Apellido"));
            chofer.setTelefono(rs.getString("Telefono"));
            choferes.add(chofer);
        }
        return choferes;
    }

    @Override
    public void find(Chofer chofer) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
