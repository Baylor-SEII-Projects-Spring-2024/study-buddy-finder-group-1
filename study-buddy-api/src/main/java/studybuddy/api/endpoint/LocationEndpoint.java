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



}
