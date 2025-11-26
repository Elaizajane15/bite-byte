import React, { useState } from 'react';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import './App.css';
import { ToastProvider } from './components/ToastContext';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState({ name: 'Guest' });

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
