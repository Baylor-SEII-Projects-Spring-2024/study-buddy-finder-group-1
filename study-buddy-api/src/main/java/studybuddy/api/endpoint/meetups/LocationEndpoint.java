package studybuddy.api.endpoint.meetups;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationService;

import java.util.Date;
import java.util.List;

@Log4j2
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LocationEndpoint {
    @Autowired
    private LocationService locationService;

    @GetMapping("/locations")
    public List<Location> findAllLocations() {
        return locationService.findAllLocations();
    }

    @GetMapping("/locations/{id}")
    public Location findLocationById(@PathVariable Long id) {
        return locationService.findById(id).orElse(null);
    }

    @GetMapping("/locations/by-address")
    public List<Location> findLocationByAddress(@RequestParam String address) {
        return locationService.findLocationByAddress(address);
    }

    @GetMapping("/locations/by-capacity")
    public List<Location> findLocationByCapacity(@RequestParam int capacity) {
        return locationService.findLocationByCapacity(capacity);
    }

    @GetMapping("/locations/by-start")
    public List<Location> findLocationByHoursAvailableStart(@RequestParam @DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss") Date start) {
        return locationService.findLocationByHoursAvailableStart(start);
    }

    @GetMapping("/locations/by-end")
    public List<Location> findLocationByHoursAvailableEnd(@RequestParam @DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss") Date end) {
        return locationService.findLocationByHoursAvailableEnd(end);
    }

    @GetMapping("/locations/by-name")
    public Location findLocationByName(@RequestParam String name) {
        return locationService.findLocationByName(name);
    }

    @DeleteMapping("/locations/delete/{id}")
    public Location deleteLocationById(@PathVariable Long id) {
        return locationService.deleteLocation(id);
    }
}
