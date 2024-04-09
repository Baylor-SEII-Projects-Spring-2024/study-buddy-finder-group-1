package studybuddy.api.meeting;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.*;
import java.util.stream.Collectors;

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

    //For review tutor use case
    public List<User> getTutorsByMeetingId(Long meetingId) {
        Optional<Meeting> meetingOptional = meetingRepository.findById(meetingId);

        if (meetingOptional.isPresent()) {
            Meeting meeting = meetingOptional.get();
            return meeting.getUsers().stream()
                    .filter(user -> "tutor".equals(user.getUserType())) // "tutor" is the userType for tutors!!!
                    .collect(Collectors.toList());
        } else {
            // If no meeting is found, return an empty list
            return Collections.emptyList();
        }
    }

    public List<Meeting> getMeetingsByUserId(Long userId) {
        return meetingRepository.findMeetingsByUserId(userId);
    }
}
