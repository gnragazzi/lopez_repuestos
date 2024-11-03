/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Camion;
import Clases.Semirremolque;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public class SemirremolqueDAOImpl implements IDAO<Semirremolque>{
    
    private Connection conexion;
    
    public SemirremolqueDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();
    }
    @Override
    public void create(Semirremolque semirremolque) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(Semirremolque semirremolque) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Semirremolque semirremolque) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public ArrayList<Semirremolque> list() throws Exception {
        Statement statement = conexion.createStatement();
        ResultSet rs = statement.executeQuery("select * from Semirremolques, Vehiculos where Patente=Vehiculos_Patente;");
        ArrayList<Semirremolque> semirremolques = new ArrayList<>();
        while (rs.next()) {
            Semirremolque semirremolque = new Semirremolque();
            semirremolque.setPatente(rs.getString("Patente"));
            semirremolque.setMarca(rs.getString("Marca"));
            semirremolque.setTipo(rs.getString("Tipo"));
            semirremolque.setCarga(rs.getString("Carga"));
            semirremolques.add(semirremolque);
            }
        return semirremolques; 
    }

    @Override
    public Semirremolque read(Semirremolque obj) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
