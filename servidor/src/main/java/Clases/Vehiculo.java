package Clases;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;


public abstract class  Vehiculo {
	@JsonProperty("marca")
    private String marca;
	@JsonProperty("patente")
    private String patente;
	@JsonProperty("tarjeta_ruta")
    private Tarjeta_Ruta tarjeta_ruta;
	@JsonProperty("seguro")
    private ArrayList<Seguro> seguro;
	@JsonProperty("tecnica")
    private ArrayList<Tecnica> tecnica;
	@JsonProperty("mantenimiento")
    private ArrayList<Mantenimiento> mantenimiento;

    public Vehiculo() {
    }

    public Vehiculo(String marca, String patente, ArrayList<Seguro> seguro, Tarjeta_Ruta tarjeta_ruta, ArrayList<Tecnica> tecnica, ArrayList<Mantenimiento> mantenimiento) {
        this.marca = marca;
        this.patente = patente;
        this.seguro = seguro;
        this.tarjeta_ruta = tarjeta_ruta;
        this.tecnica = tecnica;
        this.mantenimiento=mantenimiento;
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

    public ArrayList<Seguro> getSeguro() {
        return seguro;
    }

    public ArrayList<Tecnica> getTecnica() {
        return tecnica;
    }

    public void setTarjeta_ruta(Tarjeta_Ruta tarjeta_ruta) {
        this.tarjeta_ruta = tarjeta_ruta;
    }

    public void setSeguro(ArrayList<Seguro> seguro) {
        this.seguro = seguro;
    }

    public void setTecnica(ArrayList<Tecnica> tecnica) {
        this.tecnica = tecnica;
    }

    public ArrayList<Mantenimiento> getMantenimiento() {
        return mantenimiento;
    }

    public void setMantenimiento(ArrayList<Mantenimiento> mantenimiento) {
        this.mantenimiento = mantenimiento;
    }
    
    
    
}
