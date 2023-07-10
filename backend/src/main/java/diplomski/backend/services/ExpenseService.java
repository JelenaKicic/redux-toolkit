package diplomski.backend.services;

import diplomski.backend.exceptions.ForbiddenException;
import diplomski.backend.exceptions.NotFoundException;
import diplomski.backend.models.dto.CategoryDTO;
import diplomski.backend.models.dto.ExpenseDTO;
import diplomski.backend.models.entities.Category;
import diplomski.backend.models.entities.Expense;
import diplomski.backend.models.entities.User;
import diplomski.backend.models.requests.ExpenseRequest;
import diplomski.backend.repositories.ExpenseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ExpenseService {
    private final ModelMapper modelMapper;
    private final ExpenseRepository expenseRepository;
    private final CategoryService categoryService;

    @PersistenceContext
    private EntityManager entityManager;

    public ExpenseService(ExpenseRepository expenseRepository, CategoryService categoryService, ModelMapper modelMapper) {
        this.expenseRepository = expenseRepository;
        this.modelMapper = modelMapper;
        this.categoryService = categoryService;
    }

    public List<ExpenseDTO> getUserExpenses(Integer userId) {
        return expenseRepository.findByUserId(userId).stream().map(e -> modelMapper.map(e, ExpenseDTO.class)).collect(Collectors.toList());
   }

    public ExpenseDTO create(ExpenseRequest expenseRequest, Integer userId) {
        Expense expense = modelMapper.map(expenseRequest, Expense.class);

        CategoryDTO categoryDTO = categoryService.getOrCreateCategory(expenseRequest.getCategoryName(), expenseRequest.getCategoryId(), userId);
        expense.setCategory(modelMapper.map(categoryDTO, Category.class));

        User user = new User();
        user.setId(userId);
        expense.setUser(user);

        expense.setId(null);

        expense = expenseRepository.saveAndFlush(expense);

        return modelMapper.map(expense, ExpenseDTO.class);
    }

    public ExpenseDTO update(Integer id, ExpenseRequest expenseRequest, Integer userId) {
        Optional<Expense> expenseOptional = expenseRepository.findById(id);
        if(!expenseOptional.isPresent()) {
            throw new NotFoundException("Expense does not exist");
        }

        Expense existingExpense = expenseOptional.get();
        if(existingExpense.getUser().getId() != userId) {
            throw new ForbiddenException();
        }

        Expense newExpense = modelMapper.map(expenseRequest, Expense.class);
        newExpense.setUser(existingExpense.getUser());
        newExpense.setId(id);
        CategoryDTO categoryDTO = categoryService.getOrCreateCategory(expenseRequest.getCategoryName(), expenseRequest.getCategoryId(), userId);
        newExpense.setCategory(modelMapper.map(categoryDTO, Category.class));

        newExpense = expenseRepository.saveAndFlush(newExpense);
        entityManager.refresh(newExpense);

        return modelMapper.map(newExpense, ExpenseDTO.class);
    }

    public void delete(Integer id, Integer userId) {
        Optional<Expense> expense = expenseRepository.findById(id);
        if(!expense.isPresent()) {
            throw new NotFoundException("Expense does not exist");
        }

        if(expense.get().getUser().getId() != userId) {
            throw new ForbiddenException();
        }

        expenseRepository.delete(expense.get());
    }
}
