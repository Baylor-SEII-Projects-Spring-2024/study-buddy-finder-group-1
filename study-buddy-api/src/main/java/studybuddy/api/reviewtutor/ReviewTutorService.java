package studybuddy.api.reviewtutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.Date;
import java.util.List;
import java.util.OptionalDouble;

@Service
public class ReviewTutorService {

    private final ReviewTutorRepository reviewTutorRepository;
    private final UserRepository userRepository;


    @Autowired
    public ReviewTutorService(ReviewTutorRepository reviewTutorRepository, UserRepository userRepository) {
        this.reviewTutorRepository = reviewTutorRepository;
        this.userRepository = userRepository;
    }

    /*@Transactional
    public ReviewTutor addReview(User tutor, Double rating) {
        ReviewTutor review = new ReviewTutor(tutor, rating);
        reviewTutorRepository.save(review);

        // Recalculate and update the tutor's average rating
        double newAverageRating = calculateAverageRating(tutor);
        tutor.setRating(newAverageRating);
        userRepository.save(tutor); // Assuming userRepository is correctly autowired and set up

        return review;
    }*/

    public double calculateAverageRating(User tutor) {
        List<ReviewTutor> reviews = reviewTutorRepository.findByTutor(tutor);
        OptionalDouble average = reviews.stream()
                .mapToDouble(ReviewTutor::getRating)
                .average();
        return average.isPresent() ? average.getAsDouble() : 0.0;
    }
}
