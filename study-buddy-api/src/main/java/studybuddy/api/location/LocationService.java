package studybuddy.api.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Location findLocationByName(String name){
        return locationRepository.findByName(name);
    }

    public Location saveLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location deleteLocation(Long id) {
        locationRepository.deleteById(id);
        return null;
    }

}

