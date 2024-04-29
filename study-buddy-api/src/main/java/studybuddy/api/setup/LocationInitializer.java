package studybuddy.api.setup;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import studybuddy.api.location.Location;
import studybuddy.api.location.LocationRepository;
import studybuddy.api.room.Room;
import studybuddy.api.room.RoomRepository;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.Calendar;
import java.util.Date;

@Component
public class LocationInitializer implements CommandLineRunner {
    private final LocationRepository locationRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Autowired
    public LocationInitializer(LocationRepository locationRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.locationRepository = locationRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
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

        if(userRepository.count() <= 10){
            User u = new User("Michael","Okonkwo","michael_okonkwo1@baylor.edu","michael","Student");

            userRepository.save(u);

            u = new User("Will","Delano","will_delano1@baylor.edu","will","Student");

            userRepository.save(u);

            u = new User("Kyle","Thompson","kyle_thompson1@baylor.edu","kyle","Student");

            userRepository.save(u);

            u = new User("Vincent","Dinh","vincent_dinh1@baylor.edu","vincent","Student");

            userRepository.save(u);

            u = new User("Nick","Revard","nick_revard1@baylor.edu","nick","Student");

            userRepository.save(u);





            u = new User("Albert","Einstein","albert_einstein1@baylor.edu","password","Tutor");
            u.setRating(2.4);
            userRepository.save(u);

            u = new User("Nikola","Tesla","nikola_tesla1@baylor.edu","password","Tutor");
            u.setRating(4.9);
            userRepository.save(u);

            u = new User("Lebron","James","lebron_james1@baylor.edu","password","Tutor");
            u.setRating(3.5);
            userRepository.save(u);

            u = new User("Lionel","Messi","lionel_messi1@baylor.edu","password","Tutor");
            u.setRating(4.5);
            userRepository.save(u);

            u = new User("Michael","Jordan","michael_jordan1@baylor.edu","password","Tutor");
            u.setRating(3.5);
            userRepository.save(u);

            u = new User("Kevin","Durant","kevin_durant1@baylor.edu","password","Tutor");
            u.setRating(2.5);
            userRepository.save(u);

            u = new User("Caitlyn","Clark","caitlyn_clark1@baylor.edu","password","Tutor");
            u.setRating(3.7);
            userRepository.save(u);

            u = new User("Marvin","Harrison","marvin_harrison1@baylor.edu","password","Tutor");
            u.setRating(0.4);
            userRepository.save(u);

        }
    }

    private Location createLocation(String name, String address, int capacity, Date start, Date end) {
        return new Location(name, address, capacity, start, end);
    }

    private void addRoomsToMoodyLibrary(Location location) {
        // adds specific rooms to the Moody Library
        location.addRoom(new Room("Study Room 101", 10, location));
        location.addRoom(new Room("Study Room 102", 8, location));
        location.addRoom(new Room("Study Room 103", 10, location));
        location.addRoom(new Room("Study Room 104", 10, location));
        location.addRoom(new Room("Study Room 105", 10, location));
        location.addRoom(new Room("Study Room 106", 10, location));
        location.addRoom(new Room("Study Room 107", 10, location));
        location.addRoom(new Room("Study Room 108", 10, location));
        location.addRoom(new Room("Study Room 109", 10, location));
        location.addRoom(new Room("Quiet Study Area", 15, location));
    }

    private void addRoomsToBaylorScienceBuilding(Location location) {
        // adds labs and lecture halls to the Baylor Science Building
        location.addRoom(new Room("Lab A", 30, location));
        location.addRoom(new Room("Lab B", 25, location));
        location.addRoom(new Room("Lecture Hall 201", 100, location));
        location.addRoom(new Room("Lecture Hall 301", 200, location));
        location.addRoom(new Room("Lecture Hall 401", 250, location));
        location.addRoom(new Room("Lecture Hall 202", 250, location));
        location.addRoom(new Room("Lecture Hall 302", 250, location));
        location.addRoom(new Room("Lecture Hall 402", 250, location));
        location.addRoom(new Room("Lecture Hall 404", 250, location));
        location.addRoom(new Room("Lecture Hall 309", 250, location));
    }

    private void addRoomsToStudentUnionBuilding(Location location) {
        // adds meeting and event rooms to the Student Union Building
        location.addRoom(new Room("Conference Room A", 20, location));
        location.addRoom(new Room("Ballroom", 200, location));
        location.addRoom(new Room("Small Meeting Room", 10, location));
        location.addRoom(new Room("Basement", 45, location));
    }

    private void addRoomsToArmstrongLibrary(Location location) {
        // adds study and research rooms to the Armstrong Library
        location.addRoom(new Room("Research Room 1", 5, location));
        location.addRoom(new Room("Group Study Room", 12, location));
        location.addRoom(new Room("Video Study Area", 8, location));
    }


}
