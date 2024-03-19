package studybuddy.api.reviewtutor;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.user.User;
import studybuddy.api.meeting.Meeting;

import java.util.Date;

@Data
@Entity
@Table(name = ReviewTutor.TABLE_NAME)
public class ReviewTutor {

    public static final String TABLE_NAME = "TUTOR_REVIEWS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "REVIEW_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "TUTOR_ID", nullable = false)
    private User tutor;

    @ManyToOne
    @JoinColumn(name = "STUDENT_ID", nullable = false)
    private User student;

    @Getter
    @Column(name = "RATING")
    private int rating;

    @Getter
    @Column(name = "COMMENT", length = 1024)
    private String comment;

    @Getter
    @Column(name = "REVIEW_DATE")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reviewDate;

    @ManyToOne
    @JoinColumn(name = "MEETING_ID", nullable = true) // Make nullable=true if the review might not be linked to a meeting
    private Meeting meeting;

    // Constructors and getters with additional meeting field
    public ReviewTutor(User tutor, User student, int rating, String comment, Date reviewDate, Meeting meeting) {
        this.tutor = tutor;
        this.student = student;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
        this.meeting = meeting;
    }

    public ReviewTutor() {
    }

    // Additional setter for the meeting field
    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }
}