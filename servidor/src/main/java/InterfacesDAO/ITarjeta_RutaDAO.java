/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;
import Clases.Tarjeta_Ruta;
import java.util.ArrayList;

public interface ITarjeta_RutaDAO {
    public void create(Tarjeta_Ruta tarjeta_ruta) throws Exception;
    public void delete(Tarjeta_Ruta tarjeta_ruta) throws Exception;
    public void update(Tarjeta_Ruta tarjeta_ruta) throws Exception;
    public ArrayList<Tarjeta_Ruta> list() throws Exception;
    public void find(Tarjeta_Ruta tarjeta_ruta) throws Exception;
    

}
