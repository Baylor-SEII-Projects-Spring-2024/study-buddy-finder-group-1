package studybuddy.api.endpoint.meetups;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;
import java.util.*;

@Log4j2
@RestController
@RequestMapping("/meetings") // Added a base path for meeting-related endpoints
@CrossOrigin(origins = "http://localhost:3000")
public class MeetupEndpoint {

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    @PostMapping("/create")
    public ResponseEntity<Meeting> createMeetup(@RequestBody Map<String, Object> payload) {
        Long userId = Long.parseLong(payload.get("userId").toString());
        Long locationId = Long.parseLong(payload.get("locationId").toString()); // Assuming locationId is sent in payload

        User userCreatingMeeting = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + userId));

        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found: " + locationId));

        Meeting newMeeting = new Meeting();
        newMeeting.setLocation(location);

        String room = String.valueOf(payload.get("room"));
        String date = String.valueOf(payload.get("date"));
        String timeSlot = String.valueOf(payload.get("timeSlot"));

        newMeeting.setRoom(room);
        newMeeting.setDate(date);
        newMeeting.setTimeSlot(timeSlot);

        Set<User> users = new HashSet<>();
        users.add(userCreatingMeeting);

        List<Integer> userIds = (List<Integer>) payload.get("userIds");
        userIds.forEach(id -> {
            userRepository.findById(id.longValue()).ifPresent(users::add);
        });

        newMeeting.setUsers(users);

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
    public ResponseEntity<List<Meeting>> getMeetingsByUserId(@PathVariable Long userId) {
        List<Meeting> meetings = meetingService.getMeetingsByUserId(userId);
        if (meetings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(meetings);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMeeting(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        Optional<Meeting> meetingOptional = meetingService.getMeetingById(id);
        if (!meetingOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Meeting existingMeeting = meetingOptional.get();

        if (payload.containsKey("locationId")) {
            String locationName = payload.get("locationId").toString();
            Location location = locationRepository.findByName(locationName);
            existingMeeting.setLocation(location);
        }


        if (payload.containsKey("room")) existingMeeting.setRoom((String) payload.get("room"));
        if (payload.containsKey("date")) existingMeeting.setDate((String) payload.get("date"));
        if (payload.containsKey("timeSlot")) existingMeeting.setTimeSlot((String) payload.get("timeSlot"));

        if (payload.containsKey("userIds")) {
            List<Integer> userIds = (List<Integer>) payload.get("userIds");
            Set<User> users = new HashSet<>();
            userIds.forEach(userId -> userRepository.findById(userId.longValue())
                    .ifPresent(users::add));
            existingMeeting.setUsers(users);
        }

        Meeting updatedMeeting = meetingService.saveMeeting(existingMeeting);
        return ResponseEntity.ok(updatedMeeting);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.ok().build();
    }

    // Fetch tutors for a specific meeting - For review tutor use case
    @GetMapping("/tutors/meeting/{meetingId}")
    public ResponseEntity<List<User>> getTutorsByMeeting(@PathVariable Long meetingId) {
        try {
            List<User> tutors = meetingService.getTutorsByMeetingId(meetingId);
            if (tutors.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tutors, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}