package studybuddy.api.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    public Optional<Course> findCourse(Long courseId) { return courseRepository.findById(courseId); }

    public Optional<Course> findCourseByName(String name) {
        Optional<Course> courses = courseRepository.findByCourseName(name).stream().findFirst();

        if (courses.isPresent()) {
            courses.toString();
            System.err.println("Present");
        }
        else {
            System.err.println("NOT PRESENT");
        }

        return courseRepository.findByCourseName(name).stream().findFirst();
    }

    public List<Course> findCourseByDescription(String description) { return courseRepository.findByCourseDescriptionLike(description); }

    public List<Course> findCourseByCredits(int credits) { return courseRepository.findByCourseCredits(credits); }

    public List<Course> findCourseByAreaOfStudy(String areaOfStudy) { return courseRepository.findByCourseAreaOfStudy(areaOfStudy); }

    public List<Course> findAllCourses() { return courseRepository.findAll(); }

    public Course saveCourse(Course course) { return courseRepository.save(course); }

    public void deleteCourseById(Long id) { courseRepository.deleteById(id); }
}