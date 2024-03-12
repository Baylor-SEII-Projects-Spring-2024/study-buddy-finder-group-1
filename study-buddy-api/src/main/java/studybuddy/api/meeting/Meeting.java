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
    @Column(name = "TITLE")
    String title;

    @Getter
    @Column(name = "DESCRIPTION")
    String description;

    @Getter
    @Column(name = "LOCATION_ID")
    Long locID;

    @Getter
    @Column(name = "START_TIME")
    Date startTime;

    @Getter
    @Column(name = "END_TIME")
    Date endTime;

    @Getter
    @Column(name = "USER_EMAIL")
    String userEmail;

    public Meeting() {
    }

    public Meeting(String title, String description, Long locID, Date startTime, Date endTime, String userEmail) {
        this.title = title;
        this.description = description;
        this.locID = locID;
        this.startTime = startTime;
        this.endTime = endTime;
        this.userEmail = userEmail;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocID(Long locID) {
        this.locID = locID;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}
