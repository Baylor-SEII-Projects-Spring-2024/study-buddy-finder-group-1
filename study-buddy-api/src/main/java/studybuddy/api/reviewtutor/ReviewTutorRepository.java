package studybuddy.api.reviewtutor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import studybuddy.api.user.User;

import java.util.List;

@Repository
public interface ReviewTutorRepository extends JpaRepository<ReviewTutor, Long> {

    List<ReviewTutor> findByTutor(User tutor);

    @Query("SELECT r FROM ReviewTutor r WHERE r.tutor.id = :id")
    List<ReviewTutor> findByTutorId(Long id);
}