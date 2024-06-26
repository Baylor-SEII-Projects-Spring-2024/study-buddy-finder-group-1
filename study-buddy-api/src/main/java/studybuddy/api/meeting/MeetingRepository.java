package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    //meeting needs id, title, description, location id, startTime(DATE), endTime(DATE), and userID

    @Query("SELECT m FROM Meeting m JOIN m.users u WHERE u.id = :userId")
    List<Meeting> findMeetingsByUserId(@Param("userId") Long userId);

    @Query("SELECT m FROM Meeting m WHERE m.courseName = :course")
    List<Meeting> findByCourseName(String course);
}