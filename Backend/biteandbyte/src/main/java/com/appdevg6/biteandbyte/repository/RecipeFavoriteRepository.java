package com.appdevg6.biteandbyte.repository;

import com.appdevg6.biteandbyte.entity.RecipeFavorite;
import com.appdevg6.biteandbyte.entity.RecipeFavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeFavoriteRepository extends JpaRepository<RecipeFavorite, RecipeFavoriteId> {
	List<RecipeFavorite> findByUserId(Long userId);
	List<RecipeFavorite> findByRecipeId(Long recipeId);
}
