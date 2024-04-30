package studybuddy.api.MeetupTest;
/*
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import studybuddy.api.endpoint.meetups.MeetupEndpoint;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingInvitationService;
import studybuddy.api.meeting.MeetingService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MeetupEndpointTest {

    @Mock
    private MeetingService meetingService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LocationRepository locationRepository;

    @Mock
    private MeetingInvitationService invitationService;

    @InjectMocks // This will inject the mocks above into this class
    private MeetupEndpoint meetupEndpoint;

    @Test
    void testCreateMeetup() {
        // prepare mock data
        Long userId = 1L;
        Long locationId = 1L;
        User mockUser = new User();
        mockUser.setId(userId);
        Location mockLocation = new Location();
        mockLocation.setId(locationId);
        Set<User> users = new HashSet<>();
        users.add(mockUser);
        Meeting mockMeeting = new Meeting();
        mockMeeting.setLocation(mockLocation);
        mockMeeting.setUsers(users);

        // mock the interactions
        when(userRepository.findById(any(Long.class))).thenReturn(Optional.of(mockUser));
        when(locationRepository.findById(any(Long.class))).thenReturn(Optional.of(mockLocation));
        when(meetingService.saveMeeting(any(Meeting.class))).thenReturn(mockMeeting);

        // prepare the payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("userId", userId.toString());
        payload.put("locationId", locationId.toString());
        payload.put("room", "Room 1");
        payload.put("date", "2024-04-10");
        payload.put("timeSlot", "10:00-12:00");
        payload.put("userIds", Collections.singletonList(userId.intValue()));

        // call the method to test
        ResponseEntity<?> response = meetupEndpoint.createMeetup(payload);

        // verify the response
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody() instanceof Meeting);
        Meeting createdMeeting = (Meeting) response.getBody();
        assertNotNull(createdMeeting.getUsers());
        assertFalse(createdMeeting.getUsers().isEmpty());

        System.out.println(mockMeeting);

        // verify interactions
        verify(userRepository, atLeast(1)).findById(userId);
        verify(locationRepository, times(1)).findById(locationId);
        verify(meetingService, times(1)).saveMeeting(any(Meeting.class));
    }*/
//}