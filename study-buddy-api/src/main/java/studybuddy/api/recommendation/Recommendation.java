package studybuddy.api.recommendation;

import org.springframework.cglib.core.Local;
import studybuddy.api.meeting.Meeting;
import studybuddy.api.user.User;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

public class Recommendation {
    static double FRIEND_WEIGHT = 0.6;
    static double TUTOR_WEIGHT = 5.0;
    static double SUBJECT_WEIGHT = 1;
    public static List<Meeting> getRecommendedMeetings(User u, List<Meeting> allMeetings, String subject, String desiredTime) {
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
            if (Objects.equals(m.getSubject(), subject)) {
                weight += SUBJECT_WEIGHT;
            }

            //adjust the weight based on how similar the time is

            //var for how far from desired time; 1 denotes the meeting happens at same time
            double distanceFromTarget = 1;

            //TODO PARSE THE TIMES AND ASSIGN
            LocalDate desiredLocalDateTime;
            LocalDate meetingTime;

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
        List<Meeting> recommendedMeetings = new ArrayList<>();

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
}
