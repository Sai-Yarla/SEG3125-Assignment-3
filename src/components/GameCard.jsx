import { useMemo } from 'react';
import CardBack from '../cards/CardBack';
import { MECHANICAL_SHAPES } from '../cards/MechanicalCards';
import { SHARK_SHAPES } from '../cards/SharkCards';

/* ═══════════════════════════════════════════════════════════════════════════
   GameCard — Single card with 3D flip animation
   ═══════════════════════════════════════════════════════════════════════════ */

const PAIR_COLORS = [
  '#2a9d8f', '#e9c46a', '#e76f51', '#264653',
  '#f4a261', '#7c3aed', '#2a9d8f', '#e9c46a',
  '#e76f51', '#264653', '#f4a261', '#7c3aed',
  '#2a9d8f', '#e9c46a', '#e76f51', '#264653',
  '#f4a261', '#7c3aed',
];

export default function GameCard({ card, deck, isMismatched, onClick, disabled }) {
  const shapes = deck === 'mechanical' ? MECHANICAL_SHAPES : SHARK_SHAPES;

  const shape = useMemo(() => {
    return shapes.find(s => s.name === card.shapeName) || shapes[0];
  }, [card.shapeName, shapes]);

  const color = PAIR_COLORS[card.colorIndex % PAIR_COLORS.length];
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
