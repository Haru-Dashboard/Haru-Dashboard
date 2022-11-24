package com.haru.api.category.service;

import com.haru.api.category.domain.entity.Category;
import com.haru.api.category.domain.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category getOne(String name) {
        Category category = categoryRepository.findByName(name);
        if (category == null) {
            category = create(name);
        }
        return category;
    }

    @Transactional
    public Category create(String name) {
        Category category = Category.create(name);
        Category savedCategory = categoryRepository.save(category);
        return savedCategory;
    }

    public List<String> search(String keyword) {
        List<Category> categories = categoryRepository.findTop20ByNameContaining(keyword);
        List<String> response = new ArrayList<>();
        categories.stream().map(category -> response.add(category.getName())).collect(Collectors.toList());
        return response;
    }
}
