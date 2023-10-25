package com.pidev.esprit.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Profile")
public class Profile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idProfile;
    private Long idUser;
    @JsonIgnore
    private Long Score;
    private String image_url;

    private String Biography;
    @JsonIgnore
    private Boolean is_muted;
    @JsonIgnore
    private Boolean is_blocked;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy="Profile")
    private List<Comment> Comments;





}
