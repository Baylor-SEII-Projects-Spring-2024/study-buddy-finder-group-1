package studybuddy.api.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingRepository;

import javax.swing.text.html.Option;
import java.util.*;

@Service

public class MeetingService {
    @Autowired
    public MeetingRepository meetingRepository;

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public List<Meeting> getUserMeetings(String email) {
        return meetingRepository.findAllByUserEmail(email);
    }

    public Optional<Meeting> getUserMeeting(String email){
        return meetingRepository.findMeetingByUserEmail(email);
    }

    public Optional<Meeting> getMeetingById(Long id) {
        return  meetingRepository.findById(id);
    }
    public void saveMeeting(Meeting m){
        meetingRepository.save(m);
    }

    public void deleteMeeting(Long meetingId){
        meetingRepository.deleteById(meetingId);
    }


}
