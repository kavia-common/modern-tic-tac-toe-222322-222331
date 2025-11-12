import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="App" style={{ background: 'var(--ocean-bg)' }}>
      <header
        className="App-header"
        style={{
          borderRadius: '16px',
          boxShadow: 'var(--shadow-subtle)',
          padding: 24,
          minHeight: '100vh',
          gap: 12,
        }}
      >
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <h1 style={{ margin: 0, color: 'var(--ocean-text)' }}>
          Modern Tic Tac Toe
        </h1>
        <p style={{ color: 'rgba(17,24,39,0.7)', marginTop: 4 }}>
          Play the classic game with a modern Ocean Professional theme.
        </p>

        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link
            to="/game"
            className="btn-primary"
            aria-label="Go to Tic Tac Toe game page"
            style={{
              textDecoration: 'none',
              paddingLeft: 18,
              paddingRight: 18,
              background: 'var(--ocean-secondary)',
              boxShadow: '0 8px 18px rgba(245,158,11,0.25)',
            }}
          >
            Play Game
          </Link>
          <Link
            to="/login"
            className="btn-primary"
            aria-label="Go to Login page"
            style={{ textDecoration: 'none', paddingLeft: 18, paddingRight: 18 }}
          >
            Login (Demo)
          </Link>
        </div>
      </header>
    </div>
  );
}

export default App;
