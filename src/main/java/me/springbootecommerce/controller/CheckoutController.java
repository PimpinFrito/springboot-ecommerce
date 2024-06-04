package me.springbootecommerce.controller;

import me.springbootecommerce.dto.Purchase;
import me.springbootecommerce.dto.PurchaseResponse;
import me.springbootecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@RestController
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
}
