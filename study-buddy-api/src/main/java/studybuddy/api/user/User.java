package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {
    public static final String TABLE_NAME = "USERS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "USER_ID")
    Long id;

    @Getter
    @Column(name = "FIRST_NAME")
    String firstName;

    @Getter
    @Column(name = "LAST_NAME")
    String lastName;

    @Getter
    @Column(name = "EMAIL_ADDRESS")
    String email_address;

    @Getter
    @Column(name = "PASSWORD")
    String password;

    @Getter
    @Column(name = "USER_TYPE")
    String userType;

    public User(String email, String password, String userType) {
        this.email_address = email;
        this.password = password;
        this.userType = userType;
    }

    public User() {
    }

    public void setEmailAddress(String emailAddress) {
        this.email_address = emailAddress;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
