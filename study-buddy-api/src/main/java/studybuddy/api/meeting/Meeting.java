package studybuddy.api.meeting;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Data
@Entity
@Table(name = studybuddy.api.location.Location.TABLE_NAME)
public class Meeting {
    public static final String TABLE_NAME = "MEETINGS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "MEETING_ID")
    Long id;

    @Getter
    @Column(name = "TUTOR")
    Long tutorID;

    @Getter
    @Column(name = "STUDENT")
    Long studentID;

    @Getter
    @Column(name = "LOCATION")
    String location;

    @Getter
    @Column(name = "START_TIME")
    Date startTime;

    @Getter
    @Column(name = "END_TIME")
    Date endTime;
}