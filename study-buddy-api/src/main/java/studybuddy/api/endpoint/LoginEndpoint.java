package studybuddy.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.user.UserService;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginEndpoint {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
        if (userService.attemptLogin(email, password)) {
            //good login
            return ResponseEntity.ok("Login successful");
        }
        else {
            //invalid login
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login");
        }
    }
}
