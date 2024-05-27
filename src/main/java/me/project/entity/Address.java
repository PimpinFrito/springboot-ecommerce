package me.project.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "address")
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String city;
    private String country;
    private String state;
    private String street;
    private String zipCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    private Order order;
}
