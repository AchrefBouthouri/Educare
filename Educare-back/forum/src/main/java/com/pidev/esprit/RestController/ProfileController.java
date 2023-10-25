package com.pidev.esprit.RestController;

import com.pidev.esprit.Entities.Profile;
import com.pidev.esprit.Services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/profile")
public class ProfileController {
    @Autowired
  //  UserService userService;
    ProfileService profileService;
    @GetMapping
    public List<Profile> getAllProfiles() {
        return profileService.getAllProfiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable Long id) {
        Profile profile = profileService.getProfileById(id);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/create")

    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) {
        Profile createdProfile = profileService.createProfile(profile);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id, @RequestBody Profile profile) {
        Profile updatedProfile = profileService.updateProfile( profile);
        if (updatedProfile != null) {
            return ResponseEntity.ok(updatedProfile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping({"/{profileId}/image"})
    public ResponseEntity<String> uploadImage(@PathVariable Long profileId,
                                              @RequestParam("imageFile") MultipartFile imageFile) {
        // Validate profileId and perform necessary checks

        // Check if the image file is provided
        if (imageFile == null || imageFile.isEmpty()) {
            return ResponseEntity.badRequest().body("Image file is required.");
        }

        // Perform image file processing
        try {
            // Save the image file to a desired location
            String imageUrl = saveImageFile(imageFile);

            // Update the profile with the image URL (assuming you have a profile repository/service)
            Profile profile = profileService.getProfileById(profileId);
            profile.setImage_url(imageUrl);
            profileService.updateProfile(profile);

            return ResponseEntity.ok("Image uploaded successfully.");
        } catch (IOException e) {
            // Handle any exceptions that occur during image processing
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
        }
    }

    // Helper method to save the image file to a desired location
    private String saveImageFile(MultipartFile imageFile) throws IOException {
        // Implement the logic to save the image file to a desired location
        // For example, you can use a file storage service or save it to a specific folder on the server

        // Example code using Java NIO to save the file to a specific folder
        String folderPath = "/path/to/save/image";
        String fileName = imageFile.getOriginalFilename();
        String filePath = folderPath + "/" + fileName;
        imageFile.transferTo(new File(filePath));

        return filePath; // Return the file path or URL to access the saved image
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        if (profileService.deleteProfile(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<Profile> getProfileByUserId(@PathVariable Long userId) {
        Profile profile = profileService.getProfileByUserId(userId);
        if (profile != null) {
            return ResponseEntity.ok(profile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
