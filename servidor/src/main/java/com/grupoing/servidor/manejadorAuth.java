package com.grupoing.servidor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import control_acceso.ControlAcceso;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

public class manejadorAuth implements HttpHandler {

    ControlAcceso ca = new ControlAcceso();

    @Override
    public void handle(HttpExchange he) throws IOException {
        String usuario = "", contrasena = "";

        he.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:5173");
        he.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");

        if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
            he.sendResponseHeaders(204, -1);
            return;
        }

        //USAR EL InputStreamReadr NOS PERMITE PARSEAR EL CUERPO DEL POST
        InputStreamReader isr = new InputStreamReader(he.getRequestBody(), "utf-8");
        BufferedReader br = new BufferedReader(isr);
        int b;
        StringBuilder buf = new StringBuilder(512);
        while ((b = br.read()) != -1) {
            buf.append((char) b);
        }
        br.close();
        isr.close();

        try {
            JSONObject jsonobj = new JSONObject(buf.toString());

            usuario = jsonobj.getString("usuario");
            contrasena = jsonobj.getString("contrasena");


            if (ca.readUser(usuario) == false) {
                ca.create(usuario, contrasena); //los creo ya que necesitamos implementar una forma para insertar los usuarios y contrasenas
            }
            
            if (ca.read(usuario, contrasena) == true) {
                
                        
                String jwtToken = Autorización.nuevoTokenDeAcceso();

                //REFRESH TOKEN
                Date fecha_expiración = new Date(System.currentTimeMillis() + 6 * 60 * 60000L);
                String refreshToken = Autorización.nuevoTokenRefresh(fecha_expiración);
                he.getResponseHeaders().add("Set-Cookie", "refresh=" + refreshToken + "; HttpOnly; Secure; SameSite=Strict; Expires=" + fecha_expiración.toGMTString());
                /*  EN CASO DE QUE NO FUNCIONE, UTILIZAR LA VARIABLE (QUE PERMITIRÍA EL USO DESDE CUALQUIER URL)  
                String origin = he.getRequestHeaders().get("Origin").get(0);
                System.out.println(origin); 
                 */

                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                Respuesta obRespuesta = new Respuesta("Login", jwtToken);
                String response = ow.writeValueAsString(obRespuesta);
                he.getResponseHeaders().add("Content-Type", "application/json");
                he.sendResponseHeaders(200, response.getBytes().length);
                OutputStream os = he.getResponseBody();
                os.write(response.getBytes());
                os.close();
            } else {
                String response = "Error, usuario no registrado";
                he.getResponseHeaders().add("Content-Type", "application/json");
                he.sendResponseHeaders(405, response.getBytes().length);
                OutputStream os = he.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    private class Respuesta {

        String msj;
        String Token;

        public Respuesta(String msj, String Token) {
            this.msj = msj;
            this.Token = Token;
        }

        public String getToken() {
            return Token;
        }

        public String getMsj() {
            return msj;
        }

        public void setMsj(String msj) {
            this.msj = msj;
        }

        public void setToken(String Token) {
            this.Token = Token;
        }

    }

}
