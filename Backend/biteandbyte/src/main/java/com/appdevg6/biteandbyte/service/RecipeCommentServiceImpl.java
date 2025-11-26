package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.RecipeComment;
import com.appdevg6.biteandbyte.repository.RecipeCommentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.List;

@Service
public class RecipeCommentServiceImpl implements RecipeCommentService {
	private final RecipeCommentRepository recipeCommentRepository;

	public RecipeCommentServiceImpl(RecipeCommentRepository recipeCommentRepository) {
		this.recipeCommentRepository = recipeCommentRepository;
	}

	@Override
	public RecipeComment create(RecipeComment comment) {
		comment.setCreatedAt(LocalDateTime.now());
		return recipeCommentRepository.save(comment);
	}

	@Override
	public List<RecipeComment> findByRecipeId(Long recipeId) {
		return recipeCommentRepository.findByRecipeId(recipeId);
	}

	@Override
	public void delete(Long id) {
		Objects.requireNonNull(id, "id cannot be null");
		recipeCommentRepository.deleteById(id);
	}
}
