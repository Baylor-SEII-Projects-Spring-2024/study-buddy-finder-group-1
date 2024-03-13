package studybuddy.api.endpoint;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.course.Course;
import studybuddy.api.course.CourseService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.*;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserEndpoint {

    @Autowired
    private UserService userService;

    @Autowired
    private CourseService courseService;

    @GetMapping("/users")
    public List<User> findAllUsers() {
        System.err.println("HRRYR");
        return userService.findAllUsers();
    }

    @GetMapping("/users/{id}")
    public User findUserById(@PathVariable Long id) {
        var user = userService.findUser(id).orElse(null);

        if (user == null) {
            log.warn("User not found");
        }

        return user;
    }

    @PutMapping("/changePassword/{id}")
    public void changePassword(@PathVariable Long id, @RequestParam String newPassword) {
        userService.changePassword(id, newPassword);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserById(@PathVariable Long id) {
        var user = userService.findUser(id).orElse(null);

        if (user == null) {
            log.warn("User not found");
            return;
        }

        userService.deleteUser(id);
    }

    @GetMapping("/users/{id}/login-info") // New endpoint for retrieving user login info for profile page
    public ResponseEntity<Map<String, Object>> getUserLoginInfo(@PathVariable Long id) {

        // Retrieve user login info based on user ID
        User user = userService.findUser(id).orElse(null);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Create a map to hold the login info
        Map<String, Object> loginInfo = new HashMap<>();
        loginInfo.put("lastLogin", user.getLastLogin());

        // Return the login info in the response
        return ResponseEntity.ok(loginInfo);
    }

    @PutMapping("/users/{userId}/courses/{courseId}")
    public ResponseEntity<?> addCourseToUser(@PathVariable Long userId, @PathVariable Long courseId) {
        User updatedUser = userService.addCourseToUser(userId, courseId);
        return ResponseEntity.ok(updatedUser);
    }

    // --------- Saving courses to the user account [Temporarily-MS2] ---------
    @PostMapping("/users/{userId}/addCourse")
    public ResponseEntity<?> addCourseToUserMS2(@PathVariable Long userId, @RequestBody Map<String, String> courseDetails) {
        String courseName = courseDetails.get("courseName");
        User user = userService.findUser(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Course newCourse = new Course();
        newCourse.setName(courseName);
        courseService.saveCourse(newCourse);
        user.getCourses().add(newCourse);
        userService.saveUser(user);
        return ResponseEntity.ok().body("Course added successfully");
    }

    @GetMapping("/users/{userId}/courses/")
    public Set<Course> findAllUserCourses(@PathVariable Long userId) {
        return userService.getAllUserCourses(userId);
    }
}