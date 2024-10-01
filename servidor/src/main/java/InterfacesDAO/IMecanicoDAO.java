/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Mecanico;
import java.util.ArrayList;

public interface IMecanicoDAO {
    public void create(Mecanico mecanico) throws Exception;
    public void delete(Mecanico mecanico) throws Exception;
    public void update(Mecanico mecanico) throws Exception;
    public ArrayList<Mecanico> list() throws Exception;
    public void find(Mecanico mecanico) throws Exception;
    

}
