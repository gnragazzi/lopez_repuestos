/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Tarjeta_Ruta;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public class Tarjeta_RutaDAOImpl implements IDAO<Tarjeta_Ruta>{
    
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
    
}
