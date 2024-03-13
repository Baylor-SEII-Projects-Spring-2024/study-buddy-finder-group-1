package studybuddy.api.setup;

import studybuddy.api.course.Course;
import studybuddy.api.course.CourseRepository;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class LocationInitializer implements CommandLineRunner {
    private LocationRepository locationRepository;

    @Autowired
    public LocationInitializer(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // check if data is already loaded to avoid duplication
        Calendar calendar= Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 8);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        Date startDate = calendar.getTime();
        calendar.set(Calendar.HOUR_OF_DAY,23);
        Date endDate = calendar.getTime();


        if (locationRepository.count() == 0) {
            locationRepository.save(new Location("Moody Library","1312 S 3rd St",3,startDate,endDate));
            locationRepository.save(new Location("Baylor Science Bulding","101 Bagby Ave",3,startDate,endDate));
            locationRepository.save(new Location("Student Union Building","1311 S 5th St",3,startDate,endDate));
            locationRepository.save(new Location("Armstrong Library","710 Speight Ave",3,startDate,endDate));
        }
    }

}
