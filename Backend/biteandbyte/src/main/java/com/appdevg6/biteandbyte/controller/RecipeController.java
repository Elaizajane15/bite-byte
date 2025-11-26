package com.appdevg6.biteandbyte.controller;

import com.appdevg6.biteandbyte.entity.Recipe;
import com.appdevg6.biteandbyte.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Objects;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
	private final RecipeService recipeService;

	public RecipeController(RecipeService recipeService) {
		this.recipeService = recipeService;
	}

	@GetMapping
	public ResponseEntity<List<Recipe>> getAll() {
		return ResponseEntity.ok(recipeService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Recipe> getById(@PathVariable Long id) {
		Recipe r = recipeService.findById(id);
		if (r == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(r);
	}

	@PostMapping
	public ResponseEntity<Recipe> create(@RequestBody Recipe recipe) {
		Recipe created = recipeService.create(recipe);
		URI location = URI.create("/api/recipes/" + created.getId());
		Objects.requireNonNull(location);
		return ResponseEntity.created(location).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Recipe> update(@PathVariable Long id, @RequestBody Recipe recipe) {
		Recipe updated = recipeService.update(id, recipe);
		if (updated == null) return ResponseEntity.notFound().build();
		return ResponseEntity.ok(updated);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		recipeService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
