package InterfacesDAO;
import Clases.Camion;
import Clases.Costos;
import java.time.LocalDate;
import java.util.ArrayList;

public interface ICamionDAO {
    public void create(Camion camion) throws Exception;
    public void delete(Camion camion) throws Exception;
    public void update(Camion camion) throws Exception;
    public ArrayList<Camion> list() throws Exception;
    public void find(Camion camion) throws Exception;
    public Costos calcular_costos(String patente, LocalDate fecha) throws Exception;
    

}
