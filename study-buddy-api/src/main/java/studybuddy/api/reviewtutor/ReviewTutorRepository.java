package studybuddy.api.reviewtutor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studybuddy.api.user.User;

import java.util.List;

@Repository
public interface ReviewTutorRepository extends JpaRepository<ReviewTutor, Long> {

    List<ReviewTutor> findByTutor(User tutor);
}