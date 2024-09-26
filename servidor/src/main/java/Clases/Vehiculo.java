/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clases;

/**
 *
 * @author Administrador
 */
public abstract class  Vehiculo {
    private String marca;
    private String patente;

    public Vehiculo(String marca, String patente) {
        this.marca = marca;
        this.patente = patente;
    }

    public Vehiculo() {
    }

    public String getMarca() {
        return marca;
    }

    public String getPatente() {
        return patente;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }
    
    
}
