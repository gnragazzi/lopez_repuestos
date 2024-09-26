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
public abstract class Empleado {
    private String dni;
    private String cuil;
    private String nombre;
    private String apellido;
    private String domicilio;
    private Date fecha_nacimiento;
    private String telefono;

    public Empleado(String dni, String cuil, String nombre, String apellido, String domicilio, Date fecha_nacimiento, String telefono) {
        this.dni = dni;
        this.cuil = cuil;
        this.nombre = nombre;
        this.apellido = apellido;
        this.domicilio = domicilio;
        this.fecha_nacimiento = fecha_nacimiento;
        this.telefono = telefono;
    }

    public Empleado() {
    }

    public String getDni() {
        return dni;
    }

    public String getCuil() {
        return cuil;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public Date getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public void setCuil(String cuil) {
        this.cuil = cuil;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public void setFecha_nacimiento(Date fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @Override
    public String toString() {
        return "Empleado{" + "dni=" + dni + ", cuil=" + cuil + ", nombre=" + nombre + ", apellido=" + apellido + ", domicilio=" + domicilio + ", fecha_nacimiento=" + fecha_nacimiento + ", telefono=" + telefono + '}';
    }
  

}
