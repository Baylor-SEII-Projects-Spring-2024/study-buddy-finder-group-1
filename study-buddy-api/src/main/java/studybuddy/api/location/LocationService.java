package studybuddy.api.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;

import java.util.*;

//fixme: Potential future iterations: Return a list based on specified capacity or time
@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;

    public Optional<Location> findById(Long locationId) {
        return locationRepository.findById(locationId);
    }

    public List<Location> findAllLocations() {
        return locationRepository.findAll();
    }


}

