package studybuddy.api.setup;

import studybuddy.api.course.Course;
import studybuddy.api.course.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CourseRepository courseRepository;


    @Autowired
    public DataInitializer(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // check if data is already loaded to avoid duplication
        if (courseRepository.count() == 0) {
            courseRepository.save(new Course("Introduction to Programming", "Learn the basics of programming", 4, "Computer Science"));
            courseRepository.save(new Course("Advanced Mathematics", "Dive deep into calculus and algebra", 4, "Mathematics"));
            courseRepository.save(new Course("Calculus I", "Introduction to differential calculus", 4, "Mathematics"));
            courseRepository.save(new Course("Calculus II", "Continuation of Calculus I, introduction to integral calculus", 4, "Mathematics"));
            courseRepository.save(new Course("Statistics and Probability", "Foundations of statistics and probability theory", 3, "Mathematics"));
            courseRepository.save(new Course("Linear Algebra", "Introduction to vector spaces, linear mappings, and matrices", 4, "Mathematics"));
            courseRepository.save(new Course("Biology", "Comprehensive overview of biological principles and processes", 4, "Biology"));
            courseRepository.save(new Course("Chemistry", "Fundamental concepts in general chemistry", 4, "Chemistry"));
            courseRepository.save(new Course("Physics", "Principles of mechanics, thermodynamics, and electromagnetism", 4, "Physics"));
            courseRepository.save(new Course("Introduction to Sociology", "Exploration of societal structures, dynamics, and institutions", 3, "Sociology"));
            courseRepository.save(new Course("World Literature", "Study of significant literary works from around the world", 3, "Literature"));
            courseRepository.save(new Course("American Government", "Overview of the American political system and its historical development", 3, "Political Science"));
            courseRepository.save(new Course("Introduction to Philosophy", "Examination of major philosophical questions and theories", 3, "Philosophy"));
            courseRepository.save(new Course("Principles of Accounting", "Basics of financial and managerial accounting", 4, "Business"));
            courseRepository.save(new Course("Microbiology", "Study of microorganisms and their effects on humans", 4, "Biology"));
            courseRepository.save(new Course("Organizational Behavior", "Analysis of human behavior in organizational settings", 3, "Psychology"));
            courseRepository.save(new Course("Introduction to Art History", "Survey of major developments in art history", 3, "Art & Design"));
        }


    }
}
