package Conexion;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {

    private static Conexion instanciaUnica;

    private Connection conexion;

    //A la hora de querer hacer una consulta a la base se tiene que hacer: 
    //Connection conexion = Conexion.getInstancia().getConexion();
    //A la hora de cerrar la conexion se hace:
    //Conexion.getInstancia().cerrarConexion();
    private Conexion() throws ClassNotFoundException {
        String url = Credenciales.getUrl();
        String usuario = Credenciales.getUsuario();
        String  contraseña= Credenciales.getContraseña();
        

        try {
            Class.forName(Credenciales.getDRIVERS());
            conexion = DriverManager.getConnection(url, usuario, contraseña);
            System.out.println("Connection is successful");
            System.out.println(conexion);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static Conexion getInstancia() throws ClassNotFoundException {
        if (instanciaUnica == null) {
            instanciaUnica = new Conexion();
        }
        return instanciaUnica;
    }

    public Connection getConexion() {
        return conexion;
    }

    public void closeConexion() {
        if (conexion != null) {
            try {
                conexion.close();
                System.out.println("Conexión cerrada.");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
