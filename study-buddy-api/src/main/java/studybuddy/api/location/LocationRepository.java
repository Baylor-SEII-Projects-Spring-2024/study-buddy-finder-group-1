package studybuddy.api.location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import studybuddy.api.location.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

}