package studybuddy.api.reviewtutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;
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

    public double calculateAverageRating(User tutor) {
        List<ReviewTutor> reviews = reviewTutorRepository.findByTutor(tutor);
        OptionalDouble average = reviews.stream()
                .mapToDouble(ReviewTutor::getRating)
                .average();
        return average.isPresent() ? average.getAsDouble() : 0.0;
    }

    public boolean checkReviewExists(Long tutorId, Long meetingId, Long studentId) {
        return reviewTutorRepository.existsByTutorIdAndMeetingIdAndStudentId(tutorId, meetingId, studentId);
    }
}