/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clases;

import java.util.ArrayList;

/**
 *
 * @author Administrador
 */
public class Camion extends Vehiculo{
    private String modelo;
    private String cilindrada;
    private String kilometraje;
    private ArrayList<Viaje> viaje;

    public Camion(String modelo, String cilindrada, String kilometraje, ArrayList<Viaje> viaje, String marca, String patente) {
        super(marca, patente);
        this.modelo = modelo;
        this.cilindrada = cilindrada;
        this.kilometraje = kilometraje;
        this.viaje = new ArrayList();
    }
    
    public Camion() {
        super();
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public void setCilindrada(String cilindrada) {
        this.cilindrada = cilindrada;
    }

    public void setViaje(ArrayList<Viaje> viaje) {
        this.viaje = viaje;
    }

    public void setKilometraje(String kilometraje) {
        this.kilometraje = kilometraje;
    }

    public String getModelo() {
        return modelo;
    }

    public String getCilindrada() {
        return cilindrada;
    }

    public String getKilometraje() {
        return kilometraje;
    }

    public ArrayList<Viaje> getViaje() {
        return viaje;
    }
    
    
    
}
