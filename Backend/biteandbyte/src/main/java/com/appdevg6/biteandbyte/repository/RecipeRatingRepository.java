package com.appdevg6.biteandbyte.repository;

import com.appdevg6.biteandbyte.entity.RecipeRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRatingRepository extends JpaRepository<RecipeRating, Long> {
	List<RecipeRating> findByRecipeId(Long recipeId);
	List<RecipeRating> findByUserId(Long userId);
}
