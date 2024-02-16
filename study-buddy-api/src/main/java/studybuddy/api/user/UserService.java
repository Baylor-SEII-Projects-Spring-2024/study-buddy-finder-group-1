package studybuddy.api.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUser(Long userId) { return userRepository.findById(userId); }

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
