export default function TopBar({ children }) {
  return (
    <header className="top-bar" id="top-bar">
      <div className="top-bar__brand">
        <div className="top-bar__brand-bar" />
        <span className="top-bar__brand-text">
          Steel Shark
        </span>
      </div>
      <div className="top-bar__right">
        {children}
      </div>
    </header>
  );
}
