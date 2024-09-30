package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;

public class Registro_trabajo {

    private Chofer chofer;
    private Camion camion;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_asignacion;
    @JsonDeserialize(using = LocalDateDeserializer.class)
    @JsonSerialize(using = LocalDateSerializer.class)
    private LocalDate fecha_finalizacion;

    public Registro_trabajo(Chofer chofer, Camion camion, LocalDate fecha_asignacion, LocalDate fecha_finalizacion) {
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

    public LocalDate getFecha_asignacion() {
        return fecha_asignacion;
    }

    public LocalDate getFecha_finalizacion() {
        return fecha_finalizacion;
    }

    public void setChofer(Chofer chofer) {
        this.chofer = chofer;
    }

    public void setCamion(Camion camion) {
        this.camion = camion;
    }

    public void setFecha_asignacion(LocalDate fecha_asignacion) {
        this.fecha_asignacion = fecha_asignacion;
    }

    public void setFecha_finalizacion(LocalDate fecha_finalizacion) {
        this.fecha_finalizacion = fecha_finalizacion;
    }

}
