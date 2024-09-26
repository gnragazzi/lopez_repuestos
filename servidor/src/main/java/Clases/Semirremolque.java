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

    public Semirremolque(String marca, String patente) {
        super(marca, patente);
    }

    public Semirremolque() {
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
    
    
}
