package studybuddy.api.user;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.encryption.PasswordHash;
import studybuddy.api.course.Course;
import studybuddy.api.course.CourseRepository;
import studybuddy.api.friendships.Friendship;
import studybuddy.api.friendships.FriendshipRepository;
import studybuddy.api.reviewtutor.ReviewTutor;
import studybuddy.api.reviewtutor.ReviewTutorRepository;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private FriendshipRepository friendshipRepository;
    @Autowired
    private ReviewTutorRepository reviewTutorRepository;

    public Optional<User> findUser(Long userId) { return userRepository.findById(userId); }
    public User findTutor(Long userId) {
        Optional<User> t = userRepository.findById(userId);

        if (t.isPresent()) {
            return t.get();
        } else {
            return null;
        }
    }


    public Optional<User> findUserByEmail(String email) { return userRepository.findByEmail_Address(email); }

    public List<User> findUsersByName(String name) {
        return userRepository.searchByFirstNameOrLastNameContainingIgnoreCase(name);
    }

    public boolean attemptLogin(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail_Address(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            try {
                String hashedPassword = PasswordHash.hashPassword(password);
                if (hashedPassword.equals(user.getPassword())) {
                    // Update last login timestamp
                    user.setLastLogin(new Date());
                    userRepository.save(user);
                    return true;
                }
            } catch (NoSuchAlgorithmException e) {
                log.error("Password hashing failed during login", e);
                throw new RuntimeException("Password hashing failed during login", e);
            }
        }
        return false;
    }

    public User saveUser(User user) {
        try {
            String hashedPassword = PasswordHash.hashPassword(user.getPassword());
            user.setPassword(hashedPassword);
            return userRepository.save(user);
        } catch (NoSuchAlgorithmException e) {
            log.error("Password hashing failed", e);
            // Handle the exception, rethrow as a runtime exception
            throw new RuntimeException("Password hashing failed", e);
        }
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public void changePassword(Long userId, String newPassword) {
        Optional<User> optionalUser = findUser(userId);
        optionalUser.ifPresent(user -> {
            try {
                String hashedPassword = PasswordHash.hashPassword(newPassword);
                user.setPassword(hashedPassword);
                userRepository.save(user);
            } catch (NoSuchAlgorithmException e) {
                log.error("Password hashing failed during password change", e);
                throw new RuntimeException("Password hashing failed during password change", e);
            }
        });
    }

    public void deleteUser(Long userId) { userRepository.deleteById(userId); }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // add courses to user
    public User addCourseToUser(Long userId, Long courseId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new EntityNotFoundException("Course not found"));

        user.getCourses().add(course);
        userRepository.save(user);

        return user;
    }

    //delete course from user
    public User deleteCourseFromUser(Long userId, Long courseId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new EntityNotFoundException("Course not found"));

        user.getCourses().remove(course);
        userRepository.save(user);

        return user;
    }


    public Set<Course> getAllUserCourses (Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getCourses();
        } else {
            throw new EntityNotFoundException("User not found");
        }
    }

    public List<User> findAllTutors() {
        return userRepository.findAllTutors();
    }

    public boolean areUsersFriends(Long userId, Long otherUserId) {
        List<Friendship> friendships = friendshipRepository.findAllByUserIdAndStatusAccepted(userId);

        // Check if any of these friendships involve the other user
        return friendships.stream()
                .anyMatch(friendship ->
                        (friendship.getRequester().getId().equals(otherUserId) || friendship.getRequested().getId().equals(otherUserId)));
    }

    @Transactional
    public User rateTutor(Long userId, Double newRating, Long meetingId, Long studentId) {
        if (newRating < 0) {
            throw new IllegalArgumentException("Rating must not be negative.");
        }

        User tutor = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + userId + " not found."));

        if (!"Tutor".equals(tutor.getUserType())) {
            throw new IllegalArgumentException("Rating can only be set for users of type Tutor.");
        }

        //make a new review object
        ReviewTutor newReview = new ReviewTutor(tutor, newRating, meetingId, studentId);

        // Fetch all reviews for the tutor and calculate the new average rating
        List<ReviewTutor> reviews = reviewTutorRepository.findByTutorId(tutor.id);

        double averageRating = reviews.stream()
                .mapToDouble(ReviewTutor::getRating)
                .average()
                .orElse(0.0);  // Handle case where no ratings exist yet

        double updatedAverageRating = (averageRating * reviews.size() + newRating) / (reviews.size() + 1);

        //save new review and tutor rating
        tutor.setRating(updatedAverageRating);
        reviewTutorRepository.save(newReview);
        userRepository.save(tutor);

        return tutor;
    }
}