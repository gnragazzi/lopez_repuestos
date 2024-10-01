/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Camion;
import java.util.ArrayList;

public interface ICamionDAO {
    public void create(Camion camion) throws Exception;
    public void delete(Camion camion) throws Exception;
    public void update(Camion camion) throws Exception;
    public ArrayList<Camion> list() throws Exception;
    public void find(Camion camion) throws Exception;
    

}
