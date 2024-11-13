package com.grupoing.servidor;

import Conexion.Credenciales;
import control_acceso.ControlAcceso;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneOffset;

public class backup {

    public static void backup() {
        try {
            ControlAcceso ca = new ControlAcceso();
            Process p = Runtime
                    .getRuntime()
                    //.exec("C:/Aplicaciones/wamp/bin/mysql/mysql5.1.36/bin/mysqldump -u root -ppassword database"); Por ahí esto funciona en windows
                    .exec("mysqldump -u " + Credenciales.getUsuario() + " -p" + Credenciales.getContraseña() + " --databases lopez_repuestos");

            InputStream is = p.getInputStream();
            FileOutputStream fos = new FileOutputStream(LocalDate.now().atStartOfDay().toEpochSecond(ZoneOffset.UTC)+".sql");
            byte[] buffer = new byte[1000];

            int leido = is.read(buffer);
            while (leido > 0) {
                fos.write(buffer, 0, leido);
                leido = is.read(buffer);
            }
            fos.close();
            ca.cargarRegistro();
            System.out.println("Se realizó un backup de la base de datos");
        } catch (Exception e) {
            System.out.println("No se pudo realizar el BACKUP... Contactesé con el equipo de SOPORTE");
        }
    }

    public static boolean realizarBackup() throws Exception {
        ControlAcceso ca = new ControlAcceso();

        LocalDate ultimoBackup = LocalDate.parse(ca.getUltimaFecha());
        LocalDate hoy = LocalDate.now();

        hoy.atStartOfDay().toEpochSecond(ZoneOffset.UTC);

        if (hoy.atStartOfDay().toEpochSecond(ZoneOffset.UTC) - ultimoBackup.atStartOfDay().toEpochSecond(ZoneOffset.UTC) > 2592000) {// 2592000 = cantidad de segundos en 30 días
            return true;
        } else { 
            return false;
        }
    }
}
