package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Data;
import studybuddy.api.user.User;

@Data
@Entity
@Table(name = "MEETUP_USERS")
public class MeetingUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "meetup_id", referencedColumnName = "SESSION_ID")
    private Meeting meeting;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "USER_ID")
    private User user;

    @Column(name = "role")
    private String role;
}