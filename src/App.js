import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import './App.css';
import { ToastProvider } from './components/ToastContext';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const initialUser = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('currentUser') || '{"name":"Guest"}')) : { name: 'Guest' };
  const [currentUser, setCurrentUser] = useState(initialUser);

  useEffect(() => {
    try { localStorage.setItem('currentUser', JSON.stringify(currentUser || { name: 'Guest' })); } catch (_) {}
  }, [currentUser]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    navigate('/home');
  };

  const handleSignup = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser({ name: 'Guest' });
    navigate('/');
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentView');
      localStorage.removeItem('selectedRecipeId');
    } catch (_) {}
  };

  const setCurrentPageRouter = (page) => {
    const map = { landing: '/', login: '/login', signup: '/signup', home: '/home' };
    navigate(map[page] || '/');
  };

  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={
          <LandingPage
            setCurrentPage={setCurrentPageRouter}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        } />
        <Route path="/login" element={
          <LoginPage setCurrentPage={setCurrentPageRouter} onLogin={handleLogin} />
        } />
        <Route path="/signup" element={
          <SignupPage setCurrentPage={setCurrentPageRouter} onSignup={handleSignup} />
        } />
        <Route path="/home" element={
          <HomePage
            currentUser={currentUser}
            setCurrentPage={setCurrentPageRouter}
            onLogout={handleLogout}
          />
        } />
      </Routes>
    </ToastProvider>
  );
}

export default App;
