package com.appdevg6.biteandbyte.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recipe_favorites")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeFavorite {
	@EmbeddedId
	private RecipeFavoriteId id;

	@ManyToOne
	@MapsId("userId")
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@MapsId("recipeId")
	@JoinColumn(name = "recipe_id")
	private Recipe recipe;

	@Column(name = "created_at")
	private LocalDateTime createdAt;
}
