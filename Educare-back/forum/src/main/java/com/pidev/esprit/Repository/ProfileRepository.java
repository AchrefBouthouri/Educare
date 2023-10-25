package com.pidev.esprit.Repository;

import com.pidev.esprit.Entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile,Long> {
    Profile findByIdUser(Long IdUser);
}
