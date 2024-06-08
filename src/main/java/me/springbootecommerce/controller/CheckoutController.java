package me.springbootecommerce.controller;

import me.springbootecommerce.dto.Purchase;
import me.springbootecommerce.dto.PurchaseResponse;
import me.springbootecommerce.service.CheckoutService;
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
        return checkoutService.placeOrder(purchase);
    }

    @GetMapping("/headers")
    public String getHeaders(@RequestHeader Map<String, String> headers) {
        headers.forEach((key, value) -> {
            System.out.printf("Header '%s' = %s%n", key, value);
        });
        System.out.println("\n\n\n");

        String success = "Success";
        return success;
    }
}
