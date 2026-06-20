import { useReducer, useCallback } from 'react';
import { MECHANICAL_SHAPES } from '../cards/MechanicalCards';
import { SHARK_SHAPES } from '../cards/SharkCards';

/* ═══════════════════════════════════════════════════════════════════════════
   useGameState — Core game logic via useReducer
   ═══════════════════════════════════════════════════════════════════════════ */

// Colors for card pairs — used to visually distinguish matched pairs
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

// Shuffle array using Fisher-Yates
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Generate cards for a given configuration
function generateCards(gridSize, deck) {
  const shapes = deck === 'mechanical' ? MECHANICAL_SHAPES : SHARK_SHAPES;
  const pairCount = gridSize === '4x4' ? 8 : gridSize === '5x5' ? 12 : 18;

  const cards = [];
  for (let i = 0; i < pairCount; i++) {
    const shape = shapes[i % shapes.length];
    const pairId = i;

    // Left half
    cards.push({
      id: i * 2,
      pairId,
      halfType: 'left',
      shapeName: shape.name,
      colorIndex: i,
      isFlipped: false,
      isMatched: false,
    });

    // Right half
    cards.push({
      id: i * 2 + 1,
      pairId,
      halfType: 'right',
      shapeName: shape.name,
      colorIndex: i,
      isFlipped: false,
      isMatched: false,
    });
  }

  return shuffle(cards);
}

// ─── Reducer ──────────────────────────────────────────────────────────────

const initialState = {
  cards: [],
  flippedCardIds: [],    // IDs of currently face-up, unmatched cards (max 2)
  matches: 0,
  moves: 0,
  totalPairs: 0,
  gameStatus: 'idle',    // idle | playing | won | lost
  mismatchIds: [],       // IDs of cards currently showing mismatch animation
  config: null,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'INIT_GAME': {
      const { gridSize, deck } = action.payload;
      const cards = generateCards(gridSize, deck);
      const pairCount = gridSize === '4x4' ? 8 : gridSize === '5x5' ? 12 : 18;
      return {
        ...initialState,
        cards,
        totalPairs: pairCount,
        gameStatus: 'playing',
        config: action.payload,
      };
    }

    case 'FLIP_CARD': {
      const cardId = action.payload;
      const card = state.cards.find(c => c.id === cardId);

      // Ignore if already flipped, matched, or two cards already face up
      if (!card || card.isFlipped || card.isMatched || state.flippedCardIds.length >= 2) {
        return state;
      }

      // Ignore during mismatch animation
      if (state.mismatchIds.length > 0) return state;

      const newCards = state.cards.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c
      );

      const newFlipped = [...state.flippedCardIds, cardId];

      return {
        ...state,
        cards: newCards,
        flippedCardIds: newFlipped,
      };
    }

    case 'CHECK_MATCH': {
      if (state.flippedCardIds.length !== 2) return state;

      const [id1, id2] = state.flippedCardIds;
      const card1 = state.cards.find(c => c.id === id1);
      const card2 = state.cards.find(c => c.id === id2);

      if (!card1 || !card2) return state;

      const isMatch = card1.pairId === card2.pairId && card1.id !== card2.id;
      const newMoves = state.moves + 1;

      if (isMatch) {
        const newCards = state.cards.map(c =>
          c.id === id1 || c.id === id2 ? { ...c, isMatched: true } : c
        );
        const newMatches = state.matches + 1;
        const gameWon = newMatches === state.totalPairs;

        return {
          ...state,
          cards: newCards,
          flippedCardIds: [],
          matches: newMatches,
          moves: newMoves,
          gameStatus: gameWon ? 'won' : 'playing',
          mismatchIds: [],
        };
      }

      // Mismatch — mark for animation
      return {
        ...state,
        moves: newMoves,
        mismatchIds: [id1, id2],
      };
    }

    case 'MISMATCH_RESET': {
      const newCards = state.cards.map(c =>
        state.mismatchIds.includes(c.id) ? { ...c, isFlipped: false } : c
      );

      return {
        ...state,
        cards: newCards,
        flippedCardIds: [],
        mismatchIds: [],
      };
    }

    case 'TIME_UP': {
      return {
        ...state,
        gameStatus: 'lost',
      };
    }

    case 'RESTART': {
      if (!state.config) return state;
      const cards = generateCards(state.config.gridSize, state.config.deck);
      return {
        ...initialState,
        cards,
        totalPairs: state.totalPairs,
        gameStatus: 'playing',
        config: state.config,
      };
    }

    default:
      return state;
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────

export default function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const initGame = useCallback((config) => {
    dispatch({ type: 'INIT_GAME', payload: config });
  }, []);

  const flipCard = useCallback((cardId) => {
    dispatch({ type: 'FLIP_CARD', payload: cardId });
  }, []);

  const checkMatch = useCallback(() => {
    dispatch({ type: 'CHECK_MATCH' });
  }, []);

  const mismatchReset = useCallback(() => {
    dispatch({ type: 'MISMATCH_RESET' });
  }, []);

  const timeUp = useCallback(() => {
    dispatch({ type: 'TIME_UP' });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  return {
    ...state,
    initGame,
    flipCard,
    checkMatch,
    mismatchReset,
    timeUp,
    restart,
    pairColorsDark: PAIR_COLORS_DARK,
    pairColorsLight: PAIR_COLORS_LIGHT,
  };
}
