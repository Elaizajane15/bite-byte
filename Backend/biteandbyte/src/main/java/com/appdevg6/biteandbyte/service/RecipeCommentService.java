package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.RecipeComment;

import java.util.List;

public interface RecipeCommentService {
	RecipeComment create(RecipeComment comment);
	List<RecipeComment> findByRecipeId(Long recipeId);
	void delete(Long id);
}
