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


//aca tenemos que poner que implementa la intefaz DAO
public class ControlAcceso {
    
    private Connection conexion;
    
    public void conectarBD() throws ClassNotFoundException {
         this.conexion = ConexionLogin.getInstancia().getConexion();;
    }
    
    private String sha256(String contrasena){
        try{
            MessageDigest sha = MessageDigest.getInstance("SHA-256");
            byte[] hash= sha.digest(contrasena.getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexa =new StringBuilder();
            
            for(byte b : hash){
                hexa.append(String.format("%02x", b));
            }
            
            return hexa.toString();
      
        }
        catch(NoSuchAlgorithmException ex){
            throw new RuntimeException(ex);
        }
    }
    
    
    public int read(String nombre, String contrasena) throws ClassNotFoundException{
        try{
            conectarBD();
            PreparedStatement loguear= conexion.prepareStatement("select contrasena from usuarios where nombre=?");
            loguear.setString(1,contrasena.toString());
            ResultSet rs = loguear.executeQuery();
       
            if(rs.next()){
                String hash= sha256(contrasena);
                if(hash == rs.toString())
                    return 1;
                else
                    return -1;
            }
            
            return -1;
            
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
    }
    
    public void create(String nombre, String contrasena) throws ClassNotFoundException{
        try{
            conectarBD();
            String hash = sha256(contrasena);
            PreparedStatement insertar = conexion.prepareStatement("insert (nombre,contrasena) into usuarios value (?, ?);");
            insertar.setString(1, nombre);
            insertar.setString(2, hash);
            insertar.executeUpdate();
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
    }
    
    public int readUser(String nombre) throws ClassNotFoundException{
        try{
            conectarBD();
            PreparedStatement loguear= conexion.prepareStatement("select nombre from usuarios where nombre=?");
            loguear.setString(1,nombre.toString());
            ResultSet rs = loguear.executeQuery();
       
            if(rs.next())
                return 1;
            else
                return -1;
            
        }
        catch(Exception e){
            throw new RuntimeException(e);
        }
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
