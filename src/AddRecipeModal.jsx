import React, { useState } from 'react';
import { useToast } from './components/ToastContext';

function AddRecipeModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookTime: '',
    servings: '',
    difficulty: '',
    category: '',
    ingredients: [''],
    instructions: [''],
    image: '',
    video: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, '']
    });
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const updateInstruction = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        showToast('Please upload an image file', 'error');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size should be less than 5MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        showToast('Please upload a video file', 'error');
        return;
      }

      // Check file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        showToast('Video size should be less than 50MB', 'error');
        return;
      }
      

      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
        setFormData({ ...formData, video: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, image: '' });
  };

  const removeVideo = () => {
    setVideoPreview(null);
    setFormData({ ...formData, video: '' });
  };



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2 className="modal-title">Add New Recipe</h2>

        <form onSubmit={handleSubmit} className="recipe-form">
          <div className="form-row">
            <div className="form-group full">
              <label>Recipe Title *</label>
              <input
                type="text"
                placeholder="e.g., Classic Chocolate Chip Cookies"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              placeholder="Brief description of your recipe..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="form-group">
            <label>Recipe Image</label>
            <div className="upload-section">
              {!imagePreview ? (
                <div className="upload-area">
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-icon">📷</div>
                    <div className="upload-text">
                      <span className="upload-title">Upload Recipe Image</span>
                      <span className="upload-subtitle">Click to browse or drag and drop</span>
                      <span className="upload-hint">PNG, JPG, JPEG (Max 5MB)</span>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="preview-container">
                  <img src={imagePreview} alt="Recipe preview" className="image-preview" />
                  <button type="button" className="remove-btn" onClick={removeImage}>
                    ✕ Remove Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Video Upload Section */}
          <div className="form-group">
            <label>Cooking Video (Optional)</label>
            <div className="upload-section">
              {!videoPreview ? (
                <div className="upload-area">
                  <input
                    type="file"
                    id="video-upload"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="file-input"
                  />
                  <label htmlFor="video-upload" className="upload-label">
                    <div className="upload-icon">🎥</div>
                    <div className="upload-text">
                      <span className="upload-title">Upload Cooking Video</span>
                      <span className="upload-subtitle">Click to browse or drag and drop</span>
                      <span className="upload-hint">MP4, MOV, AVI (Max 50MB)</span>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="preview-container">
                  <video src={videoPreview} controls className="video-preview" />
                  <button type="button" className="remove-btn" onClick={removeVideo}>
                    ✕ Remove Video
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cook Time *</label>
              <input
                type="text"
                placeholder="e.g., 30 minutes"
                value={formData.cookTime}
                onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Servings *</label>
              <input
                type="number"
                placeholder="e.g., 4"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Difficulty *</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                required
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                <option value="Italian">Italian</option>
                <option value="Asian">Asian</option>
                <option value="Mexican">Mexican</option>
                <option value="American">American</option>
                <option value="Dessert">Dessert</option>
                <option value="Vegetarian">Vegetarian</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-header">
              <label>Ingredients *</label>
              <button type="button" className="add-btn" onClick={addIngredient}>
                + Add Ingredient
              </button>
            </div>
            {formData.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                required
              />
            ))}
          </div>

          <div className="form-group">
            <div className="form-group-header">
              <label>Instructions *</label>
              <button type="button" className="add-btn" onClick={addStep}>
                + Add Step
              </button>
            </div>
            {formData.instructions.map((instruction, index) => (
              <div key={index} className="instruction-input">
                <span className="step-label">{index + 1}</span>
                <textarea
                  placeholder="Step 1 instructions..."
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeModal;