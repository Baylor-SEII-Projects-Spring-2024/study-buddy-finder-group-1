package studybuddy.api.reviewtutor;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
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
    private int rating;

    public ReviewTutor(User tutor, int rating) {
        this.tutor = tutor;
        this.rating = rating;
    }

    public ReviewTutor(User tutor, int rating, Date reviewDate) {
    }
}
