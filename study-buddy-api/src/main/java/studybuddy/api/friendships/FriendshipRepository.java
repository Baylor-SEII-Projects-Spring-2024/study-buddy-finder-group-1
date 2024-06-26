package studybuddy.api.friendships;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    @Query("SELECT f FROM Friendship f WHERE f.status = 'pending'")
    List<Friendship> findAllPending();

    @Query("SELECT f FROM Friendship f WHERE f.status = 'accepted'")
    List<Friendship> findAllAccepted();

    @Query("SELECT f FROM Friendship f WHERE (f.requester.id = :userId OR f.requested.id = :userId) AND f.status = 'accepted'")
    List<Friendship> findAllByUserIdAndStatusAccepted(Long userId);

    @Query("SELECT f FROM Friendship f WHERE (f.requester.id = :userId OR f.requested.id = :userId) AND f.status = 'pending'")
    List<Friendship> findAllByUserIdAndStatusPending(Long userId);

    @Query("SELECT COUNT(f) FROM Friendship f WHERE f.requested.id = :userId AND f.status = 'pending'")
    long countByUserIdAndStatusPending(@Param("userId") Long userId);
}