/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clases;

import java.util.Date;

/**
 *
 * @author Administrador
 */
public class Chofer extends Empleado {
    
    private Date fecha_psicotecnico;

    public Chofer(String dni, String cuil, String nombre, String apellido, String domicilio, Date fecha_nacimiento, String telefono) {
        super(dni, cuil, nombre, apellido, domicilio, fecha_nacimiento, telefono);
    }

    public Chofer() {
    }

    public Date getFecha_psicotecnico() {
        return fecha_psicotecnico;
    }

    public void setFecha_psicotecnico(Date fecha_psicotecnico) {
        this.fecha_psicotecnico = fecha_psicotecnico;
    }
    
    
    
}
