package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;


/**
 *
 * @author Administrador
 */
public class Viaje {
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_partida;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_llegada;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_esperada;
    private String kilometros_realizados;
    private float costos_combustibles;
    private String destinos;
    private Camion camion;

    public Viaje(LocalDate fecha_partida, LocalDate fecha_llegada, LocalDate fecha_esperada, String kilometros_realizados, float costos_combustibles, String destinos, Camion camion) {
        this.fecha_partida = fecha_partida;
        this.fecha_llegada = fecha_llegada;
        this.fecha_esperada = fecha_esperada;
        this.kilometros_realizados = kilometros_realizados;
        this.costos_combustibles = costos_combustibles;
        this.destinos = destinos;
        this.camion=camion;
    }

    public Viaje() {
    }

    public LocalDate getFecha_partida() {
        return fecha_partida;
    }

    public LocalDate getFecha_llegada() {
        return fecha_llegada;
    }

    public LocalDate getFecha_esperada() {
        return fecha_esperada;
    }

    public Camion getCamion() {
        return camion;
    }

    public String getKilometros_realizados() {
        return kilometros_realizados;
    }

    public float getCostos_combustibles() {
        return costos_combustibles;
    }

    public String getDestinos() {
        return destinos;
    }

    public void setFecha_partida(LocalDate fecha_partida) {
        this.fecha_partida = fecha_partida;
    }

    public void setFecha_llegada(LocalDate fecha_llegada) {
        this.fecha_llegada = fecha_llegada;
    }

    public void setFecha_esperada(LocalDate fecha_esperada) {
        this.fecha_esperada = fecha_esperada;
    }

    public void setKilometros_realizados(String kilometros_realizados) {
        this.kilometros_realizados = kilometros_realizados;
    }

    public void setCostos_combustibles(float costos_combustibles) {
        this.costos_combustibles = costos_combustibles;
    }

    public void setDestinos(String destinos) {
        this.destinos = destinos;
    }

    public void setCamion(Camion camion) {
        this.camion = camion;
    }    
    
    
}
