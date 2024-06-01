package me.springbootecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "order_item")
@Getter
@Setter
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String image_url;
    private int quantity;
    private int unitPrice;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Long productId;

}
