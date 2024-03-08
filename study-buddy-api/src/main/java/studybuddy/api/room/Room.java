package studybuddy.api.room;
import jakarta.annotation.Resource;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.*;
public class Room {
    //number,isbooked,locationNamr
    public static final String TABLE_NAME = "ROOMS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "LOCATION_ID")
    Long id;

    @Getter
    @Column(name = "name")
    String name;

    @Getter
    @Column(name = "isBooked")
    Boolean isBooked;

    @Getter
    @Column(name = "location")
    String location;

    //test
    public void setName(String name) {
        this.name = name;
    }

    public void setBooked(Boolean booked) {
        isBooked = booked;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
