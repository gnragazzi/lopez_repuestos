/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Clases;

import java.util.Date;

/**
 *
 * @author Administrador
 */
public class Registro_trabajo {
    private Chofer chofer;
    private Camion camion;
    private Date fecha_asignacion;
    private Date fecha_finalizacion;

    public Registro_trabajo(Chofer chofer, Camion camion, Date fecha_asignacion, Date fecha_finalizacion) {
        this.chofer = chofer;
        this.camion = camion;
        this.fecha_asignacion = fecha_asignacion;
        this.fecha_finalizacion = fecha_finalizacion;
    }

    public Registro_trabajo() {
    }

    public Chofer getChofer() {
        return chofer;
    }

    public Camion getCamion() {
        return camion;
    }

    public Date getFecha_asignacion() {
        return fecha_asignacion;
    }

    public Date getFecha_finalizacion() {
        return fecha_finalizacion;
    }

    public void setChofer(Chofer chofer) {
        this.chofer = chofer;
    }

    public void setCamion(Camion camion) {
        this.camion = camion;
    }

    public void setFecha_asignacion(Date fecha_asignacion) {
        this.fecha_asignacion = fecha_asignacion;
    }

    public void setFecha_finalizacion(Date fecha_finalizacion) {
        this.fecha_finalizacion = fecha_finalizacion;
    }
    
    
}
