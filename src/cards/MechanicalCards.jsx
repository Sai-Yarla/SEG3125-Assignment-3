/* ═══════════════════════════════════════════════════════════════════════════
   Mechanical Parts Card Deck — SVG Components
   Each shape has a Left half and Right half, plus a Complete form.
   Uses clipPath to show only one half when face-up.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Gear ──────────────────────────────────────────────────────────────────

export function GearLeft({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="gear-left-clip">
          <rect x="0" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#gear-left-clip)">
        <circle cx="28" cy="28" r="20" stroke={col} strokeWidth="2.5" fill="none" />
        <circle cx="28" cy="28" r="8" stroke={col} strokeWidth="2" fill="none" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 28 + 22 * Math.cos(rad);
          const y = 28 + 22 * Math.sin(rad);
          return <rect key={deg} x={x - 3} y={y - 3} width="6" height="6" fill={col} transform={`rotate(${deg}, ${x}, ${y})`} />;
        })}
        <line x1="28" y1="6" x2="28" y2="50" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <circle cx="28" cy="28" r="20" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function GearRight({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="gear-right-clip">
          <rect x="28" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#gear-right-clip)">
        <circle cx="28" cy="28" r="20" stroke={col} strokeWidth="2.5" fill="none" />
        <circle cx="28" cy="28" r="8" stroke={col} strokeWidth="2" fill="none" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x = 28 + 22 * Math.cos(rad);
          const y = 28 + 22 * Math.sin(rad);
          return <rect key={deg} x={x - 3} y={y - 3} width="6" height="6" fill={col} transform={`rotate(${deg}, ${x}, ${y})`} />;
        })}
        <line x1="28" y1="6" x2="28" y2="50" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <circle cx="28" cy="28" r="20" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function GearComplete({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <circle cx="28" cy="28" r="20" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="28" cy="28" r="8" stroke={color} strokeWidth="2" fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 28 + 22 * Math.cos(rad);
        const y = 28 + 22 * Math.sin(rad);
        return <rect key={deg} x={x - 3} y={y - 3} width="6" height="6" fill={color} transform={`rotate(${deg}, ${x}, ${y})`} />;
      })}
    </svg>
  );
}

// ─── Bolt ──────────────────────────────────────────────────────────────────

export function BoltLeft({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="bolt-left-clip">
          <rect x="0" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#bolt-left-clip)">
        <polygon points="30,6 14,30 26,30 20,50 38,22 26,22" stroke={col} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <line x1="28" y1="6" x2="28" y2="50" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <polygon points="30,6 14,30 26,30 20,50 38,22 26,22" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function BoltRight({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="bolt-right-clip">
          <rect x="28" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#bolt-right-clip)">
        <polygon points="30,6 14,30 26,30 20,50 38,22 26,22" stroke={col} strokeWidth="2" fill="none" strokeLinejoin="round" />
        <line x1="28" y1="6" x2="28" y2="50" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <polygon points="30,6 14,30 26,30 20,50 38,22 26,22" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function BoltComplete({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <polygon points="30,6 14,30 26,30 20,50 38,22 26,22" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Hex Nut ──────────────────────────────────────────────────────────────

export function HexLeft({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="hex-left-clip">
          <rect x="0" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#hex-left-clip)">
        <polygon points="28,8 44,18 44,38 28,48 12,38 12,18" stroke={col} strokeWidth="2" fill="none" />
        <circle cx="28" cy="28" r="7" stroke={col} strokeWidth="1.5" fill="none" />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <polygon points="28,8 44,18 44,38 28,48 12,38 12,18" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function HexRight({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="hex-right-clip">
          <rect x="28" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#hex-right-clip)">
        <polygon points="28,8 44,18 44,38 28,48 12,38 12,18" stroke={col} strokeWidth="2" fill="none" />
        <circle cx="28" cy="28" r="7" stroke={col} strokeWidth="1.5" fill="none" />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.75" strokeDasharray="2 3" />
        {glowing && <polygon points="28,8 44,18 44,38 28,48 12,38 12,18" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function HexComplete({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <polygon points="28,8 44,18 44,38 28,48 12,38 12,18" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="28" cy="28" r="7" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// ─── Circuit / IC Chip ────────────────────────────────────────────────────

export function CircuitLeft({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="circuit-left-clip">
          <rect x="0" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#circuit-left-clip)">
        <rect x="18" y="18" width="20" height="20" stroke={col} strokeWidth="2" fill="none" />
        <line x1="28" y1="8" x2="28" y2="18" stroke={col} strokeWidth="1.5" />
        <line x1="18" y1="28" x2="8" y2="28" stroke={col} strokeWidth="1.5" />
        <line x1="28" y1="38" x2="28" y2="48" stroke={col} strokeWidth="1.5" />
        <circle cx="28" cy="8" r="2.5" fill={col} />
        <circle cx="8" cy="28" r="2.5" fill={col} />
        <circle cx="28" cy="48" r="2.5" fill={col} />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.5" strokeDasharray="2 3" />
        {glowing && <rect x="18" y="18" width="20" height="20" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function CircuitRight({ color = 'currentColor', glowing = false }) {
  const col = glowing ? 'var(--match-glow)' : color;
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <defs>
        <clipPath id="circuit-right-clip">
          <rect x="28" y="0" width="28" height="56" />
        </clipPath>
      </defs>
      <g clipPath="url(#circuit-right-clip)">
        <rect x="18" y="18" width="20" height="20" stroke={col} strokeWidth="2" fill="none" />
        <line x1="38" y1="28" x2="48" y2="28" stroke={col} strokeWidth="1.5" />
        <line x1="28" y1="18" x2="28" y2="8" stroke={col} strokeWidth="1.5" />
        <line x1="28" y1="38" x2="28" y2="48" stroke={col} strokeWidth="1.5" />
        <circle cx="48" cy="28" r="2.5" fill={col} />
        <circle cx="28" cy="8" r="2.5" fill={col} />
        <circle cx="28" cy="48" r="2.5" fill={col} />
        <line x1="28" y1="8" x2="28" y2="48" stroke={col} strokeWidth="0.5" strokeDasharray="2 3" />
        {glowing && <rect x="18" y="18" width="20" height="20" stroke={col} strokeWidth="5" fill="none" opacity="0.15" />}
      </g>
    </svg>
  );
}

export function CircuitComplete({ color = 'currentColor' }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="game-card__svg">
      <rect x="18" y="18" width="20" height="20" stroke={color} strokeWidth="2" fill="none" />
      <line x1="28" y1="8" x2="28" y2="18" stroke={color} strokeWidth="1.5" />
      <line x1="18" y1="28" x2="8" y2="28" stroke={color} strokeWidth="1.5" />
      <line x1="38" y1="28" x2="48" y2="28" stroke={color} strokeWidth="1.5" />
      <line x1="28" y1="38" x2="28" y2="48" stroke={color} strokeWidth="1.5" />
      <circle cx="28" cy="8" r="2.5" fill={color} />
      <circle cx="8" cy="28" r="2.5" fill={color} />
      <circle cx="48" cy="28" r="2.5" fill={color} />
      <circle cx="28" cy="48" r="2.5" fill={color} />
    </svg>
  );
}

// ─── Deck Registry ────────────────────────────────────────────────────────

export const MECHANICAL_SHAPES = [
  { name: 'gear',    Left: GearLeft,    Right: GearRight,    Complete: GearComplete },
  { name: 'bolt',    Left: BoltLeft,    Right: BoltRight,    Complete: BoltComplete },
  { name: 'hex',     Left: HexLeft,     Right: HexRight,     Complete: HexComplete },
  { name: 'circuit', Left: CircuitLeft, Right: CircuitRight, Complete: CircuitComplete },
];
