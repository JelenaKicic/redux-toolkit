package diplomski.backend.models.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Integer id;
    private String username;
    private String name;
    private String surname;
    private String token;
}
