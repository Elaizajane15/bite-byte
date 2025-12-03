package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.RecipeFavorite;
import com.appdevg6.biteandbyte.entity.RecipeFavoriteId;
import com.appdevg6.biteandbyte.repository.RecipeFavoriteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public interface RecipeFavoriteService {
	RecipeFavorite addFavorite(RecipeFavorite favorite);
	void removeFavorite(RecipeFavoriteId id);
	List<RecipeFavorite> findByUserId(Long userId);
}

@Service
class RecipeFavoriteServiceImpl implements RecipeFavoriteService {
	private final RecipeFavoriteRepository recipeFavoriteRepository;

	public RecipeFavoriteServiceImpl(RecipeFavoriteRepository recipeFavoriteRepository) {
		this.recipeFavoriteRepository = recipeFavoriteRepository;
	}

	@Override
	public RecipeFavorite addFavorite(RecipeFavorite favorite) {
		favorite.setCreatedAt(LocalDateTime.now());
		return recipeFavoriteRepository.save(favorite);
	}

	@Override
	public void removeFavorite(RecipeFavoriteId id) {
		Objects.requireNonNull(id, "id cannot be null");
		recipeFavoriteRepository.deleteById(id);
	}

	@Override
	public List<RecipeFavorite> findByUserId(Long userId) {
		return recipeFavoriteRepository.findByUserId(userId);
	}
}
