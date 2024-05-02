package studybuddy.api.endpoint.recommendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.MeetingService;
import studybuddy.api.recommendation.RecommendationService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import studybuddy.api.course.CourseService;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationEndpoint {

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private MeetingService meetingService;

    // endpoint for getting recommended friends for a user
    @GetMapping("/friends")
    public ResponseEntity<Set<User>> getRecommendedFriends(@RequestParam Long userId) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Set<User> allUsers = new HashSet<>(userService.findAllUsers());
        Set<User> recommendedFriends = recommendationService.getRecommendedFriends(user, allUsers);
        return ResponseEntity.ok(recommendedFriends);
    }

    // endpoint for getting recommended tutors for a user
    @GetMapping("/tutors")
    public ResponseEntity<Set<User>> getRecommendedTutors(@RequestParam Long userId) {
        User user = userService.getUserById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Set<User> allTutors = new HashSet<>(userService.findAllTutors());
        Set<User> recommendedTutors = recommendationService.getRecommendedTutors(user, allTutors);
        return ResponseEntity.ok(recommendedTutors);
    }
}