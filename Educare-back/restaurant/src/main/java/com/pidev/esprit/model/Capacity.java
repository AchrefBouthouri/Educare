package com.pidev.esprit.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Capacity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "capacity_generator")
    @SequenceGenerator(name="capacity_generator", sequenceName = "capacity_seq", initialValue = 1, allocationSize = 1)
    private Long id;

    private int value;

}