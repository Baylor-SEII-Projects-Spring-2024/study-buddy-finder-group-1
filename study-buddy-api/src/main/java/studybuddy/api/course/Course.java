package studybuddy.api.course;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.user.User;

import java.util.Date;

@Data
@Entity
@Table(name = Course.TABLE_NAME)
public class Course {
    public static final String TABLE_NAME = "COURSES";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "COURSE_ID")
    Long id;

    @Getter
    @Column(name = "NAME")
    String name;

    @Getter
    @Column(name = "DESCRIPTION")
    String description;

    @Getter
    @Column(name = "CREDITS")
    int credits;

    @Getter
    @Column(name = "AREA_OF_STUDY")
    String areaOfStudy;

    public Course(String name, String description, int credits, String areaOfStudy) {
        this.name = name;
        this.description = description;
        this.credits = credits;
        this.areaOfStudy = areaOfStudy;
    }


    public Course() {

    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public void setAreaOfStudy(String areaOfStudy) {
        this.areaOfStudy = areaOfStudy;
    }
}
