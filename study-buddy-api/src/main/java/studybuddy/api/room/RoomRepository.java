package studybuddy.api.room;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studybuddy.api.location.Location;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByLocationId(Long locationId);

    List<Room> findByName(String name);

    List<Room> findByCapacity(int capacity);

    List<Room> findByLocation(Location location);

    List<Room> findByCapacityGreaterThanEqual(int capacity);

    List<Room> findByCapacityLessThanEqual(int capacity);

}
