package diplomski.backend.services;

import diplomski.backend.exceptions.ConflictException;
import diplomski.backend.exceptions.ForbiddenException;
import diplomski.backend.exceptions.NotFoundException;
import diplomski.backend.models.dto.CategoryDTO;
import diplomski.backend.models.entities.Category;
import diplomski.backend.models.entities.User;
import diplomski.backend.repositories.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final ModelMapper modelMapper;
    private final CategoryRepository categoryRepository;


    public CategoryService(CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    public CategoryDTO getOrCreateCategory(String categoryName, Integer categoryId, Integer userId) throws NotFoundException {
        if(categoryName != null) {
            return create(categoryName, userId);

        } else {
            return findById(categoryId);
        }
    }

    public CategoryDTO findById(Integer id) throws NotFoundException {
        return modelMapper.map(categoryRepository.findById(id).orElseThrow(NotFoundException::new), CategoryDTO.class);
    }

    public List<CategoryDTO> findByName(String name) throws NotFoundException {
        return  categoryRepository.findByName(name).stream().map(e -> modelMapper.map(e, CategoryDTO.class)).collect(Collectors.toList());
    }

    public List<CategoryDTO> getUserCategories(Integer userId) {
        return categoryRepository.findByUserId(userId).stream().map(e -> modelMapper.map(e, CategoryDTO.class)).collect(Collectors.toList());
    }

    public CategoryDTO create(String name, Integer userId) {
        Category category = new Category();
        category.setName(name.toLowerCase());

        if(findByName(category.getName()).size() > 0) {
            throw new ConflictException("Service already exists");
        }

        User user = new User();
        user.setId(userId);
        category.setUser(user);
        category.setId(null);
        category = categoryRepository.saveAndFlush(category);

        return modelMapper.map(category, CategoryDTO.class);
    }

    public void delete(Integer id, Integer userId) {
        Optional<Category> category = categoryRepository.findById(id);
        if(!category.isPresent()) {
            throw new NotFoundException("Category does not exist");
        }

        if(category.get().getUser().getId() != userId) {
            throw new ForbiddenException();
        }

        categoryRepository.delete(category.get());
    }
}
