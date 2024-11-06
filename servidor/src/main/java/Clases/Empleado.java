package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;

public abstract class Empleado {

    private String dni;
    private String cuil;
    private String nombre;
    private String apellido;
    private String domicilio;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_nacimiento;
    private String telefono;
    private Boolean activo;

    public Empleado(String dni, String cuil, String nombre, String apellido, String domicilio, LocalDate fecha_nacimiento, String telefono, Boolean activo) {
        this.dni = dni;
        this.cuil = cuil;
        this.nombre = nombre;
        this.apellido = apellido;
        this.domicilio = domicilio;
        this.fecha_nacimiento = fecha_nacimiento;
        this.telefono = telefono;
        this.activo = activo;
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

    public LocalDate getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public String getTelefono() {
        return telefono;
    }

    public Boolean getActivo() {
        return activo;
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

    public void setFecha_nacimiento(LocalDate fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
