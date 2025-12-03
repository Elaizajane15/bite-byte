package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.RecipeRating;
import com.appdevg6.biteandbyte.repository.RecipeRatingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

public interface RecipeRatingService {
	RecipeRating create(RecipeRating rating);
	List<RecipeRating> findByRecipeId(Long recipeId);
	List<RecipeRating> findByUserId(Long userId);
}

@Service
class RecipeRatingServiceImpl implements RecipeRatingService {
	private final RecipeRatingRepository recipeRatingRepository;

	public RecipeRatingServiceImpl(RecipeRatingRepository recipeRatingRepository) {
		this.recipeRatingRepository = recipeRatingRepository;
	}

	@Override
	public RecipeRating create(RecipeRating rating) {
		rating.setCreatedAt(LocalDateTime.now());
		return recipeRatingRepository.save(rating);
	}

	@Override
	public List<RecipeRating> findByRecipeId(Long recipeId) {
		return recipeRatingRepository.findByRecipeId(recipeId);
	}

	@Override
	public List<RecipeRating> findByUserId(Long userId) {
		return recipeRatingRepository.findByUserId(userId);
	}
}
