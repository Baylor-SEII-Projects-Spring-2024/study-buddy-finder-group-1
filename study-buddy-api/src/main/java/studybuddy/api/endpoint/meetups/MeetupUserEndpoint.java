package studybuddy.api.endpoint.meetups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.MeetingUser;
import studybuddy.api.meeting.MeetingUserService;

@RestController
@RequestMapping("/meetingUsers") // Base path for MeetingUser-related endpoints
public class MeetupUserEndpoint {

    @Autowired
    private MeetingUserService meetingUserService;

    @PostMapping("/add")
    public ResponseEntity<MeetingUser> addMeetingUser(@RequestBody MeetingUser newMeetingUser) {
        MeetingUser createdMeetingUser = meetingUserService.saveMeetingUser(newMeetingUser);
        return ResponseEntity.ok(createdMeetingUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeMeetingUser(@PathVariable Long id) {
        meetingUserService.deleteMeetingUser(id);
        return ResponseEntity.ok().build();
    }

}
