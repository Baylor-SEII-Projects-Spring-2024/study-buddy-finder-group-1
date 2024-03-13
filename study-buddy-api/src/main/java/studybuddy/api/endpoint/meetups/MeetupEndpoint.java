package studybuddy.api.endpoint.meetups;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationService;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingService;

import java.util.*;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MeetupEndpoint {
    @Autowired
    private MeetingService meetingService;

    @PostMapping("/createMeetup")
    public ResponseEntity<String> createMeetup(@RequestBody Meeting newMeeting) {
        System.err.println(newMeeting.toString());
        meetingService.saveMeeting(newMeeting);

        return ResponseEntity.ok("Meeting created.");
    }
}
