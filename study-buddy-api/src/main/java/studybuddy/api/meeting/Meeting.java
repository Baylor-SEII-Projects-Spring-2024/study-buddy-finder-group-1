package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.util.*;

@Data
@Entity
@Table(name = Meeting.TABLE_NAME)
public class Meeting {


  //meetup has id(long),email(String), locationName(string), classes(string), meetingType(String), room(int), Date(date), and timeslot(string)
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

    @Getter
    @Column(name = "CLASS")
    String classes;

    @Getter
    @Column(name = "ROOM")
    String roomNumber;

    @Getter
    @Column(name = "DATE")
    Date date;

    @Getter
    @Column(name = "USER_EMAIL")
    String userEmail;

    @Getter
    @Column(name = "TIME_SLOT")
    String timeSlot;

    @Getter
    @Column(name = "TYPE")
    String meetingType;

    public Meeting() {
    }

    public Meeting(String location, String classes, String roomNumber, Date date, String userEmail, String timeSlot, String meetingType) {
        this.location = location;
        this.classes = classes;
        this.roomNumber = roomNumber;
        this.date = date;
        this.userEmail = userEmail;
        this.timeSlot = timeSlot;
        this.meetingType = meetingType;
    }

    public void setMeetingType(String meetingType) {
        this.meetingType = meetingType;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setClasses(String classes) {
        this.classes = classes;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}

