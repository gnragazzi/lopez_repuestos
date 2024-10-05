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
    private int kilometros_realizados;
    private float costos_combustibles;
    private int Peso;
    private String destino;
    private Camion camion;
    private Chofer chofer;
    private Semirremolque semirremolque;

    
    public Viaje(LocalDate fecha_partida, LocalDate fecha_llegada, LocalDate fecha_esperada, int kilometros_realizados, float costos_combustibles, int Peso, String destino, Camion camion, Chofer chofer, Semirremolque semirremolque) {
        this.fecha_partida = fecha_partida;
        this.fecha_llegada = fecha_llegada;
        this.fecha_esperada = fecha_esperada;
        this.kilometros_realizados = kilometros_realizados;
        this.costos_combustibles = costos_combustibles;
        this.Peso = Peso;
        this.destino = destino;
        this.camion = camion;
        this.chofer = chofer;
        this.semirremolque = semirremolque;
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

    public int getKilometros_realizados() {
        return kilometros_realizados;
    }

    public float getCostos_combustibles() {
        return costos_combustibles;
    }

    public String getDestino() {
        return destino;
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

    public void setKilometros_realizados(int kilometros_realizados) {
        this.kilometros_realizados = kilometros_realizados;
    }

    public void setCostos_combustibles(float costos_combustibles) {
        this.costos_combustibles = costos_combustibles;
    }

    public void setDestino(String destinos) {
        this.destino = destinos;
    }

    public void setCamion(Camion camion) {
        this.camion = camion;
    }    

    public int getPeso() {
        return Peso;
    }

    public Chofer getChofer() {
        return chofer;
    }

    public Semirremolque getSemirremolque() {
        return semirremolque;
    }

    public void setPeso(int Peso) {
        this.Peso = Peso;
    }

    public void setChofer(Chofer chofer) {
        this.chofer = chofer;
    }

    public void setSemirremolque(Semirremolque semirremolque) {
        this.semirremolque = semirremolque;
    }
    
}
