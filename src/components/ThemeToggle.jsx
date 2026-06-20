import { useTheme } from '../ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      id="theme-toggle"
    >
      <div className="theme-toggle__knob">
        {theme === 'dark' ? '🌙' : '☀️'}
      </div>
    </button>
  );
}
