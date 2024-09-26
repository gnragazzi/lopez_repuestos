/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clases;

/**
 *
 * @author Administrador
 */
public class Semirremolque extends Vehiculo{
    private String tipo;
    private String carga;
    private Camion camion;

    public Semirremolque() {
    }

    public Semirremolque(Camion camion, String carga, String tipo, String marca, String patente, Seguro seguro, Tarjeta_Ruta tarjeta_ruta, Tecnica tecnica) {
        super(marca, patente, seguro, tarjeta_ruta, tecnica);
        this.camion = camion;
        this.carga = carga;
        this.tipo = tipo;
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

    public Camion getCamion() {
        return camion;
    }

    public void setCamion(Camion camion) {
        this.camion = camion;
    }
    
}
