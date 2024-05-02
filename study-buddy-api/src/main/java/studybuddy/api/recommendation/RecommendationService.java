package studybuddy.api.recommendation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.course.Course;
import studybuddy.api.course.CourseService;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.meeting.MeetingService;
import studybuddy.api.user.User;
import studybuddy.api.user.UserService;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private UserService userService;

    @Autowired
    private MeetingService meetingService;

    @Autowired
    private CourseService courseService;

    static final double FRIEND_WEIGHT = 0.6;
    static final double TUTOR_WEIGHT = 5.0;
    static final double SUBJECT_WEIGHT = 1;

    public Set<Meeting> getRecommendedMeetings(User user, Set<Meeting> allMeetings, String course) {
        //DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd h:mm a");
        //LocalDateTime desiredTime = LocalDateTime.parse(desiredTimeString, dateTimeFormatter);

        Map<Double, Meeting> weightedMeetings = new TreeMap<>(Collections.reverseOrder());

        for (Meeting meeting : allMeetings) {
            double weight = calculateMeetingWeight(user, course, meeting);
            weightedMeetings.put(weight, meeting);
        }

        return weightedMeetings.values().stream().limit(10).collect(Collectors.toSet());
    }

    private double calculateMeetingWeight(User user, String course, Meeting meeting) {
        double weight = 0.0;

        // check if any of the meeting's attendees are friends with the user
        boolean hasFriend = meeting.getUsers().stream()
                .anyMatch(meetingUser -> userService.areUsersFriends(user.getId(), meetingUser.getId()));
        if (hasFriend) {
            weight += FRIEND_WEIGHT;
        }

        double tutorRating = meeting.getUsers().stream()
                .filter(u -> "Tutor".equals(u.getUserType()))
                .findFirst()
                .map(User::getRating)
                .orElse(0.5); // default or average rating

        weight += tutorRating / TUTOR_WEIGHT;

        if (course.equals(meeting.getCourseName())) {
            weight += SUBJECT_WEIGHT;
        }
        return weight;
    }

    public Set<User> getRecommendedFriends(User u, Set<User> allUsers) {
        Set<User> recommendedFriends = new HashSet<>();
        Set<Course> userCourses = u.getCourses();

        //loop through all existing users
        for (User q : allUsers) {
            Set<Course> tempCourses = q.getCourses();

            //loop through all our user's courses
            for (Course c : userCourses) {
                //loop through all the temp user's courses
                for (Course t : tempCourses) {
                    //if they have the same course, add to recommended friends
                    if (c.getName().equals(t.getName())) {
                        recommendedFriends.add(q);
                    }
                }
            }
        }

        return recommendedFriends;
    }

    public Set<User> getRecommendedTutors(User u, Set<User> allTutors) {
        Set<User> recommendedTutors = new HashSet<>();
        Set<Course> userCourses = u.getCourses();

        //loop through all existing tutors
        for (User q : allTutors) {
            Set<Course> tempCourses = q.getCourses();

            //loop through all our user's courses
            for (Course c : userCourses) {
                //loop through all the tutor's courses
                for (Course t : tempCourses) {
                    //if they have the same course, add to recommended tutors
                    if (c.getName().equals(t.getName())) {
                        recommendedTutors.add(q);
                    }
                }
            }
        }

        //convert to list to sort
        List<User> recommendedTutorsList = new ArrayList<>(recommendedTutors);

        //sort tutors and return top 3
        Collections.sort(recommendedTutorsList, new Comparator<User>() {
            @Override
            public int compare(User user1, User user2) {
                return Double.compare(user2.getRating(), user1.getRating());
            }
        });

        return new HashSet<>(recommendedTutorsList);
    }
}