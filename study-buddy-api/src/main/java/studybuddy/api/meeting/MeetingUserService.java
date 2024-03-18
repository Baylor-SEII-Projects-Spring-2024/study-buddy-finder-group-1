package studybuddy.api.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MeetingUserService {

    private final MeetingUserRepository meetingUserRepository;

    @Autowired
    public MeetingUserService(MeetingUserRepository meetingUserRepository) {
        this.meetingUserRepository = meetingUserRepository;
    }

    public List<MeetingUser> findAllMeetingUsers() {
        return meetingUserRepository.findAll();
    }

    public Optional<MeetingUser> findMeetingUserById(Long id) {
        return meetingUserRepository.findById(id);
    }

    public MeetingUser saveMeetingUser(MeetingUser meetingUser) {
        return meetingUserRepository.save(meetingUser);
    }

    public void deleteMeetingUser(Long id) {
        meetingUserRepository.deleteById(id);
    }

    // additional methods, such as finding all users for a meeting or all meetings for a user, can be added
}
