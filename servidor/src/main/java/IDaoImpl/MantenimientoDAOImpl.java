package IDaoImpl;

import Clases.Camion;
import Clases.Mantenimiento;
import Clases.Mecanico;
import Clases.Semirremolque;
import Conexion.Conexion;
import InterfacesDAO.IMantenimientoDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;

public class MantenimientoDAOImpl implements IMantenimientoDAO {

    private Connection conexion;

    public MantenimientoDAOImpl() throws ClassNotFoundException {
        this.conexion = Conexion.getInstancia().getConexion();;
    }

    @Override
    public void create(Mantenimiento mantenimiento) throws Exception {
        mantenimiento.setKilometros_en_que_se_realizo(0);
        PreparedStatement envioMantenimiento;
        envioMantenimiento = conexion.prepareStatement("insert into Mantenimientos(Trabajo_realizados,Fecha, Costos_repuestos, Costos_mano_de_obra,Vehiculos_Patente, Kilometros_en_que_se_realizo) "
                + "value ('" + mantenimiento.getTrabajos_realizados() + "','" + mantenimiento.getFecha() + "',"
                + mantenimiento.getCostos_repuestos() + "," + mantenimiento.getCostos_manodeobra() + ",'" + mantenimiento.getVehiculo().getPatente() + "'," + mantenimiento.getKilometros_en_que_se_realizo() + ");");
        envioMantenimiento.executeUpdate();
        Iterator<Mecanico> iterator = mantenimiento.getMecanico().iterator();
        while (iterator.hasNext()) {
            PreparedStatement envioMecanico;
            envioMecanico = conexion.prepareStatement("insert into Mantenimientos_has_Mecanicos value(last_insert_id(),'" + iterator.next().getDni() + "');");
            envioMecanico.executeUpdate();
        }

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
        Statement statement = conexion.createStatement();
        ResultSet rs = statement.executeQuery("select * from Mantenimientos, Vehiculos where Patente=Vehiculos_Patente;");
        ArrayList<Mantenimiento> mantenimientos = new ArrayList<Mantenimiento>();
        while (rs.next()) {
            Mantenimiento mantenimiento = new Mantenimiento();
            if (rs.getString("Es_Cam_Semi") == "Camion") {
                Camion camion = new Camion();
                camion.setPatente(rs.getString("Patente"));
                camion.setMarca(rs.getString("Marca"));
                mantenimiento.setVehiculo(camion);
            } else {
                Semirremolque semirremolque = new Semirremolque();
                semirremolque.setPatente(rs.getString("Patente"));
                semirremolque.setMarca(rs.getString("Marca"));
                mantenimiento.setVehiculo(semirremolque);
            }
            mantenimiento.setCostos_manodeobra(rs.getFloat("costos_mano_de_obra"));
            mantenimiento.setCostos_repuestos(rs.getFloat("costos_repuestos"));
            mantenimiento.setFecha(LocalDate.parse(rs.getString("Fecha")));
        }
        return mantenimientos;
    }

    @Override
    public void find(Mantenimiento mantenimiento) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

}
