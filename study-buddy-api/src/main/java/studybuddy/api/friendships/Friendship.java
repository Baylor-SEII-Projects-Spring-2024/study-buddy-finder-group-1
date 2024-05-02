package studybuddy.api.friendships;

import jakarta.persistence.*;
import lombok.Data;
import studybuddy.api.user.User;

@Data
@Entity
@Table(name = "FRIENDSHIPS")
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "requester_id", referencedColumnName = "USER_ID")
    private User requester;

    @ManyToOne
    @JoinColumn(name = "addressee_id", referencedColumnName = "USER_ID")
    private User requested;

    @Column(name = "status")
    private String status; // "pending", "accepted", "declined"

}
