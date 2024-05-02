package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import studybuddy.api.user.User;

@Entity
@Table(name = "meeting_invitations")
@Getter @Setter
public class MeetingInvitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "meeting_id", nullable = false)
    private Meeting meeting;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User invitee;

    @Column(name = "status")
    private String status; // "pending", "accepted", "declined"
}