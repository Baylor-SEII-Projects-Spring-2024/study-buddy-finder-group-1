package studybuddy.api.meeting;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingInvitationRepository extends JpaRepository<MeetingInvitation, Long> {
}