package studybuddy.api.endpoint.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://34.125.60.1:3000")
public class ProfileEndpoint {

    @Autowired
    private UserService userService;

    @GetMapping("/ProfilePage/{userId}")
    public ResponseEntity<User> getUserProfile(@PathVariable Long userId) {
        try {
            Optional<User> userOptional = userService.findUser(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}