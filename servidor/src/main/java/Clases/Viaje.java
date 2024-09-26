/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clases;

import java.util.Date;

/**
 *
 * @author Administrador
 */
public class Viaje {
    private Date fecha_partida;
    private Date fecha_llegada;
    private Date fecha_esperada;
    private String kilometros_realizados;
    private float costos_combustibles;
    private String destinos;
    private Camion camion;

    public Viaje(Date fecha_partida, Date fecha_llegada, Date fecha_esperada, String kilometros_realizados, float costos_combustibles, String destinos, Camion camion) {
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

    public Date getFecha_partida() {
        return fecha_partida;
    }

    public Date getFecha_llegada() {
        return fecha_llegada;
    }

    public Date getFecha_esperada() {
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

    public void setFecha_partida(Date fecha_partida) {
        this.fecha_partida = fecha_partida;
    }

    public void setFecha_llegada(Date fecha_llegada) {
        this.fecha_llegada = fecha_llegada;
    }

    public void setFecha_esperada(Date fecha_esperada) {
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
