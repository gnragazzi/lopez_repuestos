package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;
import java.util.ArrayList;

public class Chofer extends Empleado {
    @JsonDeserialize(using = LocalDateDeserializer.class)  
    @JsonSerialize(using = LocalDateSerializer.class)  
    private LocalDate fecha_psicotecnico;
    private ArrayList<Viaje> viaje;

    public Chofer(LocalDate fecha_psicotecnico, ArrayList<Viaje> viaje, String dni, String cuil, String nombre, String apellido, String domicilio, LocalDate fecha_nacimiento, String telefono) {
        super(dni, cuil, nombre, apellido, domicilio, fecha_nacimiento, telefono);
        this.fecha_psicotecnico = fecha_psicotecnico;
        this.viaje = viaje;
    }

    public Chofer() {
    }

    public LocalDate getFecha_psicotecnico() {
        return fecha_psicotecnico;
    }

    public void setFecha_psicotecnico(LocalDate fecha_psicotecnico) {
        this.fecha_psicotecnico = fecha_psicotecnico;
    }

    public ArrayList<Viaje> getViaje() {
        return viaje;
    }

    public void setViaje(ArrayList<Viaje> viaje) {
        this.viaje = viaje;
    }
    
    
}
