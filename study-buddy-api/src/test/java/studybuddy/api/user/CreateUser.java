package studybuddy.api.user;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("testdb")  // make these tests use the H2 in-memory DB instead of your actual DB
@Transactional
public class CreateUser {

    @Autowired
    private UserService userService;
    @BeforeEach
    void initUser(){

    }

    @Test
    void testUserCreate() {

        String testEmail = "someone@email.edu";
        String firstName = "first";
        String lastName = "last";

        String userType = "Student";
        String password = "password";

        User user1 = new User(testEmail,password, userType);


        user1.setFirstName(firstName);


    }

    @Test
    void testUserCreateAndAddToDatabase() {

        String testEmail = "someone@email.edu";
        String firstName = "first";
        String lastName = "last";

        String userType = "Student";
        String password = "password";

        User user1 = new User(testEmail,password, userType);


        user1.setFirstName(firstName);


    }

}
