package studybuddy.api.reviewtutor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import studybuddy.api.user.User;
import java.util.Date;
import java.util.List;

@Repository
public interface ReviewTutorRepository extends JpaRepository<ReviewTutor, Long> {

    // Find reviews by tutor
    @Query("SELECT r FROM ReviewTutor r WHERE r.tutor = :tutor")
    List<ReviewTutor> findByTutor(@Param("tutor") User tutor);

    // Find reviews by student
    @Query("SELECT r FROM ReviewTutor r WHERE r.student = :student")
    List<ReviewTutor> findByStudent(@Param("student") User student);

    // Find reviews by rating
    @Query("SELECT r FROM ReviewTutor r WHERE r.rating = :rating")
    List<ReviewTutor> findByRating(@Param("rating") int rating);

    // Find reviews within a specific date range
    @Query("SELECT r FROM ReviewTutor r WHERE r.reviewDate BETWEEN :startDate AND :endDate")
    List<ReviewTutor> findByReviewDateBetween(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}