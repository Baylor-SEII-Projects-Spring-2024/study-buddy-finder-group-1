package studybuddy.api.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserMeetingRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserMeetingRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Boolean userMeetingRelationshipExists(Long userId, Long meetingId) {
        String sql = "SELECT COUNT(*) FROM user_meetings WHERE user_id = ? AND meeting_id = ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, userId, meetingId);

        return count > 0;
    }

    public void createNewRelationship(Long userId, Long meetingId) {

    }

    public void deleteUserMeetings(Long id) {
        String sql = "DELETE FROM user_meetings WHERE user_id = ?";
        jdbcTemplate.update(sql, id);
    }
}