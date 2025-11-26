import React, { useState } from 'react';
import { useToast } from './components/ToastContext';

function LoginPage({ setCurrentPage, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter your email and password.", 'error');
      return;
    }

    // Fake login
    const fakeUser = {
      name: email.split("@")[0], // use email prefix as username
      email
    };

    onLogin(fakeUser);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="close-button" onClick={() => setCurrentPage("landing")}>✕</button>
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
          Don't have an account? <span className="switch-link" onClick={() => setCurrentPage("signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
