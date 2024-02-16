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
    @Column(name = "EMAIL_ADDRESS")
    String emailAddress;

    @Getter
    @Column(name = "PASSWORD")
    String password;

    @Getter
    @Column(name = "USER_TYPE")
    String userType;

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
