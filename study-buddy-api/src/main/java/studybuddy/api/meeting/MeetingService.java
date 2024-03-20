package studybuddy.api.meeting;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.*;

@Service

public class MeetingService {
    @Autowired
    public MeetingRepository meetingRepository;

    @Autowired
    public UserRepository userRepository;

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }


    public Optional<Meeting> getMeetingById(Long id) {
        return  meetingRepository.findById(id);
    }

    public Meeting saveMeeting(Meeting meeting){
        return meetingRepository.save(meeting);
    }

    public void deleteMeeting(Long meetingId){
        meetingRepository.deleteById(meetingId);
    }

    public List<Meeting> getMeetingsByUserId(Long userId) {
        return meetingRepository.findMeetingsByUserId(userId);
    }

}
