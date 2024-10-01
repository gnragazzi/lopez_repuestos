/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Mantenimiento;
import java.util.ArrayList;

public interface IMantenimientoDAO {
    public void create(Mantenimiento mantenimiento) throws Exception;
    public void delete(Mantenimiento mantenimiento) throws Exception;
    public void update(Mantenimiento mantenimiento) throws Exception;
    public ArrayList<Mantenimiento> list() throws Exception;
    public void find(Mantenimiento mantenimiento) throws Exception;
}
