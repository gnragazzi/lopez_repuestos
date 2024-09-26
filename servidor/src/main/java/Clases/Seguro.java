package Clases;

import java.util.Date;

public class Seguro {
    
    private Date fecha_emision;
    private Date fecha_vencimiento;
    private float pago;
    private String tipo;
    private String nombre_aseguradora;

    public Seguro(Date fecha_emision, Date fecha_vencimiento, String nombre_aseguradora, float pago, String tipo) {
        this.fecha_emision = fecha_emision;
        this.fecha_vencimiento = fecha_vencimiento;
        this.nombre_aseguradora = nombre_aseguradora;
        this.pago = pago;
        this.tipo = tipo;
    }

    public Seguro() {
    }

    public Date getFecha_emision() {
        return fecha_emision;
    }

    public Date getFecha_vencimiento() {
        return fecha_vencimiento;
    }

    public float getPago() {
        return pago;
    }

    public String getTipo() {
        return tipo;
    }

    public String getNombre_aseguradora() {
        return nombre_aseguradora;
    }

    public void setFecha_emision(Date fecha_emision) {
        this.fecha_emision = fecha_emision;
    }

    public void setFecha_vencimiento(Date fecha_vencimiento) {
        this.fecha_vencimiento = fecha_vencimiento;
    }

    public void setPago(float pago) {
        this.pago = pago;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setNombre_aseguradora(String nombre_aseguradora) {
        this.nombre_aseguradora = nombre_aseguradora;
    }

}
