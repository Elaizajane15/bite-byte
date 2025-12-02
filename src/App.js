import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import './App.css';
import { ToastProvider } from './components/ToastContext';

function App() {
  const initialPage = typeof window !== 'undefined' ? (localStorage.getItem('currentPage') || 'landing') : 'landing';
  const initialUser = typeof window !== 'undefined' ? (JSON.parse(localStorage.getItem('currentUser') || '{"name":"Guest"}')) : { name: 'Guest' };
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentUser, setCurrentUser] = useState(initialUser);

  useEffect(() => {
    try { localStorage.setItem('currentPage', currentPage); } catch (_) {}
  }, [currentPage]);

  useEffect(() => {
    try { localStorage.setItem('currentUser', JSON.stringify(currentUser || { name: 'Guest' })); } catch (_) {}
  }, [currentUser]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentPage('home');
  };

  const handleSignup = (userData) => {
    setCurrentUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser({ name: 'Guest' });
    setCurrentPage('landing');
    try {
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentPage', 'landing');
      localStorage.removeItem('currentView');
      localStorage.removeItem('selectedRecipeId');
    } catch (_) {}
  };

  switch (currentPage) {
    case 'landing':
      return (
        <ToastProvider>
          <LandingPage
            setCurrentPage={setCurrentPage}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        </ToastProvider>
      );

    case 'login':
      return (
        <ToastProvider>
          <LoginPage setCurrentPage={setCurrentPage} onLogin={handleLogin} />
        </ToastProvider>
      );

    case 'signup':
      return (
        <ToastProvider>
          <SignupPage setCurrentPage={setCurrentPage} onSignup={handleSignup} />
        </ToastProvider>
      );

    case 'home':
      return (
        <ToastProvider>
          <HomePage
            currentUser={currentUser}
            setCurrentPage={setCurrentPage}
            onLogout={handleLogout}
          />
        </ToastProvider>
      );

    default:
      return <div>Page not found</div>;
  }
}

export default App;
