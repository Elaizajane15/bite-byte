package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.Recipe;

import java.util.List;

public interface RecipeService {
	Recipe create(Recipe recipe);
	Recipe findById(Long id);
	List<Recipe> findAll();
	Recipe update(Long id, Recipe recipe);
	void delete(Long id);
}
