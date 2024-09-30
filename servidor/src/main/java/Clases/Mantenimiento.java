package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.util.ArrayList;
import java.time.LocalDate;

public class Mantenimiento {

    private String trabajos_realizados;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha;
    private double costo_repuestos;
    private double costo_manodeobra;
    private ArrayList<Mecanico> mecanico = new ArrayList<Mecanico>();
    private Vehiculo vehiculo;

    public Mantenimiento(String trabajos_realizados, LocalDate fecha, double costo_repuestos, double costo_manodeobra, ArrayList<Mecanico> mecanico, Vehiculo vehiculo) {
        this.trabajos_realizados = trabajos_realizados;
        this.fecha = fecha;
        this.costo_repuestos = costo_repuestos;
        this.costo_manodeobra = costo_manodeobra;
        this.mecanico = mecanico;
        this.vehiculo = vehiculo;
    }

    public Mantenimiento() {
    }

    public String getTrabajos_realizados() {
        return trabajos_realizados;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public double getCostos_repuestos() {
        return costo_repuestos;
    }

    public double getCostos_manodeobra() {
        return costo_manodeobra;
    }

    public void setTrabajos_realizados(String trabajos_realizados) {
        this.trabajos_realizados = trabajos_realizados;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public void setCostos_repuestos(double costo_repuestos) {
        this.costo_repuestos = costo_repuestos;
    }

    public void setCostos_manodeobra(double costo_manodeobra) {
        this.costo_manodeobra = costo_manodeobra;
    }

    public ArrayList<Mecanico> getMecanico() {
        return mecanico;
    }

    public void setMecanico(ArrayList<Mecanico> mecanico) {
        this.mecanico = mecanico;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

}
