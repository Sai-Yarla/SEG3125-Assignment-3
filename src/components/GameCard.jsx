import { useMemo } from 'react';
import { useTheme } from '../ThemeContext';
import CardBack from '../cards/CardBack';
import { MECHANICAL_SHAPES } from '../cards/MechanicalCards';
import { SHARK_SHAPES } from '../cards/SharkCards';

/* ═══════════════════════════════════════════════════════════════════════════
   GameCard — Single card with 3D flip animation
   ═══════════════════════════════════════════════════════════════════════════ */

const PAIR_COLORS_DARK = [
  '#00c8ff', '#00ffc8', '#ff6b2b', '#a855f7',
  '#ffd700', '#ff3d5a', '#4af7c4', '#6cb4ff',
  '#ff9f1c', '#c8ff00', '#ff00c8', '#00c8ff',
  '#00ffc8', '#ff6b2b', '#a855f7', '#ffd700',
  '#ff3d5a', '#4af7c4',
];

const PAIR_COLORS_LIGHT = [
  '#2a9d8f', '#e9c46a', '#e76f51', '#264653',
  '#f4a261', '#7c3aed', '#2a9d8f', '#e9c46a',
  '#e76f51', '#264653', '#f4a261', '#7c3aed',
  '#2a9d8f', '#e9c46a', '#e76f51', '#264653',
  '#f4a261', '#7c3aed',
];

export default function GameCard({ card, deck, isMismatched, onClick, disabled }) {
  const { theme } = useTheme();
  const shapes = deck === 'mechanical' ? MECHANICAL_SHAPES : SHARK_SHAPES;
  const pairColors = theme === 'dark' ? PAIR_COLORS_DARK : PAIR_COLORS_LIGHT;

  const shape = useMemo(() => {
    return shapes.find(s => s.name === card.shapeName) || shapes[0];
  }, [card.shapeName, shapes]);

  const color = pairColors[card.colorIndex % pairColors.length];
  const isFlipped = card.isFlipped || card.isMatched;

  const className = [
    'game-card',
    isFlipped && 'game-card--flipped',
    card.isMatched && 'game-card--matched',
    isMismatched && 'game-card--mismatch',
    disabled && 'game-card--disabled',
  ].filter(Boolean).join(' ');

  const FaceComponent = card.halfType === 'left' ? shape.Left : shape.Right;

  return (
    <div
      className={className}
      onClick={() => !disabled && !card.isMatched && !card.isFlipped && onClick(card.id)}
      role="button"
      aria-label={`Card ${card.id + 1}${card.isFlipped ? `, showing ${card.shapeName} ${card.halfType} half` : ', face down'}`}
      tabIndex={disabled || card.isMatched ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!disabled && !card.isMatched && !card.isFlipped) onClick(card.id);
        }
      }}
      id={`card-${card.id}`}
    >
      <div className="game-card__inner">
        {/* Back face */}
        <div className="game-card__face game-card__back">
          <CardBack />
        </div>

        {/* Front face */}
        <div className="game-card__face game-card__front">
          <FaceComponent
            color={color}
            glowing={card.isMatched}
          />
        </div>
      </div>
    </div>
  );
}
