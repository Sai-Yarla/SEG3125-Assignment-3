/* Card back design */
export default function CardBack() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      {/* Wave pattern */}
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
