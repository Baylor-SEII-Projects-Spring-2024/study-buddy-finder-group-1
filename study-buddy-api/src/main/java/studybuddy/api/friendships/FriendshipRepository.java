package studybuddy.api.friendships;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    @Query("SELECT f FROM Friendship f WHERE f.status = 'pending'")
    List<Friendship> findAllPending();

    @Query("SELECT f FROM Friendship f WHERE (f.requester.id = :userId OR f.requested.id = :userId) AND f.status = 'accepted'")
    List<Friendship> findAllByUserIdAndStatusAccepted(Long userId);
}
