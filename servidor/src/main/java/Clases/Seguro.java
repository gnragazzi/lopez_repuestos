package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;

public class Seguro {

    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_emision;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_vencimiento;
    private float pago;
    private String tipo;
    private String nombre_aseguradora;

    public Seguro(LocalDate fecha_emision, LocalDate fecha_vencimiento, String nombre_aseguradora, float pago, String tipo) {
        this.fecha_emision = fecha_emision;
        this.fecha_vencimiento = fecha_vencimiento;
        this.nombre_aseguradora = nombre_aseguradora;
        this.pago = pago;
        this.tipo = tipo;
    }

    public Seguro() {
    }

    public LocalDate getFecha_emision() {
        return fecha_emision;
    }

    public LocalDate getFecha_vencimiento() {
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

    public void setFecha_emision(LocalDate fecha_emision) {
        this.fecha_emision = fecha_emision;
    }

    public void setFecha_vencimiento(LocalDate fecha_vencimiento) {
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
