/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package IDaoImpl;

import Clases.Seguro;
import Clases.Tecnica;
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
public class TecnicaDAOImpl implements IDAO<Tecnica> {

    private Connection conexion;

    public TecnicaDAOImpl() throws ClassNotFoundException {
        this.conexion = Conexion.getInstancia().getConexion();
    }

    @Override
    public void create(Tecnica tecnica) throws Exception {
        PreparedStatement envioTecnica;
        envioTecnica = conexion.prepareStatement("insert into tecnicas(Fecha_emision, Fecha_vencimiento, Ubicacion, Vehiculo) "
                + "value ( ? , ? , ? , ? );");
        envioTecnica.setString(1, String.valueOf(tecnica.getFecha_emision()));
        envioTecnica.setString(2, String.valueOf(tecnica.getFecha_vencimiento()));
        envioTecnica.setString(3, tecnica.getUbicacion());
        envioTecnica.setString(4, tecnica.getVehiculo());

        envioTecnica.executeUpdate();
    }

    @Override
    public ArrayList<Tecnica> list() throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Tecnica read(String clave) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Tecnica obj, String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public Tecnica ultimaTecnica(String patente) throws Exception {

        PreparedStatement statement = conexion.prepareStatement("select * from Tecnicas where Fecha_Emision in (select max(Fecha_Emision) from Tecnicas where Vehiculo = ?) and Vehiculo = ? order by idTecnicas desc;");
        statement.setString(1, patente);
        statement.setString(2, patente);
        ResultSet rs = statement.executeQuery();

        rs.next();

        Tecnica auxiliar = new Tecnica();

        auxiliar.setFecha_emision(LocalDate.parse(rs.getString("Fecha_Emision")));
        auxiliar.setFecha_vencimiento(LocalDate.parse(rs.getString("Fecha_Vencimiento")));
        auxiliar.setUbicacion(rs.getString("Ubicacion"));
        auxiliar.setVehiculo(rs.getString("Vehiculo"));

        return auxiliar;
    }
}
