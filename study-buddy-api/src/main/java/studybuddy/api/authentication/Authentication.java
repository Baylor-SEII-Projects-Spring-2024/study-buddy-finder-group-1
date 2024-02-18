package studybuddy.api.authentication;

import jakarta.persistence.*;
import jdk.jshell.spi.ExecutionControl;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;
import studybuddy.api.user.UserService;

import java.util.Objects;

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
public class Authentication {

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

    /**
     * operation to validate login information from input
     *
     * @param email The given username for potential user account.
     * @param password The given password for potential user account.
     */
    public boolean login(String email, String password) {
        UserService service = new UserService();

        return service.attemptLogin(email, password);
    }
}
