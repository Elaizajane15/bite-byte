package com.appdevg6.biteandbyte.service;

import com.appdevg6.biteandbyte.entity.RecipeFavorite;
import com.appdevg6.biteandbyte.entity.RecipeFavoriteId;

import java.util.List;

public interface RecipeFavoriteService {
	RecipeFavorite addFavorite(RecipeFavorite favorite);
	void removeFavorite(RecipeFavoriteId id);
	List<RecipeFavorite> findByUserId(Long userId);
}
