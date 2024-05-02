package studybuddy.api.endpoint.meetups;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import studybuddy.api.course.Course;
import studybuddy.api.course.CourseService;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;
import studybuddy.api.location.LocationService;
import studybuddy.api.meeting.*;
import studybuddy.api.recommendation.RecommendationService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;
import studybuddy.api.user.UserService;

import java.util.*;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("/meetings") // Added a base path for meeting-related endpoints
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://34.16.179.242:3000")
public class MeetupEndpoint {

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private UserMeetingRepository userMeetingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private MeetingInvitationService invitationService;

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private CourseService courseService;
    @Autowired
    private UserService userService;


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
        newMeeting.setTutorID(Long.parseLong((String) payload.get("tutorID")));

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

    @GetMapping("/over/{id}")
    public ResponseEntity<?> isMeetingOver(@PathVariable Long id) {
        return ResponseEntity.ok(meetingService.isMeetingOver(id));
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
    @GetMapping("/meeting/{meetingId}")
    public ResponseEntity<List<Optional<User>>> getUsersByMeetingId(@PathVariable Long meetingId) {
        List<Long> userIds = meetingService.getUserIdByMeetingId(meetingId);

        List<Optional<User>> users = userIds.stream()
                .map(userService::findUser) // Maps each userId to a User object
                .filter(user -> user != null) // Filters out null User objects
                .collect(Collectors.toList()); // Collects the User objects into a List

        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(users);
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

    @GetMapping("/upcoming")
    public ResponseEntity<List<Meeting>> upcomingMeetings() {
        List<Meeting> meetings = meetingService.getAllUpcomingMeetings();
        return ResponseEntity.ok(meetings);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Meeting>> searchMeetings(@RequestParam(required = true) String courseName, @RequestParam(required = true) Long userId) {
        List<Meeting> matchingMeetings = new ArrayList<>();
        Set<Meeting> meetingSet = new HashSet<>(meetingService.getAllUpcomingMeetings());


        for (Meeting m : meetingSet) {
            if (m.getCourseName().toLowerCase().contains((courseName.toLowerCase()))) {
                matchingMeetings.add(m);
                System.out.println(matchingMeetings);
            }
        }

        //for recommended meetings
        User user = userRepository.findById(userId).orElse(null);
        Set<Meeting> recommendedMeetings = recommendationService.getRecommendedMeetings(user, meetingSet, courseName);
        Set<Meeting> listToAdd = new HashSet<>();
        Boolean inList = false;

        for (Meeting recommendedM : recommendedMeetings) {
            for (Meeting matchingM : matchingMeetings) {

                //if the recommended meeting is in the matched meetings list set to true
                if (Objects.equals(matchingM.getId(), recommendedM.getId())) {
                    inList = true;
                }
            }
            //if the recommended meeting wasn't in the list, add it
            if (!inList) {
                listToAdd.add(recommendedM);
            }
            inList = false;
        }

        matchingMeetings.addAll(listToAdd);

        return ResponseEntity.ok(matchingMeetings);
    }

    @GetMapping("/user-in-meeting")
    public ResponseEntity<Boolean> isUserInMeeting(@RequestParam(required = true) Long userId, @RequestParam(required = true) Long meetingId) {
        boolean isInMeeting = userMeetingRepository.userMeetingRelationshipExists(userId, meetingId);

        return ResponseEntity.ok(isInMeeting);
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinMeeting(@RequestBody Map<String, Object> payload) {
        Long userId = Long.parseLong(payload.get("userId").toString());
        Long meetingId = Long.parseLong(payload.get("meetingId").toString());

        // retrieve the user and the meeting using provided IDs
        User userJoining = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found: " + userId));
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found: " + meetingId));

        // check if the user is already a part of the meeting
        if (meeting.getUsers().contains(userJoining)) {
            return ResponseEntity.badRequest().body("User is already in the meeting.");
        }

        // add user to the meeting
        meeting.getUsers().add(userJoining);
        meetingService.saveMeeting(meeting);  // assuming saveMeeting updates existing meetings correctly

        return ResponseEntity.ok().body("Meeting joined successfully!");
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