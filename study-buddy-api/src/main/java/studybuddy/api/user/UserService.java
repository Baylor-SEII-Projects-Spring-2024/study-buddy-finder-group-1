package studybuddy.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUser(Long userId) { return userRepository.findById(userId); }

    public Optional<User> findUserByEmail(String email) { return userRepository.findByEmail_Address(email); }

    public boolean attemptLogin(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail_AddressAndPassword(email, password);
        if (userOptional.isPresent()) {
            // Update last login timestamp
            User user = userOptional.get();
            user.setLastLogin(new Date()); // Assuming you're using java.util.Date
            userRepository.save(user);
        }
        return userOptional.isPresent();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public void changePassword(Long userId, String newPassword) {
        Optional<User> optionalUser = findUser(userId);

        optionalUser.ifPresent(user -> {
            user.setPassword(newPassword);
            userRepository.save(user);
        });
    }
    public void deleteUser(Long userId) { userRepository.deleteById(userId); }
}