/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Chofer;
import java.util.ArrayList;

public interface IChoferDAO {
    public void create(Chofer chofer) throws Exception;
    public void delete(Chofer chofer) throws Exception;
    public void update(Chofer chofer) throws Exception;
    public ArrayList<Chofer> list() throws Exception;
    public void find(Chofer chofer) throws Exception;
    

}
