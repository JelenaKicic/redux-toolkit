package diplomski.backend.services;

import diplomski.backend.models.dto.JwtUserDTO;
import diplomski.backend.models.entities.User;
import diplomski.backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public JwtUserDetailsService(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public JwtUserDTO loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if(user == null) {
            throw new UsernameNotFoundException(username);
        }

        JwtUserDTO jwtUserDTO = modelMapper.map(user, JwtUserDTO.class);
        jwtUserDTO.setRole("user");
        return jwtUserDTO;
    }
}
