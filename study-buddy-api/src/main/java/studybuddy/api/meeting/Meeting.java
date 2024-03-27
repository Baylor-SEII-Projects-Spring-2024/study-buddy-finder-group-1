package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.location.Location;
import studybuddy.api.user.User;

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
    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;


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
    @Column(name = "COURSE_NAME")
    String courseName;

    @ManyToMany
    @JoinTable(
            name = "user_meetings",
            joinColumns = @JoinColumn(name = "meeting_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    public Meeting() {
    }

    public Meeting(Location location, String timeSlot, String date, String room) {
        this.location = location;
        this.timeSlot = timeSlot;
        this.date = date;
        this.room = room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public void setDate(String date) {
        this.date = date;
    }


    /*
    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
    */

    //changing to timeslot for now because it's easier to get demo ready to match what the frontend has
    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }


    public void setLocation(Location location) {
        this.location = location;
    }
}
