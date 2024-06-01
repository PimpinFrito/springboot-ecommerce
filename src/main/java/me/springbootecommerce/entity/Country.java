package me.springbootecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {
    @Id
    private Long id;
    private String code;
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "country")
    @JsonIgnore()
    private List<State> states;
}
