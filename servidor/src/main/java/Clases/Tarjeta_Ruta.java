package Clases;

import java.util.Date;

public class Tarjeta_Ruta {
    
    private Date fecha_emision;
    private Date fecha_vencimiento;
    private Vehiculo vehiculo;

    public Tarjeta_Ruta(Date fecha_emision, Date fecha_vencimiento, Vehiculo vehiculo) {
        this.fecha_emision = fecha_emision;
        this.fecha_vencimiento = fecha_vencimiento;
        this.vehiculo = vehiculo;
    }

    public Tarjeta_Ruta() {
    }

    public Date getFecha_emision() {
        return fecha_emision;
    }

    public Date getFecha_vencimiento() {
        return fecha_vencimiento;
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

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

}
