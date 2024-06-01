package me.springbootecommerce.service;

import me.springbootecommerce.dto.Purchase;
import me.springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
