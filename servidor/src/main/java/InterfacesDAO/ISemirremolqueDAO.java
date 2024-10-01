/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Semirremolque;
import java.util.ArrayList;

public interface ISemirremolqueDAO {
    public void create(Semirremolque semirremolque) throws Exception;
    public void delete(Semirremolque semirremolque) throws Exception;
    public void update(Semirremolque semirremolque) throws Exception;
    public ArrayList<Semirremolque> list() throws Exception;
    public void find(Semirremolque semirremolque) throws Exception;
    

}
