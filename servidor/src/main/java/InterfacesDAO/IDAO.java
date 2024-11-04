/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package InterfacesDAO;

import java.util.ArrayList;

/**
 *
 * @author clauz
 */
public interface IDAO <T> {
    
    public void create(T obj) throws Exception;
    public T read(T obj) throws Exception;
    public void update(T obj, String key) throws Exception;
    public void delete(String key) throws Exception;
    public ArrayList<T> list() throws Exception;
    
}
