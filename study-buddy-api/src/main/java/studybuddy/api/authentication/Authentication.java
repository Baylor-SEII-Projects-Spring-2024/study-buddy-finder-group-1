package studybuddy.api.authentication;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

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
     * @param username  The username of the user.
     * @param password  The password of the user.
     * @param firstName The first name of the user.
     * @param lastName  The last name of the user.
     * @param email     The email of the user.
     */
    public void createAccount(String username, String password, String firstName, String lastName, String email) {

    }

    /**
     * operation to validate login information from input
     *
     * @param username The given username for potential user account.
     * @param password The given password for potential user account.
     */
    public boolean login(String username, String password) {
        return true;
    }
}
