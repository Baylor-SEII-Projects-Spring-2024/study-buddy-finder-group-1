package studybuddy.api.endpoint.reviewTutor;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.reviewtutor.ReviewTutorService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;

@Log4j2
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://34.16.179.242:3000")
@RestController
@RequestMapping("/review")
public class ReviewTutorEndpoint {

    @Autowired
    private final ReviewTutorService reviewTutorService;
    @Autowired
    private final UserService userService;

    public ReviewTutorEndpoint(ReviewTutorService reviewTutorService, UserService userService) {
        this.reviewTutorService = reviewTutorService;
        this.userService = userService;
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> rateTutor(@PathVariable Long id, @RequestParam Double rating, @RequestParam Long meetingId, @RequestParam Long studentId) {
        try {
            // Call the rateTutor method in UserService which returns the updated tutor
            // Using the User's rating instead of the reviewTutor rating
            User updatedTutor = userService.rateTutor(id, rating, meetingId, studentId);
            return ResponseEntity.ok(updatedTutor);

        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @GetMapping("/check-review")
    public ResponseEntity<?> checkReviewExists(@RequestParam Long tutorId, @RequestParam Long meetingId, @RequestParam Long studentId) {
        boolean reviewExists = reviewTutorService.checkReviewExists(tutorId, meetingId, studentId);
        return ResponseEntity.ok(reviewExists);
    }
}