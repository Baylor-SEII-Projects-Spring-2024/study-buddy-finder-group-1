package studybuddy.api.meeting;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;
import studybuddy.api.meeting.UserMeetingRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service

public class MeetingService {
    @Autowired
    public MeetingRepository meetingRepository;

    @Autowired
    public UserRepository userRepository;
    @Autowired
    public UserMeetingRepository userMeetingRepository;

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Optional<Meeting> getMeetingById(Long id) {
        return meetingRepository.findById(id);
    }

    @Transactional
    public Meeting saveMeeting(Meeting meeting){
        return meetingRepository.save(meeting);
    }

    public void deleteMeeting(Long meetingId){
        meetingRepository.deleteById(meetingId);
    }

    // -------------- Added for Review Tutor --------------
    //public List<Meeting> getMeetingsByUserId(Long userId) {
        //return meetingRepository.findByUserId(userId);
    //}
    // -------------- Added for Review Tutor --------------

    public List<Meeting> getMeetingsByUserId(Long userId) {
        return meetingRepository.findMeetingsByUserId(userId);
    }
    public List<Long> getUserIdByMeetingId(Long meeting) {
        return userMeetingRepository.getUsersInMeeting(meeting);
    }

    public List<Meeting> getUpcomingMeetingsByUserId(Long userId) {
        List<Meeting> allMeetings = meetingRepository.findMeetingsByUserId(userId);
        List<Meeting> meetings = new ArrayList<>();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");
        LocalDateTime currentDateTime = LocalDateTime.now();
        String endTime;

        for (Meeting m : allMeetings) {
            if (m.getTimeSlot() != null) {
                int hyphenIndex = m.getTimeSlot().indexOf('-');
                if (hyphenIndex > -1) {
                    endTime = m.getTimeSlot().substring(hyphenIndex + 1).trim();
                    LocalDateTime date = LocalDateTime.parse(m.getDate() + "T00:00:00");
                    LocalTime time = LocalTime.parse(endTime, timeFormatter);
                    LocalDateTime combined = date.with(time);

                    // if the current time is before meeting time, add it
                    if (currentDateTime.isBefore(combined)) {
                        meetings.add(m);
                    }
                }
            }
        }

        return meetings;
    }

    public Boolean isMeetingOver(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId).orElse(null);
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");
        LocalDateTime currentDateTime = LocalDateTime.now();
        String endTime;

        if (meeting.getTimeSlot() != null) {
            int hyphenIndex = meeting.getTimeSlot().indexOf('-');
            if (hyphenIndex > -1) {
                endTime = meeting.getTimeSlot().substring(hyphenIndex + 1).trim();
                LocalDateTime date = LocalDateTime.parse(meeting.getDate() + "T00:00:00");
                LocalTime time = LocalTime.parse(endTime, timeFormatter);
                LocalDateTime combined = date.with(time);

                // if the current time is before meeting time, add it
                if (currentDateTime.isBefore(combined)) {
                    return false;
                }
            }
        }
        return true;
    }

    public List<Meeting> getAllUpcomingMeetings() {
        List<Meeting> allMeetings = meetingRepository.findAll();
        List<Meeting> meetings = new ArrayList<>();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");
        LocalDateTime currentDateTime = LocalDateTime.now();
        String endTime;

        for (Meeting m : allMeetings) {
            if (m.getTimeSlot() != null) {
                int hyphenIndex = m.getTimeSlot().indexOf('-');
                if (hyphenIndex > -1) {
                    endTime = m.getTimeSlot().substring(hyphenIndex + 1).trim();
                    LocalDateTime date = LocalDateTime.parse(m.getDate() + "T00:00:00");
                    LocalTime time = LocalTime.parse(endTime, timeFormatter);
                    LocalDateTime combined = date.with(time);

                    // if the current time is before meeting time, add it
                    if (currentDateTime.isBefore(combined)) {
                        meetings.add(m);
                    }
                }
            }
        }

        return meetings;
    }
}
