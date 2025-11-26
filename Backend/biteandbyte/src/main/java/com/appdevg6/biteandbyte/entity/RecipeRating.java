package com.appdevg6.biteandbyte.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recipe_rating")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeRating {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "recipe_id", nullable = false)
	private Recipe recipe;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	private Integer rating;
	@Column(name = "created_at")
	private LocalDateTime createdAt;
}
