package studybuddy.api.meeting;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.user.User;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MeetingInvitationService {

    @Autowired
    private MeetingInvitationRepository invitationRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    public MeetingInvitation createInvitation(Meeting meeting, User invitee) {
        MeetingInvitation invitation = new MeetingInvitation();
        invitation.setMeeting(meeting);
        invitation.setInvitee(invitee);
        invitation.setStatus("pending");
        return invitationRepository.save(invitation);
    }

    @Transactional
    public MeetingInvitation acceptInvitation(Long invitationId) {
        MeetingInvitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new RuntimeException("Invitation not found"));
        invitation.setStatus("accepted");

        //add the invitee to the meeting's users
        Meeting meeting = invitation.getMeeting();
        meeting.getUsers().add(invitation.getInvitee());
        meetingRepository.save(meeting); // ensure the meeting is updated with the new user

        return invitationRepository.save(invitation);
    }

    public void rejectInvitation(Long invitationId) {
        MeetingInvitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new RuntimeException("Invitation not found"));
        invitation.setStatus("declined");
        invitationRepository.save(invitation);
    }

    public List<MeetingInvitation> getPendingInvitationsForUser(Long userId) {
        return invitationRepository.findAll().stream()
                .filter(invitation -> invitation.getInvitee().getId().equals(userId) && invitation.getStatus().equals("pending"))
                .collect(Collectors.toList());
    }
}