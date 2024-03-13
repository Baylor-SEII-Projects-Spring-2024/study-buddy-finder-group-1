package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.*;


@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {




    @Query("SELECT m FROM Meeting m WHERE m.userEmail = :USER_EMAIL")
    Optional<Meeting> findMeetingByUserEmail(@Param("USER_EMAIL") String userEmail);

    @Query("SELECT m FROM Meeting m WHERE m.userEmail = :USER_EMAIL")
    List<Meeting> findAllByUserEmail(@Param("USER_EMAIL") String userEmail);


}

