package diplomski.backend.controllers;

import diplomski.backend.models.dto.UserDTO;
import diplomski.backend.models.requests.LoginRequest;
import diplomski.backend.models.requests.UserRequest;
import diplomski.backend.services.AuthService;
import diplomski.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

@RestController
public class UserController {
    private final UserService userService;
    private final AuthService authService;
    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO register(@RequestBody @Valid UserRequest userRequest)  {
        return userService.register(userRequest);
    }

    @PostMapping("login")
    @ResponseStatus(HttpStatus.OK)
    public UserDTO login(@RequestBody @Valid LoginRequest request) {
        return authService.login(request);
    }
}
