package diplomski.backend.models.requests;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class UserRequest {
    @NotNull
    private String username;
    @NotNull
    private String password;
    @NotNull
    private String name;
    @NotNull
    private String surname;
}
