package diplomski.backend.repositories;

import diplomski.backend.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>  {
    User findByUsername(String username);
    Boolean existsByUsername(String username);
}
