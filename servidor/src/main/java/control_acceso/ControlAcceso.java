/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package control_acceso;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import Conexion.ConexionLogin;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

//aca tenemos que poner que implementa la intefaz DAO
public class ControlAcceso {

    private Connection conexion;

    public void conectarBD() throws ClassNotFoundException {
        this.conexion = ConexionLogin.getInstancia().getConexion();;
    }

    private String sha256(String contrasena) {
        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-256");
            byte[] hash = sha.digest(contrasena.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexa = new StringBuilder();

            for (byte b : hash) {
                hexa.append(String.format("%02x", b));
            }

            return hexa.toString();

        } catch (NoSuchAlgorithmException ex) {
            throw new RuntimeException(ex);
        }
    }

    public boolean read(String nombre, String contrasena) throws ClassNotFoundException {
        try {
            conectarBD();
            PreparedStatement loguear = conexion.prepareStatement("select contrasena from usuarios where nombre = ?");
            loguear.setString(1, nombre);
            ResultSet rs = loguear.executeQuery();

            if (rs.next()) {
                String hash = sha256(contrasena);
                if (hash.equals(rs.getString(1))) {
                    return true;
                } else {
                    return false;
                }
            }

            return false;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void create(String nombre, String contrasena) throws ClassNotFoundException {
        try {
            conectarBD();
            String hash = sha256(contrasena);
            PreparedStatement insertar = conexion.prepareStatement("insert into usuarios(nombre,contrasena) value (? , ?);");
            insertar.setString(1, nombre);
            insertar.setString(2, hash);
            insertar.executeUpdate();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean readUser(String nombre) throws ClassNotFoundException {
        try {
            conectarBD();
            PreparedStatement loguear = conexion.prepareStatement("select nombre from usuarios where nombre=?");
            loguear.setString(1, nombre.toString());
            ResultSet rs = loguear.executeQuery();

            if (rs.next()) {
                return true;
            } else {
                return false;
            }

        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }

    }

    public String getUltimaFecha() throws SQLException, ClassNotFoundException, Exception {
        conectarBD();
        PreparedStatement buscarFecha = conexion.prepareStatement("SELECT Fecha FROM Registro_Backup ORDER BY Fecha DESC;");
        ResultSet rs = buscarFecha.executeQuery();

        if (rs.next()) {
            return rs.getString("Fecha");
        } else {
            throw new Exception();
        }
    }

    public void cargarRegistro() throws SQLException, ClassNotFoundException {
        int x = 0;
        conectarBD();
        PreparedStatement st = conexion.prepareStatement("SELECT count(Id) FROM Registro_Backup;");
        ResultSet rs = st.executeQuery();
        rs.next();
        x = rs.getInt("count(id)");
        if (x >= 12) { 
            st = conexion.prepareStatement("SELECT Id FROM Registro_Backup ORDER BY(Fecha);");
            rs = st.executeQuery();
            rs.next();
            x = rs.getInt("Id");
            st = conexion.prepareStatement("DELETE FROM Registro_Backup WHERE Id=" + x + ";");
            st.execute();

        }
        st = conexion.prepareStatement("INSERT INTO Registro_Backup(Fecha) value(\"" + LocalDate.now().toString() +"\");"); 
        st.execute();
    }

    /*  
        @Override 
        public void delete() throws Exception {
            throw new UnsupportedOperationException("Not supported yet."); 
        }
        
        @Override 
        public void update() throws Exception {
            throw new UnsupportedOperationException("Not supported yet."); 
        }
     */
}
