import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './components/ToastContext';

function SignupPage({ onSignup }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!firstname || !lastname || !email || !password) {
      showToast("Please fill in all fields.", 'error');
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match.", 'error');
      return;
    }
    try {
      const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';
      const res = await fetch(`${API_BASE}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email, password })
      });
      if (!res.ok) {
        showToast('Sign up failed.', 'error');
        return;
      }
      const user = await res.json();
      showToast("Account created successfully! Please sign in.", 'success');
      navigate('/login');
    } catch (e) {
      showToast('Network error.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <button className="close-button" onClick={() => navigate('/') }>
          ✕
        </button>

        <h2 className="auth-title">Join RecipeShare</h2>

        {/* FIRSTNAME */}
        <div className="form-group">
          <label className="label">First Name</label>
          <input 
            className="input"
            type="text"
            placeholder="Enter your first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        {/* LASTNAME */}
        <div className="form-group">
          <label className="label">Last Name</label>
          <input 
            className="input"
            type="text"
            placeholder="Enter your last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label className="label">Email Address</label>
          <input 
            className="input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label className="label">Password</label>
          <div className="input-wrapper">
            <input 
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="form-group">
          <label className="label">Confirm Password</label>
          <div className="input-wrapper">
            <input 
              className="input"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button 
              className="eye-button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <button className="submit-button" onClick={handleSignup}>
          Create Account
        </button>

        <p className="switch-text">
          Already have an account?{" "}
          <span className="switch-link" onClick={() => navigate('/login')}>
            Sign in
          </span>
        </p>

      </div>
    </div>
  );
}

export default SignupPage;
