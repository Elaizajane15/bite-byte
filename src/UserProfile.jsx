import React, { useState } from 'react';

function UserProfile({ currentUser, myRecipes, favorites, onBack, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSave = () => {
    // Pass the updated info to parent
    onUpdateProfile({
      name,
      email,
      currentPassword: currentPassword.trim(),
      newPassword: newPassword.trim()
    });
    // Reset fields
    setCurrentPassword('');
    setNewPassword('');
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <h1>{currentUser.name}</h1>
          <p className="profile-email">{currentUser.email}</p>
          <p className="profile-joined">📅 Joined October 2025</p>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-box">
          <div className="stat-icon">📖</div>
          <div className="stat-value">{myRecipes.length}</div>
          <div className="stat-label">Recipes</div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">👍</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Total Likes</div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">0</div>
          <div className="stat-label">Avg. Rating</div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">❤️</div>
          <div className="stat-value">{favorites.length}</div>
          <div className="stat-label">Favorites</div>
        </div>
      </div>

      <div className="profile-recipes">
        <div className="profile-section-header">
          <h2>My Recipes</h2>
          <span className="recipe-count-badge">{myRecipes.length} recipes</span>
        </div>
        {myRecipes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👨‍🍳</div>
            <p>No recipes yet</p>
            <p className="empty-subtitle">Start sharing your favorite recipes with the community!</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {myRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image-container">
                  <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                </div>
                <div className="recipe-content">
                  <div className="recipe-category-badge">{recipe.category}</div>
                  <h4 className="recipe-title">{recipe.title}</h4>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-meta">
                    <span className="recipe-meta-item">⏱️ {recipe.cookTime}</span>
                    <span className="recipe-meta-item">⭐ {recipe.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="edit-profile-modal">
          <div className="edit-profile-content">
            <h2>Edit Profile</h2>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Current Password:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </label>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </label>
            <div className="edit-profile-buttons">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
