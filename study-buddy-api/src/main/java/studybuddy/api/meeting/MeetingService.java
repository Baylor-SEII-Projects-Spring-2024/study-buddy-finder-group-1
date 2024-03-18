package studybuddy.api.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service

public class MeetingService {
    @Autowired
    public MeetingRepository meetingRepository;

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }


    public Optional<Meeting> getMeetingById(Long id) {
        return  meetingRepository.findById(id);
    }
    public Meeting saveMeeting(Meeting m){
        meetingRepository.save(m);
        return m;
    }

    public void deleteMeeting(Long meetingId){
        meetingRepository.deleteById(meetingId);
    }


}
