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
public class Mantenimiento {
    private String trabajos_realizados;
    private Date fecha;
    private float costos_repuestos;
    private float costos_manodeobra;

    public Mantenimiento(String trabajos_realizados, Date fecha, float costos_repuestos, float costos_manodeobra) {
        this.trabajos_realizados = trabajos_realizados;
        this.fecha = fecha;
        this.costos_repuestos = costos_repuestos;
        this.costos_manodeobra = costos_manodeobra;
    }

    public Mantenimiento() {
    }

    public String getTrabajos_realizados() {
        return trabajos_realizados;
    }

    public Date getFecha() {
        return fecha;
    }

    public float getCostos_repuestos() {
        return costos_repuestos;
    }

    public float getCostos_manodeobra() {
        return costos_manodeobra;
    }

    public void setTrabajos_realizados(String trabajos_realizados) {
        this.trabajos_realizados = trabajos_realizados;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public void setCostos_repuestos(float costos_repuestos) {
        this.costos_repuestos = costos_repuestos;
    }

    public void setCostos_manodeobra(float costos_manodeobra) {
        this.costos_manodeobra = costos_manodeobra;
    }
    
}
