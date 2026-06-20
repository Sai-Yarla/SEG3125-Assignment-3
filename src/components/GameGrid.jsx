import GameCard from './GameCard';

/* ═══════════════════════════════════════════════════════════════════════════
   GameGrid — Renders NxN grid of GameCards
   ═══════════════════════════════════════════════════════════════════════════ */

export default function GameGrid({ cards, gridSize, deck, mismatchIds, onCardClick, disabled }) {
  const gridClass = `game-grid game-grid--${gridSize}`;

  // For 5x5, insert a blank spacer in the center (position 12) since 12 pairs = 24 cards
  const renderItems = [];
  if (gridSize === '5x5') {
    const centerIndex = 12;
    let cardIdx = 0;
    for (let i = 0; i < 25; i++) {
      if (i === centerIndex) {
        renderItems.push(
          <div key="blank-center" className="game-card game-card--blank" style={{
            background: 'var(--bg-secondary)',
            border: '1px dashed var(--border-primary)',
            borderRadius: 'var(--radius-sm)',
            opacity: 0.3,
            aspectRatio: '1',
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
    <div className="game-grid-wrapper">
      <div className={gridClass} id="game-grid" role="grid" aria-label="Memory card grid">
        {renderItems}
      </div>
    </div>
  );
}
