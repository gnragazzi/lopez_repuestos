package com.grupoing.servidor;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import java.util.Date;
import java.util.UUID;

public class Autorización {
 
    private static Algorithm algorithm;
    private static JWTVerifier verifier;

    public static final String ACCESO = "acceso";
    public static final String REFRESH = "refresh";
    
    public Autorización() {
        algorithm = Algorithm.HMAC256("xF1oOlk#4!.41x3r");   
        //algorithm = Algorithm.HMAC256("xF1oOlk#4!.41x3rk");  
        verifier = JWT.require(algorithm)
                .withIssuer("Lopez-Servidor")
                .build();
    }

    public static String nuevoTokenDeAcceso() {
        return JWT.create()
                .withIssuer("Lopez-Servidor")
                .withSubject("Baeldung Details")
                .withClaim("tipo", ACCESO)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10*60000L)) 
                .withJWTId(UUID.randomUUID()
                        .toString())
                //                .withNotBefore(new Date(System.currentTimeMillis() + 1000L)) 
                .sign(algorithm); 
    }

    public static String nuevoTokenRefresh(Date fecha_expiración) {
        return JWT.create()
                .withIssuer("Lopez-Servidor")
                .withSubject("Baeldung Details")
                .withClaim("tipo", REFRESH)
                .withIssuedAt(new Date())
                .withExpiresAt(fecha_expiración)
                .withJWTId(UUID.randomUUID()
                        .toString())
                //.withNotBefore(new Date(System.currentTimeMillis() + 1000L))
                .sign(algorithm);
    }

    public static boolean validarToken(String tipo, String jwtToken) {
        try {
            DecodedJWT decodedJWT = verifier.verify(jwtToken);
            Claim claim = decodedJWT.getClaim("tipo");
            if (claim.asString().equals(tipo)) {
                System.out.println("Token de " + tipo + " validado correctamente.");
                return true;
            } else {
                System.out.println("Token de " + tipo + " no pudo ser validado.");
                return false;
            }
        } catch (JWTVerificationException e) {
            System.out.println("ERROR: " + e.getMessage());
            System.out.println("Imposible validar el usuario.");
            return false;
        }
    }
}
