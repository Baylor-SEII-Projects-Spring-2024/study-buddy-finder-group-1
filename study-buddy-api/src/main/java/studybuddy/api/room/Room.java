package studybuddy.api.room;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import studybuddy.api.location.Location;
import lombok.Data;
import lombok.Getter;

@Data
@Entity
@Table(name = "ROOMS")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROOM_ID")
    private Long id;

    @Getter
    @Column(name = "NAME")
    private String name;

    @Getter
    @Column(name = "CAPACITY")
    private int capacity;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "LOCATION_ID", nullable = false)
    private Location location;

    public Room(String name, int capacity, Location location) {
        this.name = name;
        this.capacity = capacity;
        this.location = location;
    }

    public Room() {

    }
}