import { useTheme } from '../ThemeContext';

/* Card back design — different patterns per theme */
export default function CardBack() {
  const { theme } = useTheme();

  if (theme === 'light') {
    return (
      <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
        {/* Wave pattern for light/ocean theme */}
        <rect x="4" y="4" width="48" height="48" rx="4" stroke="var(--card-back-stroke)" strokeWidth="1" fill="none" />
        <path d="M4,20 Q14,16 18,20 Q22,24 28,20 Q34,16 38,20 Q42,24 48,20 Q52,16 52,20"
          stroke="var(--card-back-stroke)" strokeWidth="1" fill="none" opacity="0.6" />
        <path d="M4,28 Q14,24 18,28 Q22,32 28,28 Q34,24 38,28 Q42,32 48,28 Q52,24 52,28"
          stroke="var(--card-back-stroke)" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M4,36 Q14,32 18,36 Q22,40 28,36 Q34,32 38,36 Q42,40 48,36 Q52,32 52,36"
          stroke="var(--card-back-stroke)" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="28" cy="28" r="8" stroke="var(--accent-primary)" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="28" cy="28" r="3" fill="var(--accent-primary)" opacity="0.2" />
      </svg>
    );
  }

  // Dark industrial pattern
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <rect x="4" y="4" width="48" height="48" stroke="var(--card-back-stroke)" strokeWidth="1.5" fill="none" />
      <rect x="10" y="10" width="36" height="36" stroke="var(--card-back-stroke)" strokeWidth="0.75" fill="none" />
      <line x1="4" y1="4" x2="14" y2="14" stroke="var(--card-back-stroke)" strokeWidth="0.75" />
      <line x1="52" y1="4" x2="42" y2="14" stroke="var(--card-back-stroke)" strokeWidth="0.75" />
      <line x1="4" y1="52" x2="14" y2="42" stroke="var(--card-back-stroke)" strokeWidth="0.75" />
      <line x1="52" y1="52" x2="42" y2="42" stroke="var(--card-back-stroke)" strokeWidth="0.75" />
      <circle cx="28" cy="28" r="6" stroke="var(--card-back-stroke)" strokeWidth="1.5" fill="none" />
      <line x1="28" y1="10" x2="28" y2="46" stroke="var(--card-back-stroke)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5" />
      <line x1="10" y1="28" x2="46" y2="28" stroke="var(--card-back-stroke)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.5" />
    </svg>
  );
}
