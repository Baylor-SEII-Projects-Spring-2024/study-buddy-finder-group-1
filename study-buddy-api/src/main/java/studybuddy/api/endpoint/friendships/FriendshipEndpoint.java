package studybuddy.api.endpoint.friendships;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studybuddy.api.friendships.Friendship;
import studybuddy.api.friendships.FriendshipService;

import java.util.List;

@RestController
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

    @PostMapping("/{friendshipId}/decline")
    public ResponseEntity<?> declineFriendRequest(@PathVariable Long friendshipId) {
        try {
            Friendship friendship = friendshipService.declineFriendRequest(friendshipId);
            return ResponseEntity.ok(friendship);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Friendship>> getPendingRequests() {
        List<Friendship> friendships = friendshipService.getPendingRequests();
        return ResponseEntity.ok(friendships);
    }

}