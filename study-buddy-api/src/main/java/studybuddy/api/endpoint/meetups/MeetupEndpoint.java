package studybuddy.api.endpoint.meetups;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;
import studybuddy.api.meeting.*;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;
import studybuddy.api.user.UserService;

import java.util.*;

@Log4j2
@RestController
@RequestMapping("/meetings") // Added a base path for meeting-related endpoints
@CrossOrigin(origins = "http://localhost:3000")
public class MeetupEndpoint {

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private UserMeetingRepository userMeetingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private MeetingInvitationService invitationService;

    @PostMapping("/create")
    public ResponseEntity<?> createMeetup(@RequestBody Map<String, Object> payload) {
        Long userId = Long.parseLong(payload.get("userId").toString());
        Long locationId = Long.parseLong(payload.get("locationId").toString());

        // Find the user creating the meeting and the meeting location
        User userCreatingMeeting = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + userId));
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found: " + locationId));

        // Create and save the new meeting without adding users to it
        Meeting newMeeting = new Meeting();
        newMeeting.setLocation(location);
        newMeeting.setRoom(String.valueOf(payload.get("room")));
        newMeeting.setDate(String.valueOf(payload.get("date")));
        newMeeting.setTimeSlot(String.valueOf(payload.get("timeSlot")));
        newMeeting.setCourseName(String.valueOf(payload.get("subject")));

        Set<User> users = new HashSet<>();
        users.add(userCreatingMeeting);
        newMeeting.setUsers(users);

        Meeting createdMeeting = meetingService.saveMeeting(newMeeting);

        List<Integer> userIds = (List<Integer>) payload.get("userIds");
        userIds.stream()
                .distinct() // Ensure no duplicate IDs, just in case
                .filter(id -> !id.equals(userId)) // Exclude the meeting creator
                .forEach(id -> {
                    userRepository.findById(id.longValue()).ifPresent(invitee -> {
                        MeetingInvitation invitation = new MeetingInvitation();
                        invitation.setMeeting(createdMeeting);
                        invitation.setInvitee(invitee);
                        invitation.setStatus("pending");
                        invitationService.createInvitation(createdMeeting, invitee);
                    });
                });

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

    @GetMapping("/user/{userId}/upcoming")
    public ResponseEntity<List<Meeting>> getUpcomingMeetingsByUserId(@PathVariable Long userId) {
        try {
            List<Meeting> upcomingMeetings = meetingService.getUpcomingMeetingsByUserId(userId);
            return ResponseEntity.ok(upcomingMeetings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Meeting>> searchMeetings(@RequestParam(required = true) String course) {
        List<Meeting> meetings = meetingService.getAllUpcomingMeetings();
        List<Meeting> matchingMeetings = new ArrayList<>();

        for (Meeting m : meetings) {
            if (m.getCourseName().toLowerCase().contains((course.toLowerCase()))) {
                matchingMeetings.add(m);
            }
        }


        return ResponseEntity.ok(matchingMeetings);
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinMeeting(@RequestParam(required = true) Long userId, @RequestParam(required = true) Long meetingId) throws Exception {
        MeetingUser meetingUser = new MeetingUser();

        if (userMeetingRepository.userMeetingRelationshipExists(userId, meetingId)) {
            return ResponseEntity.badRequest().body("User is already in the meeting.");
        }

        //create a new meeting-user association
        meetingUser.setUser(user);
        meetingUser.setMeeting(meeting);
        meetingUser.setRole("Student");
        meetingUserService.saveMeetingUser(meetingUser);

        return ResponseEntity.ok().body("Meeting joined successfully!");
        return ResponseEntity.badRequest().body("Error joining meeting: " + e.getMessage());
    }

    // -------------- Added for Review Tutor --------------
//    @GetMapping("/user/{userId}") //Dont change
//    public ResponseEntity<List<Meeting>> getMeetingsByUser(@PathVariable Long userId) {
//        List<Meeting> userMeetings = meetingService.getMeetingsByUserId(userId);
//        if (userMeetings.isEmpty()) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(userMeetings);
//    }
    // -------------- Added for Review Tutor --------------
}