import React, { useState } from 'react';
import RecipeDetail from './RecipeDetail';
import { mockRecipes, categories } from './recipeData';
import { useToast } from './ToastContext';

function LandingPage({ setCurrentPage }) {
    const [recipes] = useState(mockRecipes);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const getFilteredRecipes = () => {
        return recipes.filter(recipe => {
            const matchesSearch =
                recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === 'All' || recipe.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    };

    const filteredRecipes = getFilteredRecipes();
    const { showToast } = useToast();

    // If a recipe is selected, show RecipeDetail as a full  page
    if (selectedRecipe) {
        return (
            <RecipeDetail
                recipe={selectedRecipe}
                onBack={() => setSelectedRecipe(null)}
                isFavorited={false}
                onToggleFavorite={() => {
                    showToast("Please login first to save recipes.", 'error');
                    setCurrentPage('login');
                }}
                onLike={() => { }}
                userRating={0}
                onRate={() => { }}
                canEdit={false}
            />
        );
    }

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon">🍳</div>
                        <div>
                            <div className="logo-title">RecipeShare</div>
                            <div className="logo-subtitle">Share & Discover</div>
                        </div>
                    </div>
                    <div className="header-buttons-container">
                        <button className="home-button">🏠 Home</button>
                    </div>
                    <div className="header-buttons">
                        <button className="login-button" onClick={() => setCurrentPage('login')}>Login</button>
                        <button className="signup-button" onClick={() => setCurrentPage('signup')}>Sign Up</button>
                    </div>
                </div>
            </header>

            {/* Welcome Section */}
            <div className="recipes-hero">
                <h2 className="recipes-welcome">Welcome, visitor!</h2>
                <p className="recipes-subtitle">Discover delicious recipes today!</p>
            </div>

            {/* Search Section */}
            <div className="search-section">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search recipes, ingredients, cuisines..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="category-pills">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Recipes Grid */}
            <div className="recipes-section">
                {filteredRecipes.length > 0 ? (
                    <div className="recipes-grid">
                        {filteredRecipes.map(recipe => (
                            <div
                                key={recipe.id}
                                className="recipe-card"
                                onClick={() => setSelectedRecipe(recipe)}
                            >
                                <div className="recipe-image-container">
                                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                                    <div className="recipe-difficulty-badge">{recipe.difficulty}</div>
                                </div>
                                <div className="recipe-content">
                                    <div className="recipe-category-badge">{recipe.category}</div>
                                    <h4 className="recipe-title">{recipe.title}</h4>
                                    <p className="recipe-description">{recipe.description}</p>
                                    <div className="recipe-meta">
                                        <span className="recipe-meta-item">⏱️ {recipe.cookTime}</span>
                                        <span className="recipe-meta-item">⭐ {recipe.rating.toFixed(1)}</span>
                                        <span className="recipe-meta-item">({recipe.totalRatings} ratings)</span>
                                    </div>
                                    <div className="recipe-footer">
                                        <span className="recipe-author">By {recipe.author}</span>
                                        <div className="recipe-actions">
                                            <span className="recipe-likes">👍 {recipe.likes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-recipes">
                        <div className="no-recipes-icon">👨‍🍳</div>
                        <h3>No recipes found</h3>
                        <p>Try adjusting your search or filter criteria to discover more delicious recipes.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LandingPage;
