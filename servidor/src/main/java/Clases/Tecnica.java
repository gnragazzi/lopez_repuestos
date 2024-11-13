package Clases;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;

public class Tecnica {

    @JsonProperty("fecha_emision")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_emision;
    @JsonProperty("fecha_vencimiento")
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_vencimiento;
    @JsonProperty("ubicacion")
    private String ubicacion;
    @JsonProperty("vehiculo")
    private Vehiculo vehiculo;

    public Tecnica(LocalDate fecha_emision, LocalDate fecha_vencimiento, String ubicacion, Vehiculo vehiculo) {
        this.fecha_emision = fecha_emision;
        this.fecha_vencimiento = fecha_vencimiento;
        this.ubicacion = ubicacion;
        this.vehiculo = vehiculo;
    }

    public Tecnica() {
    }

    public LocalDate getFecha_emision() {
        return fecha_emision;
    }

    public LocalDate getFecha_vencimiento() {
        return fecha_vencimiento;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setFecha_emision(LocalDate fecha_emision) {
        this.fecha_emision = fecha_emision;
    }

    public void setFecha_vencimiento(LocalDate fecha_vencimiento) {
        this.fecha_vencimiento = fecha_vencimiento;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

}
