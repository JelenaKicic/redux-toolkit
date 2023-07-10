package diplomski.backend.models.requests;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseRequest {
    @NotNull
    private String title;
    private String description;
    private String categoryName;
    private Integer categoryId;
}
