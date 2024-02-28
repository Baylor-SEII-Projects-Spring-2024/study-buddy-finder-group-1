package studybuddy.api.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;

import java.util.*;

//fixme: Potential future iterations: Return a list based on specified capacity or time
@Service
public class LocationService {
    //location has : id, name , address, capacity,  available_start, available_end
    @Autowired
    private LocationRepository locationRepository;

    public Optional<Location> findById(Long locationId) {
        return locationRepository.findById(locationId);
    }

    public List<Location> findAllLocations() {
        return locationRepository.findAll();
    }

    public List<Location> findLocationByAddress(String address){
        return locationRepository.findByAddress(address);
    }

    public List<Location> findLocationByCapacity( int capacity){
        return locationRepository.findByCapacity(capacity);
    }

    public List<Location> findLocationByHoursAvailableStart(Date start){
        return locationRepository.findByHoursAvailableStart(start);
    }

    public List<Location> findLocationByHoursAvailableEnd(Date end){
        return locationRepository.findByHoursAvailableEnd(end);
    }

    public List<Location> findLocationByName(String name){
        return locationRepository.findByName(name);
    }

}

