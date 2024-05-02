package studybuddy.api.location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    //location has : id, name , address, capacity,  available_start, available_end

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