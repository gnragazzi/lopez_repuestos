package Clases;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import java.time.LocalDate;

public class Chofer extends Empleado {
    @JsonDeserialize(using = LocalDateDeserializer.class)  
    @JsonSerialize(using = LocalDateSerializer.class)  
    private LocalDate fecha_psicotecnico;

    public Chofer(String dni, String cuil, String nombre, String apellido, String domicilio, LocalDate fecha_nacimiento, String telefono) {
        super(dni, cuil, nombre, apellido, domicilio, fecha_nacimiento, telefono);
    }

    public Chofer() {
    }

    public LocalDate getFecha_psicotecnico() {
        return fecha_psicotecnico;
    }

    public void setFecha_psicotecnico(LocalDate fecha_psicotecnico) {
        this.fecha_psicotecnico = fecha_psicotecnico;
    }
}
