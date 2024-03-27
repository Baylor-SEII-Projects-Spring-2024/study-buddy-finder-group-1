package studybuddy.api.recommendation;
import org.springframework.cglib.core.Local;
import studybuddy.api.course.Course;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.user.User;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;
public class Recommendation {
    static double FRIEND_WEIGHT = 0.6;
    static double TUTOR_WEIGHT = 5.0;
    static double SUBJECT_WEIGHT = 1;
    public static Set<Meeting> getRecommendedMeetings(User u, Set<Meeting> allMeetings, Course course, String desiredTime) {
        //create a map to hold the meetings and their weights
        Map<Double, Meeting> weightedMeetings = new HashMap<>();
        //loop through all meeting and find its weight
        for (Meeting m : allMeetings) {
            double weight = 0.0;
            //if the meeting has a friend in it add the weight
            if (!u.isFriendOf(m.getUsers()).isEmpty()) {
                weight += FRIEND_WEIGHT;
            }
            //adjust the weight based on tutor rating
            double tutorRating = 0.5;
            for (User q : m.getUsers()) {
                if (Objects.equals(q.getUserType(), "Tutor")) {
                    //get the average rating
                    tutorRating = q.getRating();
                }
            }
            //if the rating is a perfect 5 this will add 1 to the weight. The lower the rating,
            //the less it will add
            weight += tutorRating / TUTOR_WEIGHT;
            //Add subject weight
            if (Objects.equals(m.getCourseName(), course.getName())) {
                weight += SUBJECT_WEIGHT;
            }
            //adjust the weight based on how similar the time is
            //var for how far from desired time; 1 denotes the meeting happens at same time
            double distanceFromTarget = 1;

            //TODO PARSE THE TIMES AND ASSIGN
            String meetingTimeSlot = m.getTimeSlot();
            String meetingDate = m.getDate();



            LocalDate desiredLocalDateTime = null;
            LocalDate meetingTime = null;

            //get the difference
            long daysDifference = ChronoUnit.HOURS.between(desiredLocalDateTime, meetingTime);
            //normalize the difference to a scale of 0 to 1
            double normalizedDifference = 1.0 - (double) Math.abs(daysDifference) / (24.0 * 365.0); // Assuming 365 days in a year
            distanceFromTarget = Math.max(0.0, normalizedDifference);
            weight += distanceFromTarget;
            //insert meeting with its weight
            weightedMeetings.put(weight, m);
        }
        //sort meetings and return the top three
        Set<Meeting> recommendedMeetings = new HashSet<>();
        //sort the map
        List<Map.Entry<Double, Meeting>> sortedKeys = new ArrayList<>(weightedMeetings.entrySet());
        Collections.sort(sortedKeys, Collections.reverseOrder(Map.Entry.comparingByKey()));
        System.out.println("Sorted map:");
        for (Map.Entry<Double, Meeting> entry : sortedKeys) {
            System.out.println(entry.getKey());
        }
        //add the first three
        int count = 0;
        for (Map.Entry<Double, Meeting> entry : sortedKeys) {
            if (count < 3) {
                recommendedMeetings.add(entry.getValue());
                count++;
            }
            else {
                break;
            }
        }
        return recommendedMeetings;
    }


    /* under the assumption of list of users to befriend. Criteria will be based off of courses*/
    //todo: Mutual friends would be a consideration as well for weight.
    public static List<User> getRecommendedFriends(User u,List<User> allUsers){
        //Use weighted map
        Map<Double,User> weightedUsers = new HashMap<>();

        for(User other: allUsers){
            double weight = 0.0;
            /* only do weights of other user*/
            if(u.getId() != other.getId()) {
                //fixme: check add weight if user course is in list of courses for other user
                //fixme: TAX 1.5 FOR TUTORS!
                for (Course uCourse : u.getCourses()) {
                    if (other.getCourses().contains(uCourse)) {
                        double add = SUBJECT_WEIGHT;

                        if (other.getUserType().equals("Tutor")) {
                            add *= 1.5;
                        }
                        weight += add;
                    }
                }
                weightedUsers.put(weight, other);
            }
        }

        //sort meetings and return the top three
        List<User> recommendedFriends = new ArrayList<>();

        //sort the map
        List<Map.Entry<Double, User>> sortedKeys = new ArrayList<>(weightedUsers.entrySet());
        Collections.sort(sortedKeys, Collections.reverseOrder(Map.Entry.comparingByKey()));

        System.out.println("Sorted map:");
        for (Map.Entry<Double, User> entry : sortedKeys) {
            System.out.println(entry.getKey());
        }

        //add the first three
        int count = 0;
        for (Map.Entry<Double, User> entry : sortedKeys) {
            if (count < 3) {
                recommendedFriends.add(entry.getValue());
                count++;
            }
            else {
                break;
            }
        }

        return recommendedFriends;
    }
}
    
    public static Set<User> getRecommendedTutors(User u, Set<User> allTutors) {
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

