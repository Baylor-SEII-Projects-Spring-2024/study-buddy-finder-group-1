package studybuddy.api.endpoint.friendships;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.friendships.Friendship;
import studybuddy.api.friendships.FriendshipService;
import studybuddy.api.user.User;
import org.springframework.http.HttpStatus;


import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "http://34.16.179.242:3000")
@RequestMapping("/friendships")
public class FriendshipEndpoint {

    @Autowired
    private FriendshipService friendshipService;

    @PostMapping("/request")
    public ResponseEntity<?> sendFriendRequest(@RequestParam Long requesterId, @RequestParam Long requestedId) {
        try {
            Friendship friendship = friendshipService.sendFriendRequest(requesterId, requestedId);
            return ResponseEntity.ok(friendship);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{friendshipId}/accept")
    public ResponseEntity<?> acceptFriendRequest(@PathVariable Long friendshipId) {
        try {
            Friendship friendship = friendshipService.acceptFriendRequest(friendshipId);
            return ResponseEntity.ok(friendship);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{friendshipId}/decline")
    public ResponseEntity<?> declineFriendRequest(@PathVariable Long friendshipId) {
        try {
            friendshipService.declineFriendRequest(friendshipId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Friendship>> getPendingRequests() {
        List<Friendship> friendships = friendshipService.getPendingRequests();
        return ResponseEntity.ok(friendships);
    }

    @GetMapping("/pending/{userId}")
    public ResponseEntity<List<Friendship>> getPendingRequestsFromUser(@PathVariable Long userId) {
        List<Friendship> friendships = friendshipService.getPendingRequestsFromUser(userId);
        return ResponseEntity.ok(friendships);
    }

    @GetMapping("/pending/count/{userId}")
    public ResponseEntity<Long> getPendingRequestsCount(@PathVariable Long userId) {
        long count = friendshipService.getPendingRequestsCount(userId);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/accepted")
    public ResponseEntity<List<Friendship>> getAcceptedRequests() {
        List<Friendship> friendships = friendshipService.getAcceptedRequests();
        return ResponseEntity.ok(friendships);
    }

    @GetMapping("/{userId}/friends")
    public ResponseEntity<List<User>> getAllFriends(@PathVariable Long userId) {
        List<User> friends = friendshipService.getAllFriends(userId);
        return ResponseEntity.ok(friends);
    }
}