package studybuddy.api.endpoint.meetups;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingService;

import java.util.List;
import java.util.Optional;

@Log4j2
@RestController
@RequestMapping("/meetings") // Added a base path for meeting-related endpoints
@CrossOrigin(origins = "http://localhost:3000")
public class MeetupEndpoint {

    @Autowired
    private MeetingService meetingService;

    @PostMapping("/create")
    public ResponseEntity<Meeting> createMeetup(@RequestBody Meeting newMeeting) {
        Meeting createdMeeting = meetingService.saveMeeting(newMeeting);
        return ResponseEntity.ok(createdMeeting);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        List<Meeting> meetings = meetingService.getAllMeetings();
        return ResponseEntity.ok(meetings);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable Long id) {
        return meetingService.getMeetingById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Optional<List<Meeting>>> getMeetingsByUserId(@PathVariable Long userId) {
        Optional<List<Meeting>> meetings = meetingService.getMeetingsByUserId(userId);
        if (meetings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(meetings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meeting> updateMeeting(@PathVariable Long id, @RequestBody Meeting meetingDetails) {
        return meetingService.getMeetingById(id).map(existingMeeting -> {
            // update the existing meeting with new details
            existingMeeting.setLocation(meetingDetails.getLocation());
            existingMeeting.setDate(meetingDetails.getDate());
            existingMeeting.setTimeSlot(meetingDetails.getTimeSlot());

            Meeting updatedMeeting = meetingService.saveMeeting(existingMeeting);
            return ResponseEntity.ok(updatedMeeting);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.ok().build();
    }
}
