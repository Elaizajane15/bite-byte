import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import RecipeDetail from './RecipeDetail';
import './App.css';
import { ToastProvider } from './components/ToastContext';
import { useToast } from './components/ToastContext';

function App() {
  const initialUser = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('currentUser') || '{"name":"Guest"}')) : { name: 'Guest' };
  const [currentUser, setCurrentUser] = useState(initialUser);

  useEffect(() => {
    try { localStorage.setItem('currentUser', JSON.stringify(currentUser || { name: 'Guest' })); } catch (_) {}
  }, [currentUser]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleSignup = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser({ name: 'Guest' });
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentView');
      localStorage.removeItem('selectedRecipeId');
    } catch (_) {}
  };

  const handleUserUpdated = (user) => {
    setCurrentUser(user);
  };

  return (
    <ToastProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
          <Route path="/home" element={<HomePage currentUser={currentUser} onLogout={handleLogout} onUserUpdated={handleUserUpdated} />} />
          <Route path="/recipes/:id" element={<RecipeDetailRoute currentUser={currentUser} onLogout={handleLogout} />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </HashRouter>
    </ToastProvider>
  );
}

export default App;

function RecipeDetailRoute({ currentUser, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [recipe, setRecipe] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/recipes/${id}`);
        if (!res.ok) return;
        const r = await res.json();
        const mapped = {
          id: r.id,
          title: r.title || '',
          description: r.description || '',
          ingredients: typeof r.ingredients === 'string' ? r.ingredients.split(/[\n;]+/).map(s => s.trim()).filter(Boolean) : [],
          instructions: typeof r.instruction === 'string' ? r.instruction.split(/[\n;]+/).map(s => s.trim()).filter(Boolean) : [],
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
        };
        setRecipe(mapped);
      } catch (_) {}
    })();
  }, [id]);

  if (!recipe) return <div style={{padding: 24}}>Loading recipe...</div>;

  return (
    <RecipeDetail
      recipe={recipe}
      onBack={() => navigate(-1)}
      isFavorited={isFavorited}
      onToggleFavorite={async () => {
        if (!currentUser || !currentUser.id) {
          showToast('Please login first to save recipes.', 'error');
          navigate('/login');
          return;
        }
        try {
          if (isFavorited) {
            const res = await fetch(`/api/favorites?userId=${currentUser.id}&recipeId=${recipe.id}`, { method: 'DELETE' });
            if (!res.ok) {
              showToast('Failed to remove favorite.', 'error');
              return;
            }
            setIsFavorited(false);
            showToast('Removed from favorites.', 'success');
          } else {
            const payload = { recipe: { id: recipe.id }, user: { id: currentUser.id } };
            const res = await fetch('/api/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!res.ok) {
              showToast('Failed to save favorite.', 'error');
              return;
            }
            setIsFavorited(true);
            showToast('Saved to favorites.', 'success');
          }
        } catch (_) {
          showToast('Network error.', 'error');
        }
      }}
      onLike={() => {}}
      userRating={userRating}
      onRate={async (star) => {
        setUserRating(star);
        if (currentUser && currentUser.id) {
          try {
            const payload = { recipe: { id: recipe.id }, user: { id: currentUser.id }, rating: star };
            await fetch('/api/ratings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            showToast('Thanks for rating.', 'success');
          } catch (_) {}
        }
      }}
      onDelete={async () => {
        try {
          const res = await fetch(`/api/recipes/${recipe.id}`, { method: 'DELETE' });
          if (!res.ok) {
            showToast('Failed to delete recipe.', 'error');
            return;
          }
          showToast('Recipe deleted!', 'success');
          navigate('/home');
        } catch (_) {
          showToast('Network error.', 'error');
        }
      }}
      currentUser={currentUser}
      onLogout={onLogout}
      onRecipeUpdated={(updated) => {
        setRecipe(updated);
      }}
      canEdit={currentUser && recipe && String(recipe.authorId) === String(currentUser.id)}
    />
  );
}
