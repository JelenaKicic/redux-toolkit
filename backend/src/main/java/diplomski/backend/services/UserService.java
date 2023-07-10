package diplomski.backend.services;

import diplomski.backend.exceptions.ConflictException;
import diplomski.backend.exceptions.NotFoundException;
import diplomski.backend.models.dto.UserDTO;
import diplomski.backend.models.entities.User;
import diplomski.backend.models.requests.LoginRequest;
import diplomski.backend.models.requests.UserRequest;
import diplomski.backend.repositories.UserRepository;
import diplomski.backend.security.AuthorizationFilter;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
@Transactional
public class UserService {
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder;

    @PersistenceContext
    private EntityManager entityManager;
    

    public UserService(UserRepository userRepository, AuthService authService, ModelMapper modelMapper, PasswordEncoder passwordEncoder, AuthorizationFilter authorizationFilter) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO register(UserRequest userRequest) throws NotFoundException {
        if (userRepository.existsByUsername(userRequest.getUsername())) {
            throw new ConflictException();
        }

        User entity = modelMapper.map(userRequest, User.class);
        entity.setPassword(passwordEncoder.encode(entity.getPassword()));
        insert(entity);

        LoginRequest loginRequest = new LoginRequest(userRequest.getUsername(), userRequest.getPassword());

        return authService.login(loginRequest);
    }

    public UserDTO insert(User User) {
        User.setId(null);
        User = userRepository.saveAndFlush(User);
        entityManager.refresh(User);
        return modelMapper.map(User, UserDTO.class);
    }

}

