package com.pidev.esprit.Entities;

import java.io.Serializable;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.*;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Room")
public class Room implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idRoom;




}
