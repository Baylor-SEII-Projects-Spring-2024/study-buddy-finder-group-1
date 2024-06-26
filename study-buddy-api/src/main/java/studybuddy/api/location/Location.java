package studybuddy.api.location;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import studybuddy.api.room.Room;
import java.util.*;

@Data
@Entity
@Table(name = studybuddy.api.location.Location.TABLE_NAME)
public class Location {

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

    @JsonManagedReference
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();

    public Location() {
    }

    public Location(String name, String address, int capacity, Date hoursAvailableStart, Date hoursAvailableEnd) {
        this.name = name;
        this.address = address;
        this.capacity = capacity;
        this.hoursAvailableStart = hoursAvailableStart;
        this.hoursAvailableEnd = hoursAvailableEnd;
    }

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

    public void addRoom(Room room) {
        rooms.add(room);
        room.setLocation(this);
    }

    public void removeRoom(Room room) {
        rooms.remove(room);
        room.setLocation(null);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Location other = (Location) obj;
        return id != null && id.equals(other.id);
    }
}