package com.appdevg6.biteandbyte.controller;

import com.appdevg6.biteandbyte.entity.Recipe;
import com.appdevg6.biteandbyte.entity.RecipeComment;
import com.appdevg6.biteandbyte.entity.User;
import com.appdevg6.biteandbyte.service.RecipeCommentService;
import com.appdevg6.biteandbyte.service.RecipeService;
import com.appdevg6.biteandbyte.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Objects;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class RecipeCommentController {
	private final RecipeCommentService commentService;
	private final RecipeService recipeService;
	private final UserService userService;

	public RecipeCommentController(RecipeCommentService commentService, RecipeService recipeService, UserService userService) {
		this.commentService = commentService;
		this.recipeService = recipeService;
		this.userService = userService;
	}

	@GetMapping("/recipe/{recipeId}")
	public ResponseEntity<List<RecipeComment>> getByRecipe(@PathVariable Long recipeId) {
		return ResponseEntity.ok(commentService.findByRecipeId(recipeId));
	}

	@PostMapping
	public ResponseEntity<RecipeComment> create(@RequestBody RecipeComment payload) {
		// payload must include recipe.id and user.id
		if (payload.getRecipe() == null || payload.getUser() == null) {
			return ResponseEntity.badRequest().build();
		}
		Recipe recipe = recipeService.findById(payload.getRecipe().getId());
		User user = userService.findById(payload.getUser().getId());
		if (recipe == null || user == null) return ResponseEntity.badRequest().build();
		payload.setRecipe(recipe);
		payload.setUser(user);
		RecipeComment created = commentService.create(payload);
		URI location = URI.create("/api/comments/" + created.getId());
		Objects.requireNonNull(location);
		return ResponseEntity.created(location).body(created);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		commentService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
