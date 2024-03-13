package studybuddy.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingService;
import studybuddy.api.user.User;

import java.util.Optional;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MeetupEndpoint {
    @Autowired
    private MeetingService meetingService;

    @PostMapping("/MeetupCreationPage")
    public ResponseEntity<String> saveMeeting(@RequestBody Meeting meeting) {
        //Could a user create a meetup that already exists? Worry about that in future iterations
        //create new meeting
        //Fixme:  Meeting has everything but user email. Find user email to apply.
        meetingService.saveMeeting(meeting);
        return ResponseEntity.ok("Meeting created Successfully!");
    }

    @PutMapping("/EditMeetupPage")
    public ResponseEntity<String> updateMeeting(@RequestBody Meeting updatedMeeting) {
        try {
            // Perform validation on the updated meeting data if needed
            if(updatedMeeting.getClasses()== null || updatedMeeting.getClasses().isEmpty() ||
               updatedMeeting.getLocation()== null || updatedMeeting.getLocation().isEmpty() ||
               updatedMeeting.getRoomNumber()== null || updatedMeeting.getRoomNumber().isEmpty() ||
               updatedMeeting.getDate()== null || /*updatedMeeting.getDate().isEmpty() ||*/
               updatedMeeting.getTimeSlot()== null || updatedMeeting.getTimeSlot().isEmpty() ||
               updatedMeeting.getMeetingType()==null || updatedMeeting.getMeetingType().isEmpty())
            {
                return ResponseEntity.badRequest().body("All fields are required");
            }

            // Retrieve the existing meeting from the database
            Optional<Meeting> existingMeetingOptional = meetingService.getMeetingById(updatedMeeting.getId());
            if (!existingMeetingOptional.isPresent()) {
                return ResponseEntity.notFound().build();
            }



            // Unwrap the Optional to get the actual Meeting object
            Meeting existingMeeting = existingMeetingOptional.get();

            // Update the meeting data
            existingMeeting.setClasses(updatedMeeting.getClasses());
            existingMeeting.setLocation(updatedMeeting.getLocation());
            existingMeeting.setRoomNumber(updatedMeeting.getRoomNumber());
            existingMeeting.setDate(updatedMeeting.getDate());
            existingMeeting.setTimeSlot(updatedMeeting.getTimeSlot());
            existingMeeting.setMeetingType(updatedMeeting.getMeetingType());

            // Save the updated meeting to the database
            meetingService.saveMeeting(existingMeeting);

            return ResponseEntity.ok("Meeting updated successfully");
        } catch (Exception e) {
            // Log any exceptions
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update meeting");
        }
    }


}
