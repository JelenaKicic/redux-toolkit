package diplomski.backend.controllers;

import diplomski.backend.models.dto.ExpenseDTO;
import diplomski.backend.models.dto.JwtUserDTO;
import diplomski.backend.models.requests.ExpenseRequest;
import diplomski.backend.services.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }


    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ExpenseDTO> getUserExpenses(Authentication auth) {
        JwtUserDTO jwtUser = (JwtUserDTO) auth.getPrincipal();
        return expenseService.getUserExpenses(jwtUser.getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ExpenseDTO create(@Valid @RequestBody ExpenseRequest expenseRequest, Authentication auth) {
        JwtUserDTO jwtUser = (JwtUserDTO) auth.getPrincipal();
        return expenseService.create(expenseRequest, jwtUser.getId());
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ExpenseDTO create(@PathVariable Integer id, @Valid @RequestBody ExpenseRequest expenseRequest, Authentication auth) {
        JwtUserDTO jwtUser = (JwtUserDTO) auth.getPrincipal();
        return expenseService.update(id, expenseRequest, jwtUser.getId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Integer id, Authentication auth) {
        JwtUserDTO jwtUser = (JwtUserDTO) auth.getPrincipal();
        expenseService.delete(id, jwtUser.getId());
    }
}
