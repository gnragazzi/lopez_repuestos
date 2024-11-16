package Clases;

import java.util.ArrayList;

public class Vencimientos {

    private ArrayList<Chofer> Choferes;
    private ArrayList<Vehiculo> sinSeguro;
    private ArrayList<Vehiculo> seguroVencido;
    private ArrayList<Vehiculo> sinTarjetaRuta;
    private ArrayList<Vehiculo> tarjetaRutaVencida;
    private ArrayList<Vehiculo> sinTecnica = new ArrayList<>();
    private ArrayList<Vehiculo> tecnicaVencida = new ArrayList<>();

    public void setChoferes(ArrayList<Chofer> Choferes) {
        this.Choferes = Choferes;
    }

    
    
    public void agregarChofer(Chofer ch) {
        if (Choferes == null) {
            Choferes = new ArrayList<>();
        }
        Choferes.add(ch);
    }

    public void agregarSinSeguro(Vehiculo v) {
        if (sinSeguro == null) {
            sinSeguro = new ArrayList<>();
        }
        sinSeguro.add(v);
    }

    public void agregarSeguroVencido(Vehiculo v) {
        if (seguroVencido == null) {
            seguroVencido = new ArrayList<>();
        }
        seguroVencido.add(v);
    }
    
    public void agregarSinTarjetaRuta(Vehiculo v) {
        if (sinTarjetaRuta == null) {
            sinTarjetaRuta = new ArrayList<>();
        }
        sinTarjetaRuta.add(v);
    }
    public void agregarTarjetaRutaVencida(Vehiculo v) {
        if (tarjetaRutaVencida == null) {
            tarjetaRutaVencida = new ArrayList<>();
        }
        tarjetaRutaVencida.add(v);
    }
    public void agregarSinTecnica(Vehiculo v) {
        if (sinTecnica == null) {
            sinTecnica = new ArrayList<>();
        }
        sinTecnica.add(v);
    }
    public void agregarTecnicaVencida(Vehiculo v) {
        if (tecnicaVencida == null) {
            tecnicaVencida = new ArrayList<>();
        }
        tecnicaVencida.add(v);
    }

    public ArrayList<Chofer> getChoferes() {
        return Choferes;
    }

    public ArrayList<Vehiculo> getSeguroVencido() {
        return seguroVencido;
    }

    public ArrayList<Vehiculo> getSinSeguro() {
        return sinSeguro;
    }

    public ArrayList<Vehiculo> getSinTarjetaRuta() {
        return sinTarjetaRuta;
    }

    public ArrayList<Vehiculo> getSinTecnica() {
        return sinTecnica;
    }

    public ArrayList<Vehiculo> getTarjetaRutaVencida() {
        return tarjetaRutaVencida;
    }

    public ArrayList<Vehiculo> getTecnicaVencida() {
        return tecnicaVencida;
    }

    
}
