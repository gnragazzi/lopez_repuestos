/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Chofer;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;


public class ChoferDAOImpl implements IDAO<Chofer>{
    
    private Connection conexion;
    
    public ChoferDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();
    }

    
    public void create(Chofer obj) throws Exception {
         PreparedStatement envioChofer;
         //**** PREGUNTAR SI LO CORRECTO ES DAR EL ALTA EN EMPLEADOS DE LA TABLA EMPLEADOS Y EL ALTA DE CHOFERES EN EL DAO CHOFERES ****//
         // ALTA EN Empleados
         envioChofer = conexion.prepareStatement("INSERT INTO Empleados(DNI, CUIL, Nombre, Apellido, Domicilio, Fecha_Nacimiento, Telefono, Es_Mec_Chof) " 
                 + "value(?,?,?,?,?,?,?,?);");
         envioChofer.setString(1, obj.getDni());
         envioChofer.setString(2, obj.getCuil());
         envioChofer.setString(3, obj.getNombre());
         envioChofer.setString(4, obj.getApellido());
         envioChofer.setString(5, obj.getDomicilio());
         envioChofer.setString(6, String.valueOf(obj.getFecha_nacimiento()));
         envioChofer.setString(7, obj.getTelefono());
         envioChofer.setString(8,"Chofer");
         envioChofer.executeUpdate();
         //ALTA EN Choferes
         envioChofer = conexion.prepareStatement("INSERT INTO Choferes(Fecha_Psicotecnico, Empleados_DNI) "
                 + "value(?,?);");
         envioChofer.setString(1, obj.getFecha_psicotecnico().toString());
         envioChofer.setString(2, obj.getDni());
         envioChofer.execute();
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
            choferes.add(chofer);
        }
        return choferes;
    }

}
