package Clases;

import java.util.ArrayList;

public class Camion extends Vehiculo{
    private String modelo;
    private String potencia;//cilindrada
    private int kilometraje;
    private ArrayList<Viaje> viaje;
    
    
    public Camion() {
        super();
    }

    public Camion(String marca, String patente, Seguro seguro, Tarjeta_Ruta tarjeta_ruta, Tecnica tecnica,
            ArrayList<Mantenimiento> mantenimiento, String modelo, String potencia, int kilometraje, ArrayList<Viaje> viaje) {
        super(marca, patente, seguro, tarjeta_ruta, tecnica, mantenimiento);
        this.modelo = modelo;
        this.potencia = potencia;
        this.kilometraje = kilometraje;
        this.viaje = viaje;
    }



    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    

    public void setPotencia(String potencia) {
        this.potencia = potencia;
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

    public String getPotencia() {
        return potencia;
    }

    public int getKilometraje() {
        return kilometraje;
    }

    public ArrayList<Viaje> getViaje() {
        return viaje;
    }
     
}
