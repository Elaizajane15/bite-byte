import React, { useState } from 'react';
import { useToast } from './components/ToastContext';

function RecipeDetail({ recipe, onBack, isFavorited, onToggleFavorite, onLike, userRating, onRate }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Doe',
      text: 'This recipe is amazing! Turned out perfectly.',
      date: '2 days ago',
      likes: 5
    }
  ]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [liked, setLiked] = useState(false);
  const { showToast } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // Like recipe
  const handleLike = () => {
    if (!liked) {
      onLike(recipe.id);
      setLiked(true);
    }
  };

  // Add comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: comments.length + 1,
      author: 'You',
      text: comment,
      date: 'Just now',
      likes: 0
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  // Like comment
  const handleCommentLike = (commentId) => {
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  };

  // Edit comment
  const handleCommentEdit = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
  };

  // Save edited comment
  const handleEditSubmit = (commentId) => {
    if (!editingText.trim()) return;
    setComments(comments.map(c => 
      c.id === commentId ? { ...c, text: editingText } : c
    ));
    setEditingCommentId(null);
    setEditingText('');
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  // Delete comment
  const handleCommentDelete = (commentId) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  // Recipe Edit/Delete
  const handleRecipeEdit = () => {
    showToast('Edit recipe functionality here', 'info');
    // You can open a modal or navigate to an edit page
  };

  const handleRecipeDelete = () => {
    // show a custom confirmation box
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    showToast('Recipe deleted!', 'success');
    if (typeof onDelete === 'function') {
      onDelete(recipe.id);
    }
    onBack();
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  // Share link
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'success');
  };

  return (
    <div className="recipe-detail">
      <button className="back-btn" onClick={onBack}>
        ← Back to Recipes
      </button>

      <div className="recipe-detail-content">
        <div className="recipe-detail-left">
          <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
          
          {recipe.video && (
            <div className="recipe-video-container">
              <h3>Watch Cooking Video</h3>
              <video src={recipe.video} controls className="recipe-video">
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="recipe-badges">
            <span className="badge">{recipe.category}</span>
            <span className="badge">{recipe.difficulty}</span>
          </div>

          <h1 className="recipe-detail-title">{recipe.title}</h1>
          <p className="recipe-detail-description">{recipe.description}</p>

          <div className="recipe-author-info">
            <span className="author-icon">👤</span>
            <span>By {recipe.author}</span>
            <span className="recipe-date">📅 {recipe.createdAt}</span>
          </div>

          <div className="recipe-rating-section">
            <div className="rating-display">
              <span className="rating-stars">⭐ {recipe.rating.toFixed(1)}</span>
              <span className="rating-count">({recipe.totalRatings} ratings)</span>
            </div>
            <div className="rate-recipe">
              <span>Rate this recipe:</span>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    className={`star ${userRating >= star ? 'filled' : ''}`}
                    onClick={() => onRate(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions Bar with Edit/Delete */}
          <div className="recipe-actions-bar">
            <button 
              className={`action-btn ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            >
              {liked ? '👍' : '👍'} {recipe.likes + (liked ? 1 : 0)} Likes
            </button>
            <button 
              className={`action-btn ${isFavorited ? 'active' : ''}`}
              onClick={() => onToggleFavorite(recipe.id)}
            >
              {isFavorited ? '❤️' : '🤍'} Save Recipe
            </button>

            {/* Edit/Delete Recipe Buttons */}
            <button className="action-btn edit-btn" onClick={handleRecipeEdit}>✏️ Edit</button>
            <button className="action-btn delete-btn" onClick={handleRecipeDelete}>🗑️ Delete</button>

            <div className="share-container">
              <button 
                className="action-btn"
                onClick={() => setShowShareMenu(!showShareMenu)}
              >
                🔗 Share Recipe
              </button>
              {showShareMenu && (
                <div className="share-menu">
                  <div className="share-menu-header">
                    <h4>Share this recipe</h4>
                    <button className="share-close" onClick={() => setShowShareMenu(false)}>✕</button>
                  </div>
                  <div className="share-options">
                    <button className="share-option" onClick={copyLink}>📋 Copy Link</button>
                    {/* Other share buttons can remain here */}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="instructions-section">
            <h2>Instructions</h2>
            <ol className="instructions-list">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="instruction-step">
                  <span className="step-number">{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Comments Section */}
          <div className="comments-section">
            <h2>Comments ({comments.length})</h2>
            
            <form onSubmit={handleCommentSubmit} className="add-comment-form">
              <div className="add-comment">
                <span className="comment-icon">👤</span>
                <input
                  type="text"
                  placeholder="Share your thoughts about this recipe..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="comment-input"
                />
                <button 
                  type="submit" 
                  className="comment-submit-btn"
                  disabled={!comment.trim()}
                >
                  Post
                </button>
              </div>
            </form>

            <div className="comments-list">
              {comments.map((c) => (
                <div key={c.id} className="comment-item">
                  <div className="comment-avatar">👤</div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <span className="comment-author">{c.author}</span>
                      <span className="comment-date">{c.date}</span>
                      {c.author === 'You' && (
                        <>
                          <button onClick={() => handleCommentEdit(c.id, c.text)}>✏️</button>
                          <button onClick={() => handleCommentDelete(c.id)}>🗑️</button>
                        </>
                      )}
                    </div>

                    {editingCommentId === c.id ? (
                      <div className="edit-comment">
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="comment-input"
                        />
                        <button onClick={() => handleEditSubmit(c.id)}>Save</button>
                        <button onClick={handleEditCancel}>Cancel</button>
                      </div>
                    ) : (
                      <p className="comment-text">{c.text}</p>
                    )}

                    <div className="comment-actions">
                      <button 
                        className="comment-like-btn"
                        onClick={() => handleCommentLike(c.id)}
                      >
                        👍 {c.likes > 0 && c.likes}
                      </button>
                      <button className="comment-reply-btn">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="recipe-detail-right">
          <div className="recipe-details-card">
            <h3>Recipe Details</h3>
            <div className="detail-item">
              <span className="detail-icon">⏱️</span>
              <div>
                <div className="detail-label">Cook Time</div>
                <div className="detail-value">{recipe.cookTime}</div>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🍽️</span>
              <div>
                <div className="detail-label">Servings</div>
                <div className="detail-value">{recipe.servings}</div>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📊</span>
              <div>
                <div className="detail-label">Difficulty</div>
                <div className="detail-value">{recipe.difficulty}</div>
              </div>
            </div>
          </div>

          <div className="ingredients-card">
            <h3>Ingredients</h3>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-bullet">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {recipe.tips && recipe.tips.length > 0 && (
            <div className="cooking-tips-card">
              <h3>💡 Cooking Tips</h3>
              <ul className="tips-list">
                {recipe.tips.map((tip, index) => (
                  <li key={index} className="tip-item">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
