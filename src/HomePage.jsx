  import React, { useState } from 'react';
  import RecipeDetail from './RecipeDetail';
  import UserProfile from './UserProfile';
  import AddRecipeModal from './AddRecipeModal';
  import { mockRecipes, categories } from './recipeData';

  function RecipesPage({ currentUser, onLogout, setCurrentPage }) {
    const [recipes, setRecipes] = useState(mockRecipes);
    const [myRecipes, setMyRecipes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentView, setCurrentView] = useState('home'); // home, my-recipes, favorites, recipe-detail, profile
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
    const [userRating, setUserRating] = useState(0);

    const getFilteredRecipes = () => {
      let recipesToFilter = recipes;
      
      if (currentView === 'my-recipes') {
        recipesToFilter = myRecipes;
      } else if (currentView === 'favorites') {
        recipesToFilter = recipes.filter(r => favorites.includes(r.id));
      }

      return recipesToFilter.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
    };

    const filteredRecipes = getFilteredRecipes();

    const toggleFavorite = (recipeId) => {
      if (favorites.includes(recipeId)) {
        setFavorites(favorites.filter(id => id !== recipeId));
      } else {
        setFavorites([...favorites, recipeId]);
      }
    };

    const handleLike = (recipeId) => {
      setRecipes(recipes.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likes: recipe.likes + 1 }
          : recipe
      ));
    };

    const handleAddRecipe = (newRecipe) => {
      const recipe = {
        ...newRecipe,
        id: Date.now().toString(),
        author: currentUser.name,
        createdAt: new Date().toLocaleDateString(),
        likes: 0,
        rating: 0,
        totalRatings: 0,
        tips: []
      };
      setMyRecipes([...myRecipes, recipe]);
      setRecipes([...recipes, recipe]);
      setShowAddRecipeModal(false);
    };

    return (
      <div className="recipes-page">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="logo" onClick={() => setCurrentPage('home')} style={{cursor: 'pointer'}}>
              <div className="logo-icon">🍳</div>
              <div>
                <div className="logo-title">RecipeShare</div>
                <div className="logo-subtitle">Share & Discover</div>
              </div>
            </div>
            
            <div className="header-buttons">
              <button 
                className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => setCurrentView('home')}
              >
                🏠 Home
              </button>
              <button 
                className={`nav-btn ${currentView === 'my-recipes' ? 'active' : ''}`}
                onClick={() => setCurrentView('my-recipes')}
              >
                📖 My Recipes
              </button>
              <button 
                className={`nav-btn ${currentView === 'favorites' ? 'active' : ''}`}
                onClick={() => setCurrentView('favorites')}
              >
                ❤️ Favorites
              </button>
              <button className="add-recipe-btn" onClick={() => setShowAddRecipeModal(true)}>
                ➕ Add Recipe
              </button>
              <button className="user-info" onClick={() => setCurrentView('profile')}>
                <span className="user-icon">👤</span>
                {currentUser.name}
              </button>
              <button className="logout-button" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="recipes-container">
          {currentView === 'recipe-detail' && selectedRecipe ? (
            <RecipeDetail 
              recipe={selectedRecipe}
              onBack={() => setCurrentView('home')}
              isFavorited={favorites.includes(selectedRecipe.id)}
              onToggleFavorite={toggleFavorite}
              onLike={handleLike}
              userRating={userRating}
              onRate={setUserRating}
            />
          ) : currentView === 'profile' ? (
            <UserProfile 
              currentUser={currentUser}
              myRecipes={myRecipes}
              favorites={favorites}
              onBack={() => setCurrentView('home')}
            />
          ) : (
            <>
              {/* Hero Section */}
              <div className="recipes-hero">
                <h2 className="recipes-welcome">
                  Welcome back, <span className="gradient-text">{currentUser.name}</span>!
                </h2>
                <p className="recipes-subtitle">What delicious recipe will you discover today?</p>
              </div>

              {/* Search Section */}
              <div className="search-section">
                <div className="search-bar">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search recipes, ingredients, cuisines..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                {/* Category Pills */}
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

              {/* Recipes Section */}
              <div className="recipes-section">
                <div className="recipes-header">
                  <h3 className="recipes-title">
                    {currentView === 'home' && 'All Recipes'}
                    {currentView === 'my-recipes' && 'My Recipes'}
                    {currentView === 'favorites' && 'Favorite Recipes'}
                  </h3>
                  <div className="recipes-count">
                    {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {filteredRecipes.length > 0 ? (
                  <div className="recipes-grid">
                    {filteredRecipes.map(recipe => (
                      <div key={recipe.id} className="recipe-card" onClick={() => {
                        setSelectedRecipe(recipe);
                        setCurrentView('recipe-detail');
                      }}>
                        <div className="recipe-image-container">
                          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                          <button 
                            className={`favorite-btn ${favorites.includes(recipe.id) ? 'favorited' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(recipe.id);
                            }}
                          >
                            {favorites.includes(recipe.id) ? '❤️' : '🤍'}
                          </button>
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
                              <button className="save-btn" onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(recipe.id);
                              }}>
                                Save
                              </button>
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
                    <p>
                      {currentView === 'my-recipes' 
                        ? "You haven't added any recipes yet. Click 'Add Recipe' to share your first culinary creation!"
                        : currentView === 'favorites'
                        ? "You haven't favorited any recipes yet. Start exploring and save your favorites!"
                        : "Try adjusting your search or filter criteria to discover more delicious recipes."}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Add Recipe Modal */}
        {showAddRecipeModal && (
          <AddRecipeModal
            onClose={() => setShowAddRecipeModal(false)}
            onSubmit={handleAddRecipe}
          />
        )}
      </div>
    );
  }

  export default RecipesPage;
