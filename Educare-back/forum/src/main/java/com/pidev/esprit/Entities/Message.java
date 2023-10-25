package com.pidev.esprit.Entities;
import java.io.Serializable;
import java.util.Date;

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
public class Message implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMessage;
    private Long idRoom;
    private Date date_message;





}
