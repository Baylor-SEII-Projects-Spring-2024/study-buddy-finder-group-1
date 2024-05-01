/*
package studybuddy.api.endpoint;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthEndpoint {

    @Autowired
    private UserService userService;

    @Autowired
    private HttpServletRequest request; // Inject HttpServletRequest for session management

    @PostMapping("/register")
    public ResponseEntity<String> saveUser(@RequestBody User user) {
        boolean userExists = userService.findUserByEmail(user.getEmail_address()).isPresent();

        // user with email already exists
        if (userExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with email: " + user.getEmail_address() + " already exists.");
        }
        // unique email, successfully registers
        else {
            userService.saveUser(user);
            return ResponseEntity.ok("Registered user successfully!");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        if (userService.attemptLogin(email, password)) {
            // Good login
            log.info("Successful login for user with email: {}", email);
            Optional<User> userOptional = userService.findUserByEmail(email);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("userId", user.getId());

                // Create session for the logged-in user
                HttpSession session = request.getSession(true);
                session.setAttribute("loggedInUser", user.getId()); // Store user ID in the session

                return ResponseEntity.ok(response);
            } else {
                log.error("User not found after successful login for email: {}", email);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User not found after successful login.");
            }
        } else {
            // Invalid login
            log.warn("Invalid login attempt for email: {}", email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login");
        }
    }


}

 */

package studybuddy.api.endpoint.courses;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.course.Course;
import studybuddy.api.course.CourseService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Log4j2
@RestController
// dev@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://34.16.179.242:3000")
public class CourseEndpoint {
    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

    @GetMapping("/courses")
    public List<Course>  findAllCourses() { return courseService.findAllCourses(); }
}