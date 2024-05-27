package me.project.service;

import me.project.dto.Purchase;
import me.project.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
