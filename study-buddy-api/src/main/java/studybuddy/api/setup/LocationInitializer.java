package studybuddy.api.setup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;
import studybuddy.api.room.Room;
import studybuddy.api.room.RoomRepository;

import java.util.Calendar;
import java.util.Date;

@Component
public class LocationInitializer implements CommandLineRunner {
    private final LocationRepository locationRepository;
    private final RoomRepository roomRepository;

    @Autowired
    public LocationInitializer(LocationRepository locationRepository, RoomRepository roomRepository) {
        this.locationRepository = locationRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // Set up start and end times for location availability
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.HOUR_OF_DAY, 8);
        calendar.set(Calendar.MINUTE, 0);
        Date startDate = calendar.getTime();

        calendar.set(Calendar.HOUR_OF_DAY, 23);
        Date endDate = calendar.getTime();

        // Only initialize data if the database is empty
        if (locationRepository.count() == 0) {
            // Create each location with specific rooms
            Location moodyLibrary = createLocation("Moody Library", "1312 S 3rd St", 100, startDate, endDate);
            addRoomsToMoodyLibrary(moodyLibrary);

            Location baylorScienceBuilding = createLocation("Baylor Science Building", "101 Bagby Ave", 200, startDate, endDate);
            addRoomsToBaylorScienceBuilding(baylorScienceBuilding);

            Location studentUnionBuilding = createLocation("Student Union Building", "1311 S 5th St", 300, startDate, endDate);
            addRoomsToStudentUnionBuilding(studentUnionBuilding);

            Location armstrongLibrary = createLocation("Armstrong Library", "710 Speight Ave", 50, startDate, endDate);
            addRoomsToArmstrongLibrary(armstrongLibrary);

            // Persist Locations
            locationRepository.save(moodyLibrary);
            locationRepository.save(baylorScienceBuilding);
            locationRepository.save(studentUnionBuilding);
            locationRepository.save(armstrongLibrary);
        }
    }

    private Location createLocation(String name, String address, int capacity, Date start, Date end) {
        return new Location(name, address, capacity, start, end);
    }

    private void addRoomsToMoodyLibrary(Location location) {
        // adds specific rooms to the Moody Library
        location.addRoom(new Room("Study Room 101", 10, location));
        location.addRoom(new Room("Study Room 102", 8, location));
        location.addRoom(new Room("Quiet Study Area", 15, location));
    }

    private void addRoomsToBaylorScienceBuilding(Location location) {
        // adds labs and lecture halls to the Baylor Science Building
        location.addRoom(new Room("Lab A", 30, location));
        location.addRoom(new Room("Lab B", 25, location));
        location.addRoom(new Room("Lecture Hall 201", 100, location));
    }

    private void addRoomsToStudentUnionBuilding(Location location) {
        // adds meeting and event rooms to the Student Union Building
        location.addRoom(new Room("Conference Room A", 20, location));
        location.addRoom(new Room("Ballroom", 200, location));
        location.addRoom(new Room("Small Meeting Room", 10, location));
    }

    private void addRoomsToArmstrongLibrary(Location location) {
        // adds study and research rooms to the Armstrong Library
        location.addRoom(new Room("Research Room 1", 5, location));
        location.addRoom(new Room("Group Study Room", 12, location));
        location.addRoom(new Room("Video Study Area", 8, location));
    }
}
