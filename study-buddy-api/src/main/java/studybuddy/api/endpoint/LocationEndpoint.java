package studybuddy.api.endpoint;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationService;
import java.util.*;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LocationEndpoint {
    @Autowired
    private LocationService locationService;

    //location has : id, name , address, capacity,  available_start, available_end
    @GetMapping("/location")
    public List<Location> findAllLocations() {
        return locationService.findAllLocations();
    }

    @GetMapping("/location/{id}")
    public Location findLocationById(@PathVariable Long id) {
        var location = locationService.findById(id).orElse(null);

        if (location == null) {
            log.warn("Location not found");
        }

        return location;
    }


    @GetMapping("/location/{address}")
    public List<Location> findLocationByAddress(@PathVariable String address){
        var locations = locationService.findLocationByAddress(address);

        return locations;
    }
    @GetMapping("/location/{capacity}")
    public List<Location> findLocationByCapacity(@PathVariable int capacity){
        var locations = locationService.findLocationByCapacity(capacity);

        return locations;
    }


    @GetMapping("/location/{start}")
    public List<Location> findLocationByHoursAvailableStart(@PathVariable Date start){
        var locations = locationService.findLocationByHoursAvailableStart(start);

        return locations;
    }

    @GetMapping("/location/{end}")
    public List<Location> findLocationByHoursAvailableEnd(@PathVariable Date end){
        var locations = locationService.findLocationByHoursAvailableEnd(end);

        return locations;
    }


    @GetMapping("/location/{name}")
    public List<Location> findLocationByName(@PathVariable String name){
        var locations = locationService.findLocationByName(name);

        return locations;
    }







}
