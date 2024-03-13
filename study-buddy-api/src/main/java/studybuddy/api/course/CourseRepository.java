package studybuddy.api.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    // find courses by name
    @Query("SELECT c FROM Course c WHERE c.name = :name")
    Optional<Course> findByCourseName(@Param("name") String name);

    // find courses by credits
    @Query("SELECT c FROM Course c WHERE c.credits = :credits")
    List<Course> findByCourseCredits(@Param("credits") int credits);

    // find courses by description
    @Query("SELECT c FROM Course c WHERE c.description LIKE %:description%")
    List<Course> findByCourseDescriptionLike(@Param("description") String description);

    // find courses by area of study
    @Query("SELECT c FROM Course c WHERE c.areaOfStudy = :areaOfStudy")
    List<Course> findByCourseAreaOfStudy(@Param("areaOfStudy") String areaOfStudy);
}
