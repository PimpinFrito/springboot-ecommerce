package me.project.dto;

import lombok.Data;
import me.project.entity.Address;
import me.project.entity.Customer;
import me.project.entity.Order;
import me.project.entity.OrderItem;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
