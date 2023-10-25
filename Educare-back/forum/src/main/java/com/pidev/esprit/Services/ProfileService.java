package com.pidev.esprit.Services;

import com.pidev.esprit.Entities.Profile;
import com.pidev.esprit.Repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService implements IProfileService{
    @Autowired
    ProfileRepository profileRepository;
    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Profile getProfileById(Long id) {
        Optional<Profile> profileOptional = profileRepository.findById(id);
        return profileOptional.orElse(null);
    }

    public Profile createProfile(Profile profile) {
        profile.setComments(null);
        profile.setScore(null);
        profile.setIs_blocked(false);
        profile.setIs_muted(false);

        return profileRepository.save(profile);
    }

    public Profile updateProfile( Profile profile) {
        Optional<Profile> existingProfileOptional = profileRepository.findById(profile.getIdProfile());
        if (existingProfileOptional.isPresent()) {
            Profile existingProfile = existingProfileOptional.get();
            // Update the fields of existingProfile with the values from profile
            existingProfile.setIdUser(profile.getIdUser());
            existingProfile.setScore(profile.getScore());
            existingProfile.setImage_url(profile.getImage_url());
            existingProfile.setBiography(profile.getBiography());
            existingProfile.setIs_muted(profile.getIs_muted());
            existingProfile.setIs_blocked(profile.getIs_blocked());
            existingProfile.setComments(profile.getComments());

            return profileRepository.save(existingProfile);
        } else {
            return null;
        }
    }

    public boolean deleteProfile(Long id) {
        Optional<Profile> profileOptional = profileRepository.findById(id);
        if (profileOptional.isPresent()) {
            profileRepository.delete(profileOptional.get());
            return true;
        } else {
            return false;
        }
    }
    public Profile getProfileByUserId(Long userId) {
        return profileRepository.findByIdUser(userId);
    }
}
