/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Viaje;
import java.util.ArrayList;

public interface IViajeDAO {
    public void create(Viaje viaje) throws Exception;
    public void delete(Viaje viaje) throws Exception;
    public void update(Viaje viaje) throws Exception;
    public ArrayList<Viaje> list() throws Exception;
    public void find(Viaje viaje) throws Exception;
    

}
