package studybuddy.api.reviewtutor;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.user.User;

import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@Table(name = "TUTOR_REVIEWS")
public class ReviewTutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TUTOR_ID", nullable = false)
    private User tutor;

    @Column(nullable = false)
    private Double rating;

    @Getter
    @Column(name = "MEETING_ID")
    private Long meetingId;

    @Getter
    @Column(name = "STUDENT_ID")
    private Long studentId;


    public ReviewTutor(User tutor, Double rating, Long meetingId, Long studentId) {
        this.tutor = tutor;
        this.rating = rating;
        this.meetingId = meetingId;
        this.studentId = studentId;
    }

    public ReviewTutor(User tutor, int rating, Date reviewDate) {
    }
}
