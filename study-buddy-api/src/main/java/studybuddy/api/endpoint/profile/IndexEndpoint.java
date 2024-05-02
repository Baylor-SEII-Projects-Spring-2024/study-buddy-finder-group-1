package studybuddy.api.endpoint.profile;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
public class IndexEndpoint {
    @GetMapping("/index")
    public String index() {
        return "index.js";
    }
}

/**
 *
 * @Log4j2
 * @RestController
 * @CrossOrigin(origins = "http://localhost:3000")
 * public class UserEndpoint {
 *     @Autowired
 *     private UserService userService;
 *
 *     @GetMapping("/users/{id}")
 *     public User findUserById(@PathVariable Long id) {
 *         var user = userService.findUser(id).orElse(null);
 *
 *         if (user == null) {
 *             log.warn("User not found");
 *         }
 *
 *         return user;
 *     }
 *
 *     @PostMapping("/users")
 *     public User saveUser(@RequestBody User user) {
 *         return userService.saveUser(user);
 *     }
 * }
 */