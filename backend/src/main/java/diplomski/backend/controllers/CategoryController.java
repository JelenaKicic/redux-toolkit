package diplomski.backend.controllers;

import diplomski.backend.models.dto.CategoryDTO;
import diplomski.backend.models.dto.JwtUserDTO;
import diplomski.backend.models.requests.CategoryRequest;
import diplomski.backend.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CategoryDTO> getUserCategories(Authentication auth) {
        JwtUserDTO jwtUser = (JwtUserDTO) auth.getPrincipal();
        return categoryService.getUserCategories(jwtUser.getId());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryDTO create(@Valid @RequestBody CategoryRequest categoryRequest, Authentication auth) {
        JwtUserDTO jwtUser = (JwtUserDTO) auth.getPrincipal();
        return categoryService.create(categoryRequest.getName(), jwtUser.getId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable Integer id, Authentication auth) {
        JwtUserDTO jwtUser = (JwtUserDTO) auth.getPrincipal();

        categoryService.delete(id, jwtUser.getId());
    }
}
