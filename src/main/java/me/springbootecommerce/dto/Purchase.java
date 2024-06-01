package me.springbootecommerce.dto;

import lombok.Data;
import me.springbootecommerce.entity.Address;
import me.springbootecommerce.entity.Customer;
import me.springbootecommerce.entity.Order;
import me.springbootecommerce.entity.OrderItem;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
