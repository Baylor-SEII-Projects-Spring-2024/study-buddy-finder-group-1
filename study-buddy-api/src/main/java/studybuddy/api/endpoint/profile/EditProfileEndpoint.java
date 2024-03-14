package studybuddy.api.endpoint.profile;

import lombok.extern.log4j.Log4j2;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class EditProfileEndpoint {
    @Autowired
    private UserService userService;

    @PutMapping("/editProfile")
    public ResponseEntity<String> editUserProfile(@RequestBody User updatedUser) {
        try {
            // Perform validation on the updated user data
            if (updatedUser.getFirstName() == null || updatedUser.getFirstName().isEmpty() ||
                    updatedUser.getLastName() == null || updatedUser.getLastName().isEmpty() ||
                    updatedUser.getEmail() == null || updatedUser.getEmail().isEmpty() ||
                    updatedUser.getPassword() == null || updatedUser.getPassword().isEmpty() ||
                    updatedUser.getUserType() == null || updatedUser.getUserType().isEmpty()) {

                return ResponseEntity.badRequest().body("All fields are required");
            }

            // Retrieve the existing user from the database
            Optional<User> existingUserOptional = userService.findUserByEmail(updatedUser.getEmail());
            if (!existingUserOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            // Unwrap the Optional to get the actual User object
            User existingUser = existingUserOptional.get();

            // Update the user data
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setUserType(updatedUser.getUserType());

            // Save the updated user to the database
            userService.saveUser(existingUser);

            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            // Log any exceptions
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile");
        }
    }
}