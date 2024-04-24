package studybuddy.api.endpoint.reviewTutor;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.reviewtutor.ReviewTutor;
import studybuddy.api.reviewtutor.ReviewTutorService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewTutorEndpoint {

    @Autowired
    private final ReviewTutorService reviewTutorService;
    @Autowired
    private final UserService userService;

    public ReviewTutorEndpoint(ReviewTutorService reviewTutorService, UserService userService) {
        this.reviewTutorService = reviewTutorService;
        this.userService = userService;
    }

    @PostMapping("/rate-tutor")
    public ResponseEntity<?> rateTutor(@RequestParam Long userId, @RequestParam Double rating) {
        try {
            User tutor = userService.findUser(userId).orElseThrow(() -> new EntityNotFoundException("Tutor not found"));
            ReviewTutor review = reviewTutorService.addReview(tutor, rating.intValue());
            return ResponseEntity.ok(review);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
}
