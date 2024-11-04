package com.grupoing.servidor;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import control_acceso.ControlAcceso;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

public class manejadorAuth implements HttpHandler {

    ControlAcceso ca;
        
    
    @Override
    public void handle(HttpExchange he) throws IOException{
        
        String usuario, contrasena;
        usuario = obtenerParámetros(he.getRequestURI(), "usuario");
        contrasena = obtenerParámetros (he.getRequestURI(), "contrasena");
        
        try {
            if(ca.readUser(usuario)!= 1)
                ca.create(usuario, contrasena); //los creo ya que necesitamos implementar una forma para insertar los usuarios y contrasenas
            
            if(ca.read(usuario, contrasena)==1){
                
                String jwtToken = Autorización.nuevoTokenDeAcceso();

                //REFRESH TOKEN
                Date fecha_expiración = new Date(System.currentTimeMillis() + 6 * 60 * 60000L);
                String refreshToken = Autorización.nuevoTokenRefresh(fecha_expiración);
                he.getResponseHeaders().add("Set-Cookie", "refresh=" + refreshToken + "; HttpOnly; Secure; SameSite=Strict; Expires=" + fecha_expiración.toGMTString());
                /*  EN CASO DE QUE NO FUNCIONE, UTILIZAR LA VARIABLE (QUE PERMITIRÍA EL USO DESDE CUALQUIER URL)  
                String origin = he.getRequestHeaders().get("Origin").get(0);
                System.out.println(origin); 
                 */
                he.getResponseHeaders().add("Access-Control-Allow-Origin", "http://localhost:5173");
                he.getResponseHeaders().add("Access-Control-Allow-Credentials", "true");

                if (he.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
                    he.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
                    he.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");
                    he.sendResponseHeaders(204, -1);
                    return;
                }

                ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
                Respuesta obRespuesta = new Respuesta("Login", jwtToken);
                String response = ow.writeValueAsString(obRespuesta);
                he.getResponseHeaders().add("Content-Type", "application/json");
                he.sendResponseHeaders(200, response.getBytes().length);
                OutputStream os = he.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }      
        } 
        catch (ClassNotFoundException ex) {
            Logger.getLogger(manejadorAuth.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected String manejarGet(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    @Override
    protected String manejarPost(HttpExchange he) throws UnsupportedEncodingException, JsonProcessingException, ClassNotFoundException, Exception {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
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
