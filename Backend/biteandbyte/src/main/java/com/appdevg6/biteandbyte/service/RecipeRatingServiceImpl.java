package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.RecipeRating;
import com.appdevg6.biteandbyte.repository.RecipeRatingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecipeRatingServiceImpl implements RecipeRatingService {
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
	public RecipeRating upsert(Long recipeId, Long userId, Integer rating) {
		RecipeRating existing = recipeRatingRepository.findByRecipeIdAndUserId(recipeId, userId);
		if (existing != null) {
			existing.setRating(rating);
			return recipeRatingRepository.save(existing);
		}
		RecipeRating created = RecipeRating.builder()
			.recipe(com.appdevg6.biteandbyte.entity.Recipe.builder().id(recipeId).build())
			.user(com.appdevg6.biteandbyte.entity.User.builder().id(userId).build())
			.rating(rating)
			.createdAt(LocalDateTime.now())
			.build();
		return recipeRatingRepository.save(created);
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
