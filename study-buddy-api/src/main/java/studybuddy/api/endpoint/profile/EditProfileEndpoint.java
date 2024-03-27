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

    @PutMapping("/editProfile/{id}")
    public ResponseEntity<String> editUserProfile(@PathVariable("id") Long userId, @RequestBody User updatedUser) {
        System.out.println("Received update for user: " + updatedUser.toString());
        try {
            if (updatedUser.getFirstName() == null || updatedUser.getFirstName().isEmpty() ||
                    updatedUser.getLastName() == null || updatedUser.getLastName().isEmpty() ||
                    updatedUser.getEmail() == null || updatedUser.getEmail().isEmpty() ||
                    updatedUser.getPassword() == null || updatedUser.getPassword().isEmpty() ||
                    updatedUser.getUserType() == null || updatedUser.getUserType().isEmpty()) {

                return ResponseEntity.badRequest().body("All fields are required");
            }

            Optional<User> existingUserOptional = userService.findUser(userId);
            if (!existingUserOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }

            User existingUser = existingUserOptional.get();
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setEmail_address(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setUserType(updatedUser.getUserType());

            userService.saveUser(existingUser);

            return ResponseEntity.ok("Profile updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update profile");
        }
    }
}