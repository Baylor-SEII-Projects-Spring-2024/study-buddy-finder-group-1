package studybuddy.api.meeting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingRepository;
import java.util.*;

@Service

public class MeetingService {
    @Autowired
    public MeetingRepository meetingRepository;

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public void addMeeting(Meeting m){
        meetingRepository.save(m);
    }


}
