package studybuddy.api.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {


    private final RoomRepository roomRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Optional<Room> findRoomById(Long id) {
        return roomRepository.findById(id);
    }

    public List<Room> findAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> findRoomsByLocationId(Long locationId) {
        return roomRepository.findByLocationId(locationId);
    }

    public List<Room> findRoomsByCapacity(int capacity) {
        return roomRepository.findByCapacity(capacity);
    }

    public List<Room> findRoomsByName(String name) {
        return roomRepository.findByName(name);
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
