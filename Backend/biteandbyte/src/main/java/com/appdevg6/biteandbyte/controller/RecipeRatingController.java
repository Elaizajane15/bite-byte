package com.appdevg6.biteandbyte.controller;

import com.appdevg6.biteandbyte.entity.Recipe;
import com.appdevg6.biteandbyte.entity.RecipeRating;
import com.appdevg6.biteandbyte.entity.User;
import com.appdevg6.biteandbyte.service.RecipeRatingService;
import com.appdevg6.biteandbyte.service.RecipeService;
import com.appdevg6.biteandbyte.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Objects;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
public class RecipeRatingController {
	private final RecipeRatingService ratingService;
	private final UserService userService;
	private final RecipeService recipeService;

	public RecipeRatingController(RecipeRatingService ratingService, UserService userService, RecipeService recipeService) {
		this.ratingService = ratingService;
		this.userService = userService;
		this.recipeService = recipeService;
	}

	@GetMapping("/recipe/{recipeId}")
	public ResponseEntity<List<RecipeRating>> getByRecipe(@PathVariable Long recipeId) {
		return ResponseEntity.ok(ratingService.findByRecipeId(recipeId));
	}

	@PostMapping
	public ResponseEntity<RecipeRating> create(@RequestBody RecipeRating payload) {
		if (payload.getRecipe() == null || payload.getUser() == null) return ResponseEntity.badRequest().build();
		Recipe recipe = recipeService.findById(payload.getRecipe().getId());
		User user = userService.findById(payload.getUser().getId());
		if (recipe == null || user == null) return ResponseEntity.badRequest().build();
		payload.setRecipe(recipe);
		payload.setUser(user);
		RecipeRating created = ratingService.create(payload);
		URI location = URI.create("/api/ratings/" + created.getId());
		Objects.requireNonNull(location);
		return ResponseEntity.created(location).body(created);
	}
}
