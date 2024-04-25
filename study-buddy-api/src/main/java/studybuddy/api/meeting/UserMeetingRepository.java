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

    public void deleteUserMeetings(Long id) {
        String sql = "DELETE FROM user_meetings WHERE user_id = ?";
        jdbcTemplate.update(sql, id);
    }
}