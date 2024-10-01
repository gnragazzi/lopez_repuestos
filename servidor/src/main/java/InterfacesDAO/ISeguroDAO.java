/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Seguro;
import java.util.ArrayList;

public interface ISeguroDAO {
    public void create(Seguro seguro) throws Exception;
    public void delete(Seguro seguro) throws Exception;
    public void update(Seguro seguro) throws Exception;
    public ArrayList<Seguro> list() throws Exception;
    public void find(Seguro seguro) throws Exception;
    

}
