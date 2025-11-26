package com.appdevg6.biteandbyte.controller;

import com.appdevg6.biteandbyte.entity.Recipe;
import com.appdevg6.biteandbyte.entity.RecipeFavorite;
import com.appdevg6.biteandbyte.entity.RecipeFavoriteId;
import com.appdevg6.biteandbyte.entity.User;
import com.appdevg6.biteandbyte.service.RecipeFavoriteService;
import com.appdevg6.biteandbyte.service.RecipeService;
import com.appdevg6.biteandbyte.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Objects;

import java.net.URI;

@RestController
@RequestMapping("/api/favorites")
public class RecipeFavoriteController {
	private final RecipeFavoriteService favoriteService;
	private final UserService userService;
	private final RecipeService recipeService;

	public RecipeFavoriteController(RecipeFavoriteService favoriteService, UserService userService, RecipeService recipeService) {
		this.favoriteService = favoriteService;
		this.userService = userService;
		this.recipeService = recipeService;
	}

	@PostMapping
	public ResponseEntity<RecipeFavorite> addFavorite(@RequestBody RecipeFavorite payload) {
		if (payload.getRecipe() == null || payload.getUser() == null) return ResponseEntity.badRequest().build();
		Recipe recipe = recipeService.findById(payload.getRecipe().getId());
		User user = userService.findById(payload.getUser().getId());
		if (recipe == null || user == null) return ResponseEntity.badRequest().build();
		RecipeFavorite fav = RecipeFavorite.builder()
				.id(new RecipeFavoriteId(user.getId(), recipe.getId()))
				.user(user)
				.recipe(recipe)
				.build();
		RecipeFavorite created = favoriteService.addFavorite(fav);
		URI location = URI.create("/api/favorites/" + created.getId().getUserId() + "-" + created.getId().getRecipeId());
		Objects.requireNonNull(location);
		return ResponseEntity.created(location).body(created);
	}

	@DeleteMapping
	public ResponseEntity<Void> removeFavorite(@RequestParam Long userId, @RequestParam Long recipeId) {
		RecipeFavoriteId id = new RecipeFavoriteId(userId, recipeId);
		favoriteService.removeFavorite(id);
		return ResponseEntity.noContent().build();
	}
}
