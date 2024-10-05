/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clases;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;

/**
 *
 * @author Administrador
 */
public class Semirremolque extends Vehiculo{
	@JsonProperty("tipo")
    private String tipo;
	@JsonProperty("carga")
    private String carga;
	@JsonProperty("camion")
    private ArrayList<Viaje> viaje;

    public Semirremolque() {
    }



    public Semirremolque(String marca, String patente, Seguro seguro, Tarjeta_Ruta tarjeta_ruta, Tecnica tecnica,
            ArrayList<Mantenimiento> mantenimiento, String tipo, String carga, ArrayList<Viaje> viaje) {
        super(marca, patente, seguro, tarjeta_ruta, tecnica, mantenimiento);
        this.tipo = tipo;
        this.carga = carga;
        this.viaje = viaje;
    }


    public String getTipo() {
        return tipo;
    }

    public String getCarga() {
        return carga;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setCarga(String carga) {
        this.carga = carga;
    }

    public ArrayList<Viaje> getViaje() {
        return viaje;
    }

    public void setViaje(ArrayList<Viaje> viaje) {
        this.viaje = viaje;
    } 
}
