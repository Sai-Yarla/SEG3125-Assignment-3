/* ═══════════════════════════════════════════════════════════════════════════
   Shark Silhouettes Card Deck — SVG Components
   Organic/marine shapes split into complementary left/right halves.
   Softer lines and rounded strokes for the light-theme visual experience.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Shark ────────────────────────────────────────────────────────────────

export function SharkLeft({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="shark-left-clip">
          <rect x="0" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#shark-left-clip)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6,28 Q10,18 20,16 L28,12 L28,18 L24,22 Q20,24 18,28 Q20,32 24,34 L28,38 L28,44 L20,40 Q10,38 6,28Z"
          stroke={col} strokeWidth="2" fill="none" />
        <circle cx="16" cy="26" r="2" fill={col} />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <path d="M6,28 Q10,18 20,16 L28,12 L28,18 L24,22 Q20,24 18,28 Q20,32 24,34 L28,38 L28,44 L20,40 Q10,38 6,28Z"
          stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function SharkRight({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="shark-right-clip">
          <rect x="28" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#shark-right-clip)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28,12 L36,16 Q42,20 48,24 L50,28 L48,32 Q42,36 36,40 L28,44 L28,38 L32,34 Q36,30 36,28 Q36,26 32,22 L28,18Z"
          stroke={col} strokeWidth="2" fill="none" />
        <path d="M46,26 L52,20 L50,28 L52,36 L46,30" stroke={col} strokeWidth="1.5" fill="none" />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <path d="M28,12 L36,16 Q42,20 48,24 L50,28 L48,32 Q42,36 36,40 L28,44 L28,38 L32,34 Q36,30 36,28 Q36,26 32,22 L28,18Z"
          stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function SharkComplete({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M6,28 Q10,18 20,16 L28,12 L36,16 Q42,20 48,24 L50,28 L48,32 Q42,36 36,40 L28,44 L20,40 Q10,38 6,28Z"
          stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
        <circle cx="16" cy="26" r="2" fill={color} />
        <path d="M46,26 L52,20 L50,28 L52,36 L46,30" stroke={color} strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}

// ─── Whale ────────────────────────────────────────────────────────────────

export function WhaleLeft({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="whale-left-clip">
          <rect x="0" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#whale-left-clip)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8,30 Q8,18 18,14 Q24,12 28,14 L28,42 Q24,44 18,42 Q8,40 8,30Z"
          stroke={col} strokeWidth="2" fill="none" />
        <circle cx="16" cy="26" r="2.5" fill={col} />
        <path d="M10,34 Q12,36 16,36" stroke={col} strokeWidth="1.5" fill="none" />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <path d="M8,30 Q8,18 18,14 Q24,12 28,14 L28,42 Q24,44 18,42 Q8,40 8,30Z"
          stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function WhaleRight({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="whale-right-clip">
          <rect x="28" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#whale-right-clip)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28,14 Q34,12 40,16 Q46,22 46,30 Q46,38 40,42 Q34,44 28,42 L28,14Z"
          stroke={col} strokeWidth="2" fill="none" />
        <path d="M46,28 Q50,18 52,14 L50,28 L52,42 Q50,38 46,28Z"
          stroke={col} strokeWidth="1.5" fill="none" />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <path d="M28,14 Q34,12 40,16 Q46,22 46,30 Q46,38 40,42 Q34,44 28,42 L28,14Z"
          stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function WhaleComplete({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d="M8,30 Q8,18 18,14 Q24,12 28,14 Q34,12 40,16 Q46,22 46,30 Q46,38 40,42 Q34,44 28,42 Q24,44 18,42 Q8,40 8,30Z"
          stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
        <circle cx="16" cy="26" r="2.5" fill={color} />
        <path d="M10,34 Q12,36 16,36" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M46,28 Q50,18 52,14 L50,28 L52,42 Q50,38 46,28Z" stroke={color} strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}

// ─── Anchor ───────────────────────────────────────────────────────────────

export function AnchorLeft({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="anchor-left-clip">
          <rect x="0" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#anchor-left-clip)" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="12" r="5" stroke={col} strokeWidth="2" fill="none" />
        <line x1="28" y1="17" x2="28" y2="44" stroke={col} strokeWidth="2" />
        <line x1="18" y1="26" x2="38" y2="26" stroke={col} strokeWidth="2" />
        <path d="M12,42 Q12,32 28,32" stroke={col} strokeWidth="2" fill="none" />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
        {glowing && <>
          <circle cx="28" cy="12" r="5" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />
          <line x1="28" y1="17" x2="28" y2="44" stroke={col} strokeWidth="5" opacity="0.15" />
        </>}
      </g>
    </svg>
  );
}

export function AnchorRight({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="anchor-right-clip">
          <rect x="28" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#anchor-right-clip)" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="12" r="5" stroke={col} strokeWidth="2" fill="none" />
        <line x1="28" y1="17" x2="28" y2="44" stroke={col} strokeWidth="2" />
        <line x1="18" y1="26" x2="38" y2="26" stroke={col} strokeWidth="2" />
        <path d="M44,42 Q44,32 28,32" stroke={col} strokeWidth="2" fill="none" />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
        {glowing && <>
          <circle cx="28" cy="12" r="5" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />
          <line x1="28" y1="17" x2="28" y2="44" stroke={col} strokeWidth="5" opacity="0.15" />
        </>}
      </g>
    </svg>
  );
}

export function AnchorComplete({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="28" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
        <line x1="28" y1="17" x2="28" y2="44" stroke={color} strokeWidth="2" />
        <line x1="18" y1="26" x2="38" y2="26" stroke={color} strokeWidth="2" />
        <path d="M12,42 Q12,32 28,32" stroke={color} strokeWidth="2" fill="none" />
        <path d="M44,42 Q44,32 28,32" stroke={color} strokeWidth="2" fill="none" />
      </g>
    </svg>
  );
}

// ─── Shell (Nautilus) ────────────────────────────────────────────────────

export function ShellLeft({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="shell-left-clip">
          <rect x="0" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#shell-left-clip)" strokeLinecap="round">
        <path d="M28,10 Q10,10 10,28 Q10,46 28,46" stroke={col} strokeWidth="2" fill="none" />
        <path d="M28,16 Q16,16 16,28 Q16,40 28,40" stroke={col} strokeWidth="1.5" fill="none" />
        <path d="M28,22 Q22,22 22,28 Q22,34 28,34" stroke={col} strokeWidth="1.5" fill="none" />
        <circle cx="28" cy="28" r="2" fill={col} />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <path d="M28,10 Q10,10 10,28 Q10,46 28,46" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function ShellRight({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="shell-right-clip">
          <rect x="28" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#shell-right-clip)" strokeLinecap="round">
        <path d="M28,10 Q46,10 46,28 Q46,46 28,46" stroke={col} strokeWidth="2" fill="none" />
        <path d="M28,16 Q40,16 40,28 Q40,40 28,40" stroke={col} strokeWidth="1.5" fill="none" />
        <path d="M28,22 Q34,22 34,28 Q34,34 28,34" stroke={col} strokeWidth="1.5" fill="none" />
        <circle cx="28" cy="28" r="2" fill={col} />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <path d="M28,10 Q46,10 46,28 Q46,46 28,46" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function ShellComplete({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <g strokeLinecap="round">
        <path d="M28,10 Q10,10 10,28 Q10,46 28,46 Q46,46 46,28 Q46,10 28,10Z" stroke={color} strokeWidth="2" fill={color} fillOpacity="0.1" />
        <path d="M28,16 Q16,16 16,28 Q16,40 28,40 Q40,40 40,28 Q40,16 28,16Z" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M28,22 Q22,22 22,28 Q22,34 28,34 Q34,34 34,28 Q34,22 28,22Z" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="28" cy="28" r="2" fill={color} />
      </g>
    </svg>
  );
}

// ─── Deck Registry ────────────────────────────────────────────────────────

export const SHARK_SHAPES = [
  { name: 'shark',  Left: SharkLeft,  Right: SharkRight,  Complete: SharkComplete },
  { name: 'whale',  Left: WhaleLeft,  Right: WhaleRight,  Complete: WhaleComplete },
  { name: 'anchor', Left: AnchorLeft, Right: AnchorRight, Complete: AnchorComplete },
  { name: 'shell',  Left: ShellLeft,  Right: ShellRight,  Complete: ShellComplete },
];
