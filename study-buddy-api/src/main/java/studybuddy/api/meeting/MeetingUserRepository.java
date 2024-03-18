package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingUserRepository extends JpaRepository<MeetingUser, Long> {

}