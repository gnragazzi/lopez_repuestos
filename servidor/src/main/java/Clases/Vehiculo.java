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
    private Tarjeta_Ruta tarjeta_ruta;
    private Seguro seguro;
    private Tecnica tecnica;

    public Vehiculo() {
    }

    public Vehiculo(String marca, String patente, Seguro seguro, Tarjeta_Ruta tarjeta_ruta, Tecnica tecnica) {
        this.marca = marca;
        this.patente = patente;
        this.seguro = seguro;
        this.tarjeta_ruta = tarjeta_ruta;
        this.tecnica = tecnica;
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

    public Tarjeta_Ruta getTarjeta_ruta() {
        return tarjeta_ruta;
    }

    public Seguro getSeguro() {
        return seguro;
    }

    public Tecnica getTecnica() {
        return tecnica;
    }

    public void setTarjeta_ruta(Tarjeta_Ruta tarjeta_ruta) {
        this.tarjeta_ruta = tarjeta_ruta;
    }

    public void setSeguro(Seguro seguro) {
        this.seguro = seguro;
    }

    public void setTecnica(Tecnica tecnica) {
        this.tecnica = tecnica;
    }
    
    
    
}
