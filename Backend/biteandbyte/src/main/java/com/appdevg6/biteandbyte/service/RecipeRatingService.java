package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.RecipeRating;

import java.util.List;

public interface RecipeRatingService {
	RecipeRating create(RecipeRating rating);
	RecipeRating upsert(Long recipeId, Long userId, Integer rating);
	List<RecipeRating> findByRecipeId(Long recipeId);
	List<RecipeRating> findByUserId(Long userId);
}
