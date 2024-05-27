package me.project.service;

import jakarta.transaction.Transactional;
import me.project.dto.Purchase;
import me.project.dto.PurchaseResponse;
import me.project.entity.Customer;
import me.project.entity.Order;
import me.project.repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private final CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }


    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order  = purchase.getOrder();
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        order.setOrderItems(purchase.getOrderItems());
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        Customer customer = purchase.getCustomer();
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
       return UUID.randomUUID().toString();
    }
}
