package studybuddy.api.location;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.endpoint.LocationEndpoint;

import java.util.*;

@Data
@Entity
@Table(name = studybuddy.api.location.Location.TABLE_NAME)
public class Location extends LocationEndpoint {
    public static final String TABLE_NAME = "LOCATIONS";

    @Id
    @GeneratedValue(generator = TABLE_NAME + "_GENERATOR")
    @SequenceGenerator(
            name = TABLE_NAME + "_GENERATOR",
            sequenceName = TABLE_NAME + "_SEQUENCE"
    )
    @Column(name = "LOCATION_ID")
    Long id;

    @Getter
    @Column(name = "NAME")
    String name;

    @Getter
    @Column(name = "ADDRESS")
    String address;

    @Getter
    @Column(name = "CAPACITY")
    int capacity;

    @Getter
    @Column(name = "AVAILABLE_START")
    Date hoursAvailableStart;

    @Getter
    @Column(name = "AVAILABLE_END")
    Date hoursAvailableEnd;

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public void setHoursAvailableStart(Date hoursAvailableStart) {
        this.hoursAvailableStart = hoursAvailableStart;
    }

    public void setHoursAvailableEnd(Date hoursAvailableEnd) {
        this.hoursAvailableEnd = hoursAvailableEnd;
    }
}
