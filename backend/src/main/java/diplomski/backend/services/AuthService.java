package diplomski.backend.services;

import diplomski.backend.exceptions.NotFoundException;
import diplomski.backend.exceptions.UnauthorizedException;
import diplomski.backend.models.dto.JwtUserDTO;
import diplomski.backend.models.dto.UserDTO;
import diplomski.backend.models.requests.LoginRequest;
import diplomski.backend.repositories.UserRepository;
import diplomski.backend.util.LoggingUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;


    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, ModelMapper modelMapper) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public UserDTO findById(Integer id) throws NotFoundException {
        return modelMapper.map(userRepository.findById(id).orElseThrow(NotFoundException::new), UserDTO.class);
    }

    public UserDTO login(LoginRequest request) {
        UserDTO response = null;
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );
            JwtUserDTO user = (JwtUserDTO) authenticate.getPrincipal();
            response = findById(user.getId());
            user.setRole("user");
            response.setToken(generateJwt(user));
        } catch (Exception ex) {
            LoggingUtil.logException(ex, getClass());
            throw new UnauthorizedException();
        }
        return response;
    }

    private String generateJwt(JwtUserDTO user) {
        return Jwts.builder()
                .setId(user.getId().toString())
                .setSubject(user.getUsername())
                .claim("role", user.getRole())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime)))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }
}
