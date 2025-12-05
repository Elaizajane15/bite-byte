import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './components/ToastContext';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter your email and password.", 'error');
      return;
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        showToast('Login failed.', 'error');
        return;
      }
      const user = await res.json();
      onLogin({ id: user.id, name: user.firstname || user.email.split('@')[0], email: user.email, createdAt: user.createdAt, bio: user.bio || '' });
      navigate('/home');
    } catch (err) {
      showToast('Network error. Please check backend is running at 8080.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="close-button" onClick={() => navigate('/')}>✕</button>
        <h2 className="auth-title">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
    
            <label>Password</label>
            <div className="input-wrapper">
              <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button">Sign In</button>
        </form>

        <p>
          Don't have an account? <span className="switch-link" onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
