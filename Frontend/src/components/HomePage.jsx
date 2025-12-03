import React, { useState, useEffect } from 'react';
import RecipeDetail from './RecipeDetail';
import UserProfile from './UserProfile';
import AddRecipeModal from './AddRecipeModal';
import { mockRecipes, categories } from './recipeData';
import { useToast } from './ToastContext';

function RecipesPage({ currentUser, onLogout, setCurrentPage }) {
  const [recipes, setRecipes] = useState(mockRecipes);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentView, setCurrentView] = useState(() => {
    try { return localStorage.getItem('currentView') || 'home'; } catch (_) { return 'home'; }
  });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const { showToast } = useToast();

  const handleUpdateProfile = async ({ name, email, bio, currentPassword, newPassword }) => {
    if (!currentUser || !currentUser.id) {
      showToast('Please log in first.', 'error');
      return;
    }
    const parts = (name || '').trim().split(/\s+/);
    const firstname = parts[0] || '';
    const lastname = parts.slice(1).join(' ') || '';
    const password = (newPassword && newPassword.trim()) || (currentPassword && currentPassword.trim()) || '';
    if (!email || !password) {
      showToast('Email and current password are required.', 'error');
      return;
    }
    try {
      const res = await fetch(`/api/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password, bio })
      });
      if (!res.ok) {
        showToast('Failed to update profile.', 'error');
        return;
      }
      await res.json();
      showToast('Profile updated.', 'success');
    } catch (e) {
      showToast('Network error.', 'error');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/recipes');
        if (!res.ok) return;
        const data = await res.json();
        const mapped = data.map(r => ({
          id: r.id,
          title: r.title || '',
          description: r.description || '',
          ingredients: typeof r.ingredients === 'string' ? r.ingredients.split(';').map(s => s.trim()).filter(Boolean) : [],
          instructions: typeof r.instruction === 'string' ? r.instruction.split(';').map(s => s.trim()).filter(Boolean) : [],
          cookTime: r.cookTime || 0,
          category: r.category || 'General',
          difficulty: 'Medium',
          image: r.coverPhotoUrl || '',
          author: r.author && (r.author.firstname ? `${r.author.firstname}${r.author.lastname ? ' ' + r.author.lastname : ''}` : r.author.email),
          authorId: r.author && r.author.id,
          createdAt: r.createdAt || '',
          likes: 0,
          rating: 0,
          totalRatings: 0,
          tips: []
        }));
        setRecipes(mapped);
        try {
          const savedId = localStorage.getItem('selectedRecipeId');
          const savedView = localStorage.getItem('currentView');
          if (savedView) setCurrentView(savedView);
          if (savedId) {
            const found = mapped.find(r => String(r.id) === String(savedId));
            if (found) { setSelectedRecipe(found); setCurrentView('recipe-detail'); }
          }
        } catch (_) { }
      } catch (e) {
        /* no-op */
      }
    })();
  }, []);

  useEffect(() => {
    try { localStorage.setItem('currentView', currentView); } catch (_) { }
  }, [currentView]);

  useEffect(() => {
    try { localStorage.setItem('selectedRecipeId', selectedRecipe ? String(selectedRecipe.id) : ''); } catch (_) { }
  }, [selectedRecipe]);

  const getFilteredRecipes = () => {
    let recipesToFilter = recipes;

    if (currentView === 'my-recipes') {
      recipesToFilter = myRecipes;
    } else if (currentView === 'favorites') {
      recipesToFilter = recipes.filter(r => favorites.includes(r.id));
    }

    return recipesToFilter.filter(recipe => {
      const title = (recipe.title || '').toLowerCase();
      const desc = (recipe.description || '').toLowerCase();
      const matchesSearch = title.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredRecipes = getFilteredRecipes();

  const toggleFavorite = (recipeId) => {
    if (!currentUser || !currentUser.id) {
      showToast('Please login first to save recipes.', 'error');
      setCurrentPage('login');
      return;
    }
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

  const handleAddRecipe = async (newRecipe) => {
    if (!currentUser || !currentUser.id) {
      showToast('Please log in to add recipes.', 'error');
      return;
    }
    try {
      const payload = {
        title: newRecipe.title,
        description: newRecipe.description,
        ingredients: (newRecipe.ingredients || []).join('; '),
        instruction: (newRecipe.instructions || []).join('; '),
        cookTime: Number(newRecipe.cookTime || 0),
        category: newRecipe.category || 'General',
        coverPhotoUrl: newRecipe.image || '',
        author: { id: Number(currentUser.id) }
      };
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        if (res.status === 400) {
          showToast('Invalid recipe data or author. Please log in again.', 'error');
        } else {
          showToast('Failed to add recipe.', 'error');
        }
        return;
      }
      const r = await res.json();
      const mapped = {
        id: r.id,
        title: r.title,
        description: r.description || '',
        ingredients: typeof r.ingredients === 'string' ? r.ingredients.split(';').map(s => s.trim()).filter(Boolean) : [],
        instructions: typeof r.instruction === 'string' ? r.instruction.split(';').map(s => s.trim()).filter(Boolean) : [],
        cookTime: r.cookTime || 0,
        category: r.category || 'General',
        difficulty: 'Medium',
        image: r.coverPhotoUrl || '',
        author: currentUser.name,
        authorId: currentUser.id,
        createdAt: new Date().toLocaleDateString(),
        likes: 0,
        rating: 0,
        totalRatings: 0,
        tips: []
      };
      setMyRecipes([...myRecipes, mapped]);
      setRecipes([...recipes, mapped]);
      setShowAddRecipeModal(false);
      showToast('Recipe added.', 'success');
    } catch (e) {
      showToast('Network error.', 'error');
    }
  };

  const handleDeleteRecipe = (recipeId) => {
    setRecipes(recipes.filter(r => r.id !== recipeId));
    setMyRecipes(myRecipes.filter(r => r.id !== recipeId));
    setFavorites(favorites.filter(id => id !== recipeId));
    setCurrentView('home');
  };

  return (
    <div className="recipes-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>
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
          </div>
          <div className="header-actions">
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
            onRate={async (star) => {
              setUserRating(star);
              if (currentUser && currentUser.id) {
                try {
                  const payload = { recipe: { id: selectedRecipe.id }, user: { id: currentUser.id }, rating: star };
                  await fetch('/api/ratings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                  showToast('Thanks for rating.', 'success');
                } catch (e) {
                  /* no-op */
                }
              }
            }}
            onDelete={handleDeleteRecipe}
            currentUser={currentUser}
            onRecipeUpdated={(updated) => {
              setSelectedRecipe(updated);
              setRecipes(recipes.map(r => r.id === updated.id ? updated : r));
              setMyRecipes(myRecipes.map(r => r.id === updated.id ? updated : r));
            }}
            canEdit={currentUser && selectedRecipe && String(selectedRecipe.authorId) === String(currentUser.id)}
          />
        ) : currentView === 'profile' ? (
          <UserProfile
            currentUser={currentUser}
            myRecipes={myRecipes}
            favorites={favorites}
            onBack={() => setCurrentView('home')}
            onUpdateProfile={handleUpdateProfile}
          />
        ) : (
          <>
            {/* Hero Section */}
            <div className="recipes-hero">
              <h2 className="recipes-welcome">
                {currentUser && currentUser.name && currentUser.name !== 'Guest'
                  ? (<><span>Welcome back, </span><span className="gradient-text">{currentUser.name}</span><span>!</span></>)
                  : 'Welcome back!'}
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
