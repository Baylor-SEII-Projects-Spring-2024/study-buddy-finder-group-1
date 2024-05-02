package studybuddy.api.endpoint.meetups;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.room.*;
import java.util.List;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@CrossOrigin(origins = "http://34.16.179.242:3000")
public class RoomEndpoint {

    @Autowired
    private RoomService roomService;

    @GetMapping("/rooms")
    public List<Room> findAllRooms() {
        return roomService.findAllRooms();
    }

    @GetMapping("/rooms/{id}")
    public Room findRoomById(@PathVariable Long id) {
        return roomService.findRoomById(id).orElse(null);
    }

    @GetMapping("/rooms/byLocation/{locationId}")
    public List<Room> findRoomsByLocationId(@PathVariable Long locationId) {
        return roomService.findRoomsByLocationId(locationId);
    }

    @GetMapping("/rooms/byCapacity/{capacity}")
    public List<Room> findRoomsByCapacity(@PathVariable int capacity) {
        return roomService.findRoomsByCapacity(capacity);
    }
}