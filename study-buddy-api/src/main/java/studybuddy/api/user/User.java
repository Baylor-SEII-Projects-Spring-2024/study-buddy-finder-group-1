package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.course.Course;
import studybuddy.api.meeting.*;

import java.util.*;

@Data
@Entity
@Table(name = User.TABLE_NAME)
public class User {

    public static final String TABLE_NAME = "USERS";

    private Date lastLogin;

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

    @ManyToMany
    @JoinTable(
            name = "USER_COURSES",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MeetingUser> meetings = new HashSet<>();

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

    public Date getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Date lastLogin) {
        this.lastLogin = lastLogin;
    }

    public String getEmail() { return email_address;}

}
