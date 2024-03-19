package studybuddy.api.reviewtutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studybuddy.api.user.User;
import java.util.Date;
import java.util.List;

@Service
public class ReviewTutorService {

    private final ReviewTutorRepository reviewTutorRepository;

    @Autowired
    public ReviewTutorService(ReviewTutorRepository reviewTutorRepository) {
        this.reviewTutorRepository = reviewTutorRepository;
    }

    @Transactional
    public ReviewTutor addReview(ReviewTutor review) {
        return reviewTutorRepository.save(review);
    }

    public List<ReviewTutor> findReviewsByTutor(User tutor) {
        return reviewTutorRepository.findByTutor(tutor);
    }

    public List<ReviewTutor> findReviewsByStudent(User student) {
        return reviewTutorRepository.findByStudent(student);
    }

    public List<ReviewTutor> findReviewsByRating(int rating) {
        return reviewTutorRepository.findByRating(rating);
    }

    public List<ReviewTutor> findReviewsInDateRange(Date startDate, Date endDate) {
        return reviewTutorRepository.findByReviewDateBetween(startDate, endDate);
    }
}