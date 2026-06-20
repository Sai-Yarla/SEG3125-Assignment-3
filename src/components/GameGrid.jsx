import GameCard from './GameCard';

/* ═══════════════════════════════════════════════════════════════════════════
   GameGrid — Renders NxN grid of GameCards with Tailwind
   ═══════════════════════════════════════════════════════════════════════════ */

export default function GameGrid({ cards, gridSize, deck, mismatchIds, onCardClick, disabled }) {
  const columns = gridSize === '4x4' ? 4 : gridSize === '5x5' ? 5 : 6;
  const maxWidth = gridSize === '4x4' ? 344 : gridSize === '5x5' ? 430 : 516;

  // For 5x5, insert a blank spacer in the center (position 12) since 12 pairs = 24 cards
  const renderItems = [];
  if (gridSize === '5x5') {
    const centerIndex = 12;
    let cardIdx = 0;
    for (let i = 0; i < 25; i++) {
      if (i === centerIndex) {
        renderItems.push(
          <div key="blank-center" className="relative w-full pb-[100%]" style={{
            background: 'var(--bg-secondary)',
            border: '1px dashed var(--border-primary)',
            borderRadius: '1rem',
            opacity: 0.3,
          }} />
        );
      } else if (cardIdx < cards.length) {
        const card = cards[cardIdx];
        renderItems.push(
          <GameCard
            key={card.id}
            card={card}
            deck={deck}
            isMismatched={mismatchIds.includes(card.id)}
            onClick={onCardClick}
            disabled={disabled}
          />
        );
        cardIdx++;
      }
    }
  } else {
    cards.forEach((card) => {
      renderItems.push(
        <GameCard
          key={card.id}
          card={card}
          deck={deck}
          isMismatched={mismatchIds.includes(card.id)}
          onClick={onCardClick}
          disabled={disabled}
        />
      );
    });
  }

  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 10,
        maxWidth: maxWidth,
      }}
      id="game-grid"
      role="grid"
      aria-label="Memory card grid"
    >
      {renderItems}
    </div>
  );
}
