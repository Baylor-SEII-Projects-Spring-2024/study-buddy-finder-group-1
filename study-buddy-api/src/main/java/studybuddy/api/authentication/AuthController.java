package studybuddy.api.authentication;

import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * Interface for any authentication features
 *
 * <p>
 * Contains all the Authentication methods each user class must implement.
 * </p>
 *
 * @author William Delano
 * @version 1.1
 */
@RestController
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        if (userService.attemptLogin(username, password)) {
            return "Login successful";
        } else {
            return "Login failed";
        }
    }

    /**
     * creates the account of the user.
     *
     * @param userType  The type of the user.
     * @param password  The password of the user.
     * @param email     The email of the user.
     */
    public void createAccount(String email, String password, String userType) {
        UserService service = new UserService();

        //if a user with that email is found print error
        if ((service.findUserByEmail(email).isPresent()) ) {
            System.err.println("User exists already.");
        }
        else {
            //create the new user to be saved
            User newUser = new User(email, password, userType);

            service.saveUser(newUser);
        }
    }
}
