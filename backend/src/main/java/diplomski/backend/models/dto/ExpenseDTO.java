package diplomski.backend.models.dto;

import lombok.Data;

@Data
public class ExpenseDTO {
    private Integer id;
    private String title;
    private String description;
    private Integer categoryId;
    private Integer userId;
}
