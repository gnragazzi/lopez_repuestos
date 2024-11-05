package Clases;

import java.time.LocalDate;
import java.util.ArrayList;

public class Mecanico extends Empleado{

    private ArrayList<Mantenimiento> mantenimiento;
    
    public Mecanico(String dni, String cuil, String nombre, String apellido, String domicilio, LocalDate fecha_nacimiento, String telefono, ArrayList<Mantenimiento> mantenimiento, Boolean activo) {
        super(dni, cuil, nombre, apellido, domicilio, fecha_nacimiento, telefono, activo);
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
