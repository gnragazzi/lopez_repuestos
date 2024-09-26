package Clases;

import java.util.Date;

public class Tecnica {
    
    private Date fecha_emision;
    private Date fecha_vencimiento;
    private String ubicacion;
    private Vehiculo vehiculo;

    public Tecnica(Date fecha_emision, Date fecha_vencimiento, String ubicacion, Vehiculo vehiculo) {
        this.fecha_emision = fecha_emision;
        this.fecha_vencimiento = fecha_vencimiento;
        this.ubicacion = ubicacion;
        this.vehiculo = vehiculo;
    }

    public Tecnica() {
    }

    public Date getFecha_emision() {
        return fecha_emision;
    }

    public Date getFecha_vencimiento() {
        return fecha_vencimiento;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setFecha_emision(Date fecha_emision) {
        this.fecha_emision = fecha_emision;
    }

    public void setFecha_vencimiento(Date fecha_vencimiento) {
        this.fecha_vencimiento = fecha_vencimiento;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }




}
