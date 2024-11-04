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

public class ChoferDAOImpl implements IDAO<Chofer> {

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
        envioChofer.setString(8, "Chofer");
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

    @Override
    public void update(Chofer obj, String key) throws Exception {
        PreparedStatement updateChofer;
        if (obj.getDni().equals(key)) {
            System.out.println("Llegué correctamente");  
            updateChofer = conexion.prepareStatement("UPDATE Empleados SET " 
                    + "CUIL=?, Nombre=?, Apellido=?, Domicilio=?, Fecha_Nacimiento=?, Telefono=? "
                    + "WHERE DNI=?;");
            updateChofer.setString(1, obj.getCuil());
            updateChofer.setString(2, obj.getNombre());
            updateChofer.setString(3, obj.getApellido());
            updateChofer.setString(4, obj.getDomicilio());
            updateChofer.setString(5, obj.getFecha_nacimiento().toString());
            updateChofer.setString(6, obj.getTelefono());
            updateChofer.setString(7, key);
            updateChofer.execute();

            updateChofer = conexion.prepareStatement("UPDATE Choferes SET " 
                    + "Fecha_Psicotecnico=? "
                    + "WHERE Empleados_DNI=?;");  
            updateChofer.setString(1, obj.getFecha_psicotecnico().toString());
            updateChofer.setString(2, key); 
            updateChofer.execute();

        } else {
            create(obj);
            delete(key);
        }
    }

    public void delete(String key) throws Exception {
        //BAJA DE TABLA Choferes
        PreparedStatement bajaChofer = conexion.prepareStatement("DELETE FROM Choferes WHERE Choferes.Empleados_DNI=?;");
        bajaChofer.setString(1, key);
        bajaChofer.execute();

        //BAJA DE TABLA Empleados
        bajaChofer = conexion.prepareStatement("DELETE FROM Empleados WHERE Empleados.DNI=?;");
        bajaChofer.setString(1, key);
        bajaChofer.execute();
    }

    public ArrayList<Chofer> list() throws Exception {
        Statement statement = conexion.createStatement();
        ResultSet rs = statement.executeQuery("select * from Empleados, Choferes where dni=Empleados_DNI;");
        ArrayList<Chofer> choferes = new ArrayList<>();
        while (rs.next()) {
            Chofer chofer = new Chofer();
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
