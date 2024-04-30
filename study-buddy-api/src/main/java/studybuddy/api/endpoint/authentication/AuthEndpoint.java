package studybuddy.api.endpoint.authentication;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.reviewtutor.ReviewTutor;
import studybuddy.api.reviewtutor.ReviewTutorService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://34.125.65.178:3000")

public class AuthEndpoint {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody User user) {
        boolean userExists = userService.findUserByEmail(user.getEmail_address()).isPresent();

        //initialize user rating
        if (Objects.equals(user.getUserType(), "Tutor")) {
            user.setRating(0.0);
        }

        // user with email already exists
        if (userExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with email: " + user.getEmail_address() + " already exists.");
        }
        // unique email, successfully registers
        else {
            System.out.println("HERE");
            userService.saveUser(user);
            System.out.println("HERE");
            return ResponseEntity.ok("Registered user successfully!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password, HttpServletResponse response) {
        // Your login logic here
        if (userService.attemptLogin(email, password)) {
            // Good login
            Optional<User> userOptional = userService.findUserByEmail(email);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Map<String, Object> responseBody = new HashMap<>();
                responseBody.put("message", "Login successful");
                responseBody.put("userId", user.getId());
                responseBody.put("firstName", user.getFirstName()); // Include user's first name
                // Store user ID in a session cookie
                response.addCookie(new Cookie("userId", String.valueOf(user.getId())));
                return ResponseEntity.ok(responseBody);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not found after successful login.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login");
        }
    }

    @GetMapping("/api/users")
    public ResponseEntity<?> getAllUsers() {
        // Fetch all users from the database
        Iterable<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/api/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        // Fetch user by ID from the database
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}