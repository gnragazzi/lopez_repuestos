/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Tarjeta_Ruta;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public class Tarjeta_RutaDAOImpl implements IDAO<Tarjeta_Ruta> {

    private Connection conexion;

    public Tarjeta_RutaDAOImpl() throws ClassNotFoundException {
        this.conexion = Conexion.getInstancia().getConexion();
    }

    @Override
    public void create(Tarjeta_Ruta tarjeta_ruta) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public ArrayList<Tarjeta_Ruta> list() throws Exception {
        // LISTAR LAS TARJETA_RUTAS
        return null;
    }

    @Override
    public Tarjeta_Ruta read(String clave) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Tarjeta_Ruta obj, String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public Tarjeta_Ruta ultimaTarjetaRuta(String patente) throws Exception {

        PreparedStatement statement = conexion.prepareStatement("SELECT * FROM Tarjetas_Ruta where Fecha_Vencimiento=(select max(Fecha_Vencimiento) FROM Tarjetas_Ruta where Vehiculo = ?) and Vehiculo = ? ORDER BY idTarjetas_Ruta DESC;");
        statement.setString(1, patente);
        statement.setString(2, patente);

        ResultSet rs = statement.executeQuery();

        if (rs.next()) {
            Tarjeta_Ruta auxiliar = new Tarjeta_Ruta();
            
            // CONSTRUIR TARJETA_RUTA
            auxiliar.setFecha_emision(LocalDate.parse(rs.getString("Fecha_Emision")));
            auxiliar.setFecha_vencimiento(LocalDate.parse(rs.getString("Fecha_Vencimiento")));
            return auxiliar;
        } else {
            return null;
        }
    }

}
