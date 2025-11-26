package com.appdevg6.biteandbyte.repository;

import com.appdevg6.biteandbyte.entity.RecipeComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeCommentRepository extends JpaRepository<RecipeComment, Long> {
	List<RecipeComment> findByRecipeId(Long recipeId);
}
