package studybuddy.api.endpoint.meetups;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.meeting.MeetingInvitation;
import studybuddy.api.meeting.MeetingInvitationService;

@RestController
@RequestMapping("/meeting-invitations")
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://34.16.179.242:3000")
public class MeetupInvitationEndpoint {

    @Autowired
    private MeetingInvitationService invitationService;

    @PostMapping("/accept/{invitationId}")
    public ResponseEntity<?> acceptInvitation(@PathVariable Long invitationId) {
        MeetingInvitation invitation = invitationService.acceptInvitation(invitationId);
        return ResponseEntity.ok(invitation);
    }

    @PostMapping("/reject/{invitationId}")
    public ResponseEntity<?> rejectInvitation(@PathVariable Long invitationId) {
        invitationService.rejectInvitation(invitationId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/pending/{userId}")
    public ResponseEntity<?> getPendingInvitations(@PathVariable Long userId) {
        var invitations = invitationService.getPendingInvitationsForUser(userId);
        return ResponseEntity.ok(invitations);
    }
}