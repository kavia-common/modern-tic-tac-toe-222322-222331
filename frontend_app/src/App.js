import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App" style={{ background: 'var(--ocean-bg)' }}>
      <header className="App-header" style={{ borderRadius: '16px', boxShadow: 'var(--shadow-subtle)' }}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Current theme: <strong>{theme}</strong>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div style={{ marginTop: 24 }}>
          <Link
            to="/login"
            className="btn-primary"
            aria-label="Go to Login page"
            style={{ textDecoration: 'none', paddingLeft: 18, paddingRight: 18 }}
          >
            Go to Login
          </Link>
        </div>
      </header>
    </div>
  );
}

export default App;
