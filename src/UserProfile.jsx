import React, { useState } from 'react';

function UserProfile({ currentUser, myRecipes, favorites, onBack, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState(currentUser.bio || '');

  const handleSave = () => {
    // Pass the updated info to parent
    onUpdateProfile({
      name,
      email,
      bio,
      currentPassword: currentPassword.trim(),
      newPassword: newPassword.trim()
    });
    // Reset fields
    setCurrentPassword('');
    setNewPassword('');
    setIsEditing(false);
  };

  const joinedText = currentUser.createdAt
    ? `📅 Joined ${new Date(currentUser.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`
    : '📅 Joined October 2025';

  return (
    <div className="user-profile">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <h1>{name}</h1>
          <p className="profile-email">{email}</p>
          <p className="profile-joined">{joinedText}</p>
          <p className="profile-bio">{bio || 'No bio yet'}</p>
          <button className="home-button" onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
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
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsEditing(false)}>✕</button>
            <h2 className="modal-title">Edit Profile</h2>
            <form className="recipe-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div className="form-row">
                <div className="form-group full">
                  <label>Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  rows="3"
                  placeholder="Tell others a bit about you"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Current Password *</label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>New Password *</label>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
