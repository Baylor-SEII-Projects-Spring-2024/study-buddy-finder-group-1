package studybuddy.api.user;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.course.Course;
import studybuddy.api.friendships.FriendshipService;
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

    @Getter
    @Column(name = "USER_RATING")
    Double rating;

    @ManyToMany
    @JoinTable(
            name = "USER_COURSES",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();

    @ManyToMany(mappedBy = "users")
    //@JsonManagedReference
    private Set<Meeting> meetings = new HashSet<>();

    public User(String email, String password, String userType, Double initialRating) {
        this.email_address = email;
        this.password = password;
        this.userType = userType;
        if ("Tutor".equals(userType)) {
            this.rating = initialRating;
        }
    }

    public User(String firstName, String lastName, String email_address, String password, String userType) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email_address = email_address;
        this.password = password;
        this.userType = userType;
        rating=0.0;
    }

    public User() {
    }
    public void setRating(Double rating) {
        if ("Tutor".equalsIgnoreCase(this.userType)) {
            this.rating = rating;
        } else {
            throw new IllegalStateException("Rating can only be set for users of type Tutor.");
        }
    }

    public Double getRating() {
        if ("Tutor".equalsIgnoreCase(this.userType)) {
            return this.rating;
        }
        return null;
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

    public Set<User> isFriendOf(Set<User> meetingUsers) {
        FriendshipService friendshipService = new FriendshipService();
        List<User> friends = friendshipService.getAllFriends(this.id);

        Set<User> friendSet = new HashSet<>(friends);

        //loop through all the friends
        for (User u : friendSet) {
            //loop through all the users
            for (User q : meetingUsers) {
                //if a user matches a friend then they are a friend
                if (Objects.equals(u.id, q.id)) {
                    friendSet.add(u);
                }
            }
        }
        return friendSet;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        User other = (User) obj;
        return id != null && id.equals(other.id);
    }
}