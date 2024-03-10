package studybuddy.api.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileEndpoint {

    @Autowired
    private UserService userService;

    /* ---------------------- original -------------------------
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // Get existing session without creating a new one
        if (session != null && session.getAttribute("loggedInUser") != null) {
            Long userId = (Long) session.getAttribute("loggedInUser");
            Optional<User> userOptional = userService.findUser(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return ResponseEntity.ok(user); // Include user object with user ID in the response
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

     */

    // ---------------- Using local storage? ----------------
    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader(value = "userId", required = false) String userId) {
        if (userId != null && !userId.isEmpty()) {
            try {
                Long parsedUserId = Long.parseLong(userId);
                Optional<User> userOptional = userService.findUser(parsedUserId);
                if (userOptional.isPresent()) {
                    User user = userOptional.get();
                    return ResponseEntity.ok(user);
                }
            } catch (NumberFormatException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}