package studybuddy.api.meeting;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.location.Location;
import studybuddy.api.user.User;
import java.time.format.DateTimeFormatter;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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

    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JsonBackReference
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

    public LocalTime getStartTime() {
        if (timeSlot != null && !timeSlot.isEmpty()) {
            String startTimeString = timeSlot.split(" - ")[0]; // Extracts "10:00 AM"
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h:mm a", Locale.US);
            return LocalTime.parse(startTimeString, formatter);
        }
        return null;
    }

    @Override
    public String toString() {
        return "Meeting{" +
                "id=" + id +
                ", location=" + (location != null ? location.getName() : "null") +
                ", room='" + room + '\'' +
                ", date='" + date + '\'' +
                ", timeSlot='" + timeSlot + '\'' +
                ", users=" + users.stream().map(User::getId).toList() +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Meeting other = (Meeting) obj;
        return id != null && id.equals(other.id);
    }


}
