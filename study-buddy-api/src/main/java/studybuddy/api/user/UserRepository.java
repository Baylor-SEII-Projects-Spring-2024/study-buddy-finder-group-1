package studybuddy.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email_address = :EMAIL_ADDRESS")
    Optional<User> findByEmail_Address(@Param("EMAIL_ADDRESS") String email);

    @Query("SELECT u FROM User u WHERE u.email_address = :EMAIL_ADDRESS AND u.password = :PASSWORD")
    Optional<User> findByEmail_AddressAndPassword(@Param("EMAIL_ADDRESS") String email, @Param("PASSWORD") String password);

}
