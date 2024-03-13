package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.util.*;

@Data
@Entity
@Table(name = Meeting.TABLE_NAME)
public class Meeting {

  //meeting needs id, title, description, location id, startTime(DATE), endTime(DATE), and userEmail

    public static final String TABLE_NAME = "MEETINGS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )

    @Column(name = "SESSION_ID")
    Long id;

    @Getter
    @Column(name = "LOCATION")
    String location;

/*
    @Getter
    @Column(name = "START_TIME")
    Date startTime;

    @Getter
    @Column(name = "END_TIME")
    Date endTime;
*/

    @Getter
    @Column(name = "ROOM")
    String room;

    @Getter
    @Column(name = "DATE")
    String date;

    @Getter
    @Column(name = "TIME_SLOT")
    String timeSlot;

    @Getter
    @Column(name = "USER_EMAIL")
    String userEmail;

    @Getter
    @Column(name = "TYPE")
    String meetingType;

    @Getter
    @Column(name = "CLASS")
    String classes;
    public Meeting() {}

    public Meeting(String location, String timeSlot, String userEmail, String date, String room) {
        this.location = location;
        this.timeSlot = timeSlot;
        this.userEmail = userEmail;
        this.date = date;
        this.room = room;
    }

    public Meeting(String location, String room, String date, String timeSlot, String userEmail, String meetingType, String classes) {
        this.location = location;
        this.room = room;
        this.date = date;
        this.timeSlot = timeSlot;
        this.userEmail = userEmail;
        this.meetingType = meetingType;
        this.classes = classes;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setMeetingType(String meetingType) {
        this.meetingType = meetingType;
    }
/*
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
    */

    public void setClasses(String classes) {
        this.classes = classes;
    }

    //changing to timeslot for now because it's easier to get demo ready to match what the frontend has
    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}

