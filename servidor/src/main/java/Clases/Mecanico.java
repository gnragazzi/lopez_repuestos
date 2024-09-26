/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clases;

import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author Administrador
 */
public class Mecanico extends Empleado{

    private ArrayList<Mantenimiento> mantenimiento;
    
    public Mecanico(String dni, String cuil, String nombre, String apellido, String domicilio, Date fecha_nacimiento, String telefono, ArrayList<Mantenimiento> mantenimiento) {
        super(dni, cuil, nombre, apellido, domicilio, fecha_nacimiento, telefono);
        this.mantenimiento=mantenimiento;
    }

    public Mecanico() {
    }

    public ArrayList<Mantenimiento> getMantenimiento() {
        return mantenimiento;
    }

    public void setMantenimiento(ArrayList<Mantenimiento> mantenimiento) {
        this.mantenimiento = mantenimiento;
    }
    
}
