package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import studybuddy.api.meeting.Meeting;

import java.util.Date;
import java.util.Optional;


@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    //meeting needs id, title, description, location id, startTime(DATE), endTime(DATE), and userID

    @Query("SELECT m FROM Meeting m WHERE m.id = :SESSION_ID")
    Optional<Meeting> findById(@Param("SESSION_ID") Long id);

    @Query("SELECT m FROM Meeting m WHERE m.title = :TITLE")
    Optional<Meeting> findByTitle(@Param("TITLE") String title);

    @Query("SELECT m FROM Meeting m WHERE m.locID = :LOCATION_ID")
    Optional<Meeting> findByLocID(@Param("LOCATION_ID") Long id);

    @Query("SELECT m FROM Meeting m WHERE m.userID = :USER_ID")
    Optional<Meeting> findByUserID(@Param("USER_ID") Long id);

    @Query("SELECT m FROM Meeting m WHERE m.startTime = :START_TIME")
    Optional<Meeting> findByStartTime(@Param("START_TIME")Date time);

    @Query("SELECT m FROM Meeting m WHERE m.endTime = :END_TIME")
    Optional<Meeting> findByEndTime(@Param("END_TIME")Date time);

}
