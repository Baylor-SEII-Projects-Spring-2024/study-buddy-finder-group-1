package studybuddy.api.room;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.location.Location;
import studybuddy.api.room.Room;
import studybuddy.api.room.RoomRepository;
import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;


    public Optional<Room> findAllRooms(String locationName) {
        return roomRepository.findByName(locationName);
    }

    //test

}
