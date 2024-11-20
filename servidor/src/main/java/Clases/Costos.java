package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;

public class Costos {
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate períhodo;
    private String patente;
    private float costo_repuestos;
    private float cost_mano_de_obra;
    private float costo_combustible;
    private float kilometros_realizados;

    public Costos() {
        this.períhodo = null;
        this.patente = null;
        this.costo_repuestos = 0;
        this.cost_mano_de_obra = 0;
        this.costo_combustible = 0;
        this.kilometros_realizados = 0;
    }

    public Costos(LocalDate períhodo, String patente, float costo_repuestos, float cost_mano_de_obra, float costo_combustible, float kilometros_realizados) {
        this.períhodo = períhodo;
        this.patente = patente;
        this.costo_repuestos = costo_repuestos;
        this.cost_mano_de_obra = cost_mano_de_obra;
        this.costo_combustible = costo_combustible;
        this.kilometros_realizados = kilometros_realizados;
    }

    public float getCost_mano_de_obra() {
        return cost_mano_de_obra;
    }

    public float getCosto_combustible() {
        return costo_combustible;
    }

    public float getCosto_repuestos() {
        return costo_repuestos;
    }

    public float getKilometros_realizados() {
        return kilometros_realizados;
    }

    public String getPatente() {
        return patente;
    }

    public LocalDate getPeríhodo() {
        return períhodo;
    }

    public void setPeríhodo(LocalDate períhodo) {
        this.períhodo = períhodo;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public void setKilometros_realizados(float kilometros_realizados) {
        this.kilometros_realizados = kilometros_realizados;
    }

    public void setCosto_repuestos(float costo_repuestos) {
        this.costo_repuestos = costo_repuestos;
    }

    public void setCosto_combustible(float costo_combustible) {
        this.costo_combustible = costo_combustible;
    }

    public void setCost_mano_de_obra(float cost_mano_de_obra) {
        this.cost_mano_de_obra = cost_mano_de_obra;
    }

}
