package com.appdevg6.biteandbyte.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "author_id", nullable = false)
	private User author;

	private String title;
	@Column(columnDefinition = "TEXT")
	private String description;

	@Column(columnDefinition = "TEXT")
	private String ingredients;

	@Column(columnDefinition = "TEXT")
	private String instruction;

	@Column(name = "cook_time")
	private Integer cookTime; // in minutes
	private String cuisine;
	private String category;
	@Column(name = "cover_photo_url")
	private String coverPhotoUrl;
	@Column(name = "created_at")
	private LocalDateTime createdAt;
	@Column(name = "update_at")
	private LocalDateTime updateAt;

	@OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
	private List<RecipeComment> comments;

	@OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
	private List<RecipeRating> ratings;
}
