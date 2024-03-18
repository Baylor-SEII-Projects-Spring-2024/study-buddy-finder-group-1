package studybuddy.api.friendships;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studybuddy.api.user.User;
import studybuddy.api.user.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class FriendshipService {
    @Autowired
    FriendshipRepository friendshipRepository;

    @Autowired
    UserRepository userRepository;

    public Friendship sendFriendRequest(Long requesterId, Long requestedId) {
        Friendship friendship = new Friendship();

        User requester = userRepository.findById(requesterId).orElseThrow(() -> new EntityNotFoundException("Requester not found"));
        User requested = userRepository.findById(requestedId).orElseThrow(() -> new EntityNotFoundException("Requested not found"));

        friendship.setRequester(requester);
        friendship.setRequested(requested);
        friendship.setStatus("pending");

        return friendshipRepository.save(friendship);

    }

    @Transactional
    public Friendship acceptFriendRequest(Long friendshipId) {
        Friendship friendship = friendshipRepository.findById(friendshipId).orElseThrow(() -> new RuntimeException("Friend request not found."));

        friendship.setStatus("accepted");
        return friendshipRepository.save(friendship);
    }

    @Transactional
    public Friendship declineFriendRequest(Long friendshipId) {
        Friendship friendship = friendshipRepository.findById(friendshipId).orElseThrow(() -> new RuntimeException("Friend request not found."));

        friendship.setStatus("declined");
        return friendshipRepository.save(friendship);
    }

    public List<Friendship> getPendingRequests() {
        return friendshipRepository.findAllPending();
    }

    public List<User> getAllFriends(Long userId) {
        List<Friendship> friendships = friendshipRepository.findAllByUserIdAndStatusAccepted(userId);
        return friendships.stream()
                .flatMap(friendship -> Stream.of(friendship.getRequester(), friendship.getRequested()))
                .distinct()
                .filter(user -> !user.getId().equals(userId))
                .collect(Collectors.toList());
    }

}
