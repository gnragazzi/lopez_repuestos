/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Tecnica;
import java.util.ArrayList;

public interface ITecnicaDAO {
    public void create(Tecnica tecnica) throws Exception;
    public void delete(Tecnica tecnica) throws Exception;
    public void update(Tecnica tecnica) throws Exception;
    public ArrayList<Tecnica> list() throws Exception;
    public void find(Tecnica tecnica) throws Exception;
    

}
