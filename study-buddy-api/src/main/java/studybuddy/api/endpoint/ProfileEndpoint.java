package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileEndpoint {

    @Autowired
    private UserService userService;

    @GetMapping("/ProfilePage/{userEmail}")
    public ResponseEntity<User> getUserProfile(@PathVariable String userEmail) {
        try {
            if (userEmail != null && !userEmail.isEmpty()) {
                System.out.println("User email: " + userEmail);
                Optional<User> userOptional = userService.findUserByEmail(userEmail);
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    return ResponseEntity.ok(user);
                } else {
                    // Handle case when user is not found
                    return ResponseEntity.notFound().build();
                }
            } else {
                // Handle case when userEmail is null or empty
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            // Log any exceptions
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}