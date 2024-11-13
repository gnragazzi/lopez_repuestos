package IDaoImpl;

import Clases.Seguro;
import Conexion.Conexion;
import InterfacesDAO.IDAO;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.ArrayList;

public class SeguroDAOImpl implements IDAO<Seguro> {

    private Connection conexion;

    public SeguroDAOImpl() throws ClassNotFoundException {
        this.conexion = Conexion.getInstancia().getConexion();
    }

    @Override
    public void create(Seguro seguro) throws Exception {

        PreparedStatement envioSeguro;
        envioSeguro = conexion.prepareStatement("insert into Seguros(Fecha_emision, Fecha_vencimiento, Pago, Tipo, Nombre_aseguradora, Vehiculo) "
                + "value ( ? , ? , ? , ? , ?, ?);");
        envioSeguro.setString(1, String.valueOf(seguro.getFecha_emision()));
        envioSeguro.setString(2, String.valueOf(seguro.getFecha_vencimiento()));
        envioSeguro.setFloat(3, seguro.getPago());
        envioSeguro.setString(4, seguro.getTipo());
        envioSeguro.setString(5, seguro.getNombre_aseguradora());
        envioSeguro.setString(6, seguro.getVehiculo());

        envioSeguro.executeUpdate();

    }

    @Override
    public ArrayList<Seguro> list() throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public Seguro read(String clave) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void update(Seguro obj, String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    public void delete(String key) throws Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public Seguro ultimoSeguro(String patente) throws Exception {

        PreparedStatement statement = conexion.prepareStatement("select * from Seguros where Fecha_Emision = (select max(Fecha_Emision) from Seguros where Vehiculo = ?) and Vehiculo = ? order by idSeguros desc;");
        statement.setString(1, patente);
        statement.setString(2, patente);
        ResultSet rs = statement.executeQuery();

        rs.next();

        Seguro auxiliar = new Seguro();

        auxiliar.setFecha_emision(LocalDate.parse(rs.getString("Fecha_Emision")));
        auxiliar.setFecha_vencimiento(LocalDate.parse(rs.getString("Fecha_Vencimiento")));
        auxiliar.setNombre_aseguradora(rs.getString("Nombre_aseguradora"));
        auxiliar.setPago(rs.getFloat("Pago"));
        auxiliar.setTipo(rs.getString("Tipo"));
        auxiliar.setVehiculo(rs.getString("Vehiculo"));

        return auxiliar;
    }

}
