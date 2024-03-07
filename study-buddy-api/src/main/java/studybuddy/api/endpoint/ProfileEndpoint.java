package studybuddy.api.endpoint;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileEndpoint {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get existing session without creating a new one
        if (session != null && session.getAttribute("loggedInUser") != null) {
            Long userId = (Long) session.getAttribute("loggedInUser");
            Optional<User> userOptional = userService.findUser(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}