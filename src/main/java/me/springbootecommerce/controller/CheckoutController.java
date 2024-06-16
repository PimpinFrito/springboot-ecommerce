package me.springbootecommerce.controller;

import me.springbootecommerce.dto.Purchase;
import me.springbootecommerce.dto.PurchaseResponse;
import me.springbootecommerce.service.CheckoutService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/checkout")
public class CheckoutController {
    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        JwtAuthenticationToken authenticationToken =
                (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authenticationToken.getToken();
        String userId = jwt.getSubject();
        String userEmail = jwt.getClaim("email");

        // Log user details
        System.out.println("Get claims: " + jwt.getClaims().keySet());
        System.out.println("\n\n\n\nJWT Token value: " + jwt.getTokenValue());
        System.out.println("\n\n\n\nJWT get claim as String: " + jwt.getClaimAsString("sub"));
        System.out.println("\n\n\n JWT as string: " + jwt);
        System.out.println("User ID: " + userId);
        System.out.println("User Email: " + userEmail);

        return checkoutService.placeOrder(purchase);
    }
}
