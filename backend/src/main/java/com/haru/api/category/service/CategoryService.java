package com.haru.api.category.service;

import com.haru.api.category.domain.entity.Category;
import com.haru.api.category.domain.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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
}
