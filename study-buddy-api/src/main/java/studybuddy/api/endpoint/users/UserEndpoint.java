package studybuddy.api.endpoint.users;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.course.Course;
import studybuddy.api.course.CourseService;
import studybuddy.api.friendships.FriendshipService;
import studybuddy.api.meeting.UserMeetingRepository;
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

    @Autowired
    private FriendshipService friendshipService;

    @Autowired
    private UserMeetingRepository userMeetingRepository;

    @GetMapping("/users")
    public List<User> findAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam(required = false) String name) {
        List<User> users = userService.findUsersByName(name);
        return ResponseEntity.ok(users);
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

        //delete all friends and associated meetings to avoid foreign key constraint issues
        //NOT DELETING MEETINGS THEMSELVES ONLY THE USER'S ASSOCIATION
        friendshipService.deleteAllFriendships(id);
        userMeetingRepository.deleteUserMeetings(id);

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
    public ResponseEntity<?> addCourseToUserMS2(@PathVariable Long userId, @RequestBody String courseName) {
        String parsedName;
        //parse the name from the given data
        try {
            // Create ObjectMapper instance
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse JSON string to JsonNode
            JsonNode jsonNode = objectMapper.readTree(courseName);

            // Extract value of "courseName" field
            parsedName = jsonNode.get("courseName").asText();
        } catch (Exception e) {
            // Handle exception
            e.printStackTrace();
            parsedName = "ERROR PARSING DATA";
        }

        //find the course
        Optional<Course> courseOpt = courseService.findCourseByName(parsedName);
        if (courseOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Course not found");
        }
        //find the user
        User user = userService.findUser(userId).orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (user.getCourses().contains(courseOpt.get())) {
            return ResponseEntity.badRequest().body("User is already enrolled in this class");
        }


        user.getCourses().add(courseOpt.get());
        userService.saveUser(user);
        return ResponseEntity.ok().body("Course added successfully");
    }

    @DeleteMapping("/users/{userId}/courses/{courseId}")
    public ResponseEntity<?> removeCourseFromUserMS2(@PathVariable Long userId, @PathVariable Long courseId) {
        userService.deleteCourseFromUser(userId, courseId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}/courses/")
    public ResponseEntity<Set<Course>> findAllUserCourses(@PathVariable Long userId) {

        Set<Course> courses = userService.getAllUserCourses(userId);
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/users/tutors")
    public ResponseEntity<List<User>> findAllTutors() {
        System.out.println("I AM IN HERE");
        List<User> users = userService.findAllTutors();
        return ResponseEntity.ok(users);
    }


    @GetMapping("/users/searchedTutors")
    public ResponseEntity<List<User>> findSearchedTutors(@RequestParam(required = true) String subjectName) {
        List<User> users = userService.findAllTutors();
        List<User> searched = new ArrayList<>();

        System.out.println("TUTOR SUBJECT IS: " + subjectName);

        if(subjectName.isEmpty()){
            System.out.println("TUTOR NAME IS: EMPTY");
            return ResponseEntity.ok(users);
        }
        else{
            boolean userExists;
            //algorithm to get specified tutors
            for (User u : users) {
                Set<Course> userCourses = u.getCourses();
                for (Course c : userCourses) {
                    userExists = searched.stream().anyMatch(user -> user.getId().equals(u.getId()));
                    if (c.getName().toLowerCase().contains(subjectName.toLowerCase()) && !userExists) {
                        searched.add(u);
                    }
                }
            }
        }
        return ResponseEntity.ok(searched);
    }


    @GetMapping("/tutors/{id}")
    public ResponseEntity<User> findTutorById(@PathVariable Long id) {
        System.out.println("GRABBING TUTOR WITH ID OF : "+ id);
        User user = userService.findTutor(id);

        return ResponseEntity.ok(user);
    }

}