package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;


@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    //meeting needs id, title, description, location id, startTime(DATE), endTime(DATE), and userID


    @Query("SELECT m FROM Meeting m WHERE m.userId = :USER_ID")
    Optional<Meeting> findMeetingByUserId(@Param("USER_ID") Long userId);



}

