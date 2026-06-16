import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      type="button"
      className="btn btn-outline-light btn-sm theme-toggle d-flex align-items-center gap-2"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <i className={theme === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill'} />
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}

export default React.memo(ThemeToggle);
