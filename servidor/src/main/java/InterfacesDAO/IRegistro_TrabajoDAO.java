/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Registro_trabajo;
import java.util.ArrayList;

public interface IRegistro_TrabajoDAO {
    public void create(Registro_trabajo registro) throws Exception;
    public void delete(Registro_trabajo registro) throws Exception;
    public void update(Registro_trabajo registro) throws Exception;
    public ArrayList<Registro_trabajo> list() throws Exception;
    public void find(Registro_trabajo registro) throws Exception;
    

}
