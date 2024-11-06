package IDaoImpl;

import Clases.Camion;
import Clases.Costos;
import Clases.Mantenimiento;
import Clases.Mecanico;
import Clases.Semirremolque;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;

public class MantenimientoDAOImpl implements IDAO<Mantenimiento> {

    private Connection conexion;

    public MantenimientoDAOImpl() throws ClassNotFoundException {
        this.conexion = Conexion.getInstancia().getConexion();
    }

    @Override
    public void create(Mantenimiento mantenimiento) throws Exception {
        PreparedStatement envioMantenimiento;
        envioMantenimiento = conexion.prepareStatement("insert into Mantenimientos(Trabajo_realizados,Fecha, Costos_repuestos, Costos_mano_de_obra,Vehiculos_Patente, Kilometros_en_que_se_realizo) "
                + "value ( ? , ? , ? , ? , ? , ?);");
        envioMantenimiento.setString(1,mantenimiento.getTrabajos_realizados());
        envioMantenimiento.setString(2,String.valueOf(mantenimiento.getFecha()));
        envioMantenimiento.setDouble(3, mantenimiento.getCostos_repuestos());   
        envioMantenimiento.setDouble(4, mantenimiento.getCostos_manodeobra());
        envioMantenimiento.setString(5, mantenimiento.getVehiculo().getPatente());
        envioMantenimiento.setInt(6, mantenimiento.getKilometros_en_que_se_realizo());
        
        envioMantenimiento.executeUpdate();
        Iterator<Mecanico> iterator = mantenimiento.getMecanico().iterator();
        while (iterator.hasNext()) {
            PreparedStatement envioMecanico;
            envioMecanico = conexion.prepareStatement("insert into Mantenimientos_has_Mecanicos value(last_insert_id(), ? );");
            envioMecanico.setString(1, iterator.next().getDni());
            envioMecanico.executeUpdate();
        }

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
            mantenimiento.setTrabajos_realizados((rs.getString("Trabajo_realizados")));
            
            mantenimientos.add(mantenimiento);
        }
        return mantenimientos;
    }

    @Override
    public Mantenimiento read(String clave) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
    public Costos calcular_costos_mantenimiento(String patente, LocalDate fecha) throws SQLException{
        Costos respuesta = new Costos();

        PreparedStatement costoMantenimiento= conexion.prepareStatement("SELECT sum(Costos_mano_de_obra), sum(Costos_repuestos) FROM Mantenimientos WHERE MONTH(Fecha) = ? and YEAR(Fecha) = ?  and Vehiculos_Patente= ?");
        costoMantenimiento.setInt(1, fecha.getMonthValue());
        costoMantenimiento.setInt(2, fecha.getYear());
        costoMantenimiento.setString(3, patente);
        ResultSet rs= costoMantenimiento.executeQuery();
        while(rs.next()){
            respuesta.setCosto_repuestos(rs.getFloat("sum(Costos_repuestos)"));
            respuesta.setCost_mano_de_obra(rs.getFloat("sum(Costos_mano_de_obra)"));
        }
        return respuesta;
    }

    @Override
    public void update(Mantenimiento obj, String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}
