/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Mantenimiento;
import Conexion.Conexion;
import InterfacesDAO.IMantenimientoDAO;
import java.sql.Connection;
import java.util.ArrayList;


public class MantenimientoDAOImpl implements IMantenimientoDAO{
    
    private Connection conexion;
    
    public MantenimientoDAOImpl() throws ClassNotFoundException {
         this.conexion = Conexion.getInstancia().getConexion();;
    }
    @Override
    public void create(Mantenimiento mantenimiento) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        /*ACA VA LA CONSULTA A LA BASE DE DATOS */
    }

    @Override
    public void delete(Mantenimiento mantenimiento) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        /*ACA VA LA CONSULTA A LA BASE DE DATOS */
    }

    @Override
    public void update(Mantenimiento mantenimiento) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        /*ACA VA LA CONSULTA A LA BASE DE DATOS */
    }

    @Override
    public ArrayList<Mantenimiento> list() throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
        /*ACA VA LA CONSULTA A LA BASE DE DATOS */
    }

    @Override
    public void find(Mantenimiento mantenimiento) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
