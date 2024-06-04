package me.springbootecommerce.service;

import jakarta.transaction.Transactional;
import me.springbootecommerce.dto.Purchase;
import me.springbootecommerce.dto.PurchaseResponse;
import me.springbootecommerce.entity.Customer;
import me.springbootecommerce.entity.Order;
import me.springbootecommerce.repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.logging.Logger;

@Service
public class CheckoutServiceImpl implements CheckoutService {

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

        purchase.getOrderItems().forEach(order::add);

        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());


        Customer customer = purchase.getCustomer();
        String email = customer.getEmail();

        //if email already exists in db, assign it to customer if so
        Customer existingCustomer = this.customerRepository.findByEmail(email);
        if(existingCustomer != null){
            customer = existingCustomer;
        }
        customer.add(order);

        Logger.getLogger(customer.getFirstName());
        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
       return UUID.randomUUID().toString();
    }
}
