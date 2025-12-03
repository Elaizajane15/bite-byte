package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.Recipe;
import com.appdevg6.biteandbyte.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.List;

@Service
public class RecipeService {
	private final RecipeRepository recipeRepository;

	public RecipeService(RecipeRepository recipeRepository) {
		this.recipeRepository = recipeRepository;
	}

	public Recipe create(Recipe recipe) {
		recipe.setCreatedAt(LocalDateTime.now());
		return recipeRepository.save(recipe);
	}

	public Recipe findById(Long id) {
		Objects.requireNonNull(id, "id cannot be null");
		return recipeRepository.findById(id).orElse(null);
	}

	public List<Recipe> findAll() {
		return recipeRepository.findAll();
	}

	public Recipe update(Long id, Recipe recipe) {
		Recipe existing = findById(id);
		if (existing == null)
			return null;
		existing.setTitle(recipe.getTitle());
		existing.setDescription(recipe.getDescription());
		existing.setIngredients(recipe.getIngredients());
		existing.setInstruction(recipe.getInstruction());
		existing.setCookTime(recipe.getCookTime());
		existing.setCuisine(recipe.getCuisine());
		existing.setCategory(recipe.getCategory());
		existing.setCoverPhotoUrl(recipe.getCoverPhotoUrl());
		existing.setUpdateAt(LocalDateTime.now());
		return recipeRepository.save(existing);
	}

	public void delete(Long id) {
		Objects.requireNonNull(id, "id cannot be null");
		recipeRepository.deleteById(id);
	}
}
