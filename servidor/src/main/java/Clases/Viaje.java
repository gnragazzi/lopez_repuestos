package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;


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
    private String destino;
    private float peso;
    private Camion camion;
    private Semirremolque semirremolque;
    private Chofer chofer;
    

    public Viaje(LocalDate fecha_partida, LocalDate fecha_llegada, LocalDate fecha_esperada, int kilometros_realizados, float costos_combustibles, String destino, float peso, Camion camion, Semirremolque semirremolque, Chofer chofer) {
        this.fecha_partida = fecha_partida;
        this.fecha_llegada = fecha_llegada;
        this.fecha_esperada = fecha_esperada;
        this.kilometros_realizados = kilometros_realizados;
        this.costos_combustibles = costos_combustibles;
        this.destino = destino;
        this.peso = peso;
        this.camion = camion;
        this.semirremolque = semirremolque;
        this.chofer = chofer;
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

    public float getPeso() {
        return peso;
    }

    public Semirremolque getSemirremolque() {
        return semirremolque;
    }
    public Chofer getChofer(){
        return chofer;
    }
    
//STTERS
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

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public void setCamion(Camion camion) {
        this.camion = camion;
    }

    public void setPeso(float peso) {
        this.peso = peso;
    }

    public void setSemirremolque(Semirremolque semirremolque) {
        this.semirremolque = semirremolque;
    }

    public void setChofer(Chofer chofer) {
        this.chofer = chofer;
    }
    

}
