package studybuddy.api.location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import studybuddy.api.location.Location;
import studybuddy.api.user.User;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    //location has : id, name , address, capacity,  available_start, available_end

    /* would be used for search option if ever created */
<<<<<<< HEAD
    @Query("SELECT l FROM Location l WHERE l.name  = : nagit gme")
    public List<Location> findByName(@Param("name") String end);
=======
>>>>>>> 130f12a800b2b909bf19e368e16a85cfad913529
    @Query("SELECT l FROM Location l WHERE l.hoursAvailableEnd  = : end")
    public List<Location> findByHoursAvailableEnd(@Param("end") Date end);
    @Query("SELECT l FROM Location l WHERE l.hoursAvailableStart  = : start")
    public List<Location> findByHoursAvailableStart(@Param("start") Date start);
    @Query("SELECT l FROM Location l WHERE l.name = :name")
    Location findByName(@Param("name") String name);
    @Query("SELECT l FROM Location l WHERE l.capacity  = : capacity")
    public List<Location> findByCapacity(@Param("capacity") int capacity);
    @Query("SELECT l FROM Location l WHERE l.address LIKE :address")
    public List<Location> findByAddress(@Param("address") String address);
}