package com.grupoing.servidor;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.json.JSONException;
import org.json.JSONObject;

public class manejadorViaje implements HttpHandler {

    @Override
    public void handle(HttpExchange he) throws IOException {
        // CON ESTO SOLUCIONAMOS EL PROBLEMA DEL CORS
        he.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
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
        try{
            JSONObject jsonobj = new JSONObject(buf.toString());
            System.out.println(jsonobj.toString());
        }
        catch(JSONException ex){
            System.out.println("ERROR: " + ex);
        }
    }

}
