package studybuddy.api.endpoint.courses;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.course.Course;
import studybuddy.api.course.CourseService;
import studybuddy.api.user.UserService;
import java.util.List;

@Log4j2
@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://34.125.60.1:3000")

public class CourseEndpoint {

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

    @GetMapping("/courses")
    public List<Course>  findAllCourses() { return courseService.findAllCourses(); }
}