package com.appdevg6.biteandbyte.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeFavoriteId implements Serializable {
    private Long userId;
    private Long recipeId;
}
