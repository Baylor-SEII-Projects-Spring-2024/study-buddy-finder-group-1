package studybuddy.api.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.course.Course;
import studybuddy.api.course.CourseRepository;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    public Optional<User> findUser(Long userId) { return userRepository.findById(userId); }

    public Optional<User> findUserByEmail(String email) { return userRepository.findByEmail_Address(email); }

    public boolean attemptLogin(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail_AddressAndPassword(email, password);
        if (userOptional.isPresent()) {
            // Update last login timestamp
            User user = userOptional.get();
            user.setLastLogin(new Date());
            userRepository.save(user);
        }
        return userOptional.isPresent();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public void changePassword(Long userId, String newPassword) {
        Optional<User> optionalUser = findUser(userId);

        optionalUser.ifPresent(user -> {
            user.setPassword(newPassword);
            userRepository.save(user);
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

    public Set<Course> getAllUserCourses (Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getCourses();
        } else {
            throw new EntityNotFoundException("User not found");
        }
    }
}