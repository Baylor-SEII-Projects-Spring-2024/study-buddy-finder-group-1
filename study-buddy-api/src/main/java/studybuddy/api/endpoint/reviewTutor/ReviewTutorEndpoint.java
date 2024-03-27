package studybuddy.api.endpoint.reviewTutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.reviewtutor.ReviewTutor;
import studybuddy.api.reviewtutor.ReviewTutorService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewTutorEndpoint {

    private final ReviewTutorService reviewTutorService;

    @Autowired
    public ReviewTutorEndpoint(ReviewTutorService reviewTutorService) {
        this.reviewTutorService = reviewTutorService;
    }

    @PostMapping
    public ResponseEntity<ReviewTutor> submitReview(@RequestBody ReviewTutor review) {
        try {
            ReviewTutor savedReview = reviewTutorService.addReview(review);
            return new ResponseEntity<>(savedReview, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}