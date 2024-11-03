/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Camion;
import Clases.Semirremolque;
import Clases.Vehiculo;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;

/**
 *
 * @author clauz
 */
public class VehiculoDAOImpl implements IDAO<Vehiculo>{

    private Connection conexion;
    
    public VehiculoDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();
    }
    
    @Override
    public void create(Vehiculo obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Vehiculo read(Vehiculo obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Vehiculo obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(Vehiculo obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public ArrayList<Vehiculo> list() throws Exception {
        
        SemirremolqueDAOImpl semirremolqueDAO = new SemirremolqueDAOImpl();
        CamionDAOImpl camionDAO = new CamionDAOImpl();
        
        ArrayList<Vehiculo> vehiculos = new ArrayList<>();
        
        vehiculos.addAll(camionDAO.list());
        vehiculos.addAll(semirremolqueDAO.list());

        
        return vehiculos; 
    }
    
}
