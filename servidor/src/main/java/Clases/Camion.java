package Clases;

import java.util.ArrayList;

public class Camion extends Vehiculo{
    private String modelo;
    private String potencia;
    private int kilometraje;
    private ArrayList<Viaje> viaje;
    
    
    public Camion() {
        super();
    }

    public Camion(String marca, String patente, Seguro seguro, Tarjeta_Ruta tarjeta_ruta, Tecnica tecnica,
            ArrayList<Mantenimiento> mantenimiento, String modelo, String cilindrada, int kilometraje,
            ArrayList<Viaje> viaje, Semirremolque semirremolque) {
        super(marca, patente, seguro, tarjeta_ruta, tecnica, mantenimiento);
        this.modelo = modelo;
        this.potencia = cilindrada;
        this.kilometraje = kilometraje;
        this.viaje = viaje;
    }



    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    
    public void setCilindrada(String cilindrada) {
        this.potencia = cilindrada;
    }

    public void setViaje(ArrayList<Viaje> viaje) {
        this.viaje = viaje;
    }

    public void setKilometraje(int kilometraje) {
        this.kilometraje = kilometraje;
    }

    public String getModelo() {
        return modelo;
    }

    public String getCilindrada() {
        return potencia;
    }

    public int getKilometraje() {
        return kilometraje;
    }

    public ArrayList<Viaje> getViaje() {
        return viaje;
    }
     
}
