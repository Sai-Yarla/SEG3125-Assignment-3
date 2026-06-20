import { useTheme } from '../ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function TopBar({ children }) {
  const { theme } = useTheme();

  return (
    <header className="top-bar" id="top-bar">
      <div className="top-bar__brand">
        <div className="top-bar__brand-bar" />
        <span className="top-bar__brand-text">
          {theme === 'dark' ? 'STEEL SHARK SYSTEMS' : 'Steel Shark'}
        </span>
      </div>
      <div className="top-bar__right">
        {children}
        {theme === 'dark' && (
          <div className="top-bar__status">
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              BUILD v2.4.1
            </span>
            <div className="top-bar__status-dot" />
            <span style={{ color: 'var(--accent-secondary)' }}>ONLINE</span>
          </div>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
