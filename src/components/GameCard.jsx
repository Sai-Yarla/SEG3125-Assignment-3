import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import CardBack from '../cards/CardBack';
import { MECHANICAL_SHAPES } from '../cards/MechanicalCards';
import { SHARK_SHAPES } from '../cards/SharkCards';

/* ═══════════════════════════════════════════════════════════════════════════
   GameCard — Single card with Framer Motion 3D flip animation
   ═══════════════════════════════════════════════════════════════════════════ */

const PAIR_COLORS = [
  '#d90429', '#e76f51', '#2a9d8f', '#0077b6',
  '#023e8a', '#03045e', '#8338ec', '#b5179e',
  '#f15bb5', '#ff006e', '#5f0f40', '#9d0208',
  '#2b2d42', '#6c757d', '#38b000', '#00f5d4',
  '#a3b18a', '#432818',
];

export default function GameCard({ card, deck, isMismatched, onClick, disabled }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (card.isMatched) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 650);
      return () => clearTimeout(t);
    }
  }, [card.isMatched]);

  const shapes = deck === 'mechanical' ? MECHANICAL_SHAPES : SHARK_SHAPES;

  const shape = useMemo(() => {
    return shapes.find((s) => s.name === card.shapeName) || shapes[0];
  }, [card.shapeName, shapes]);

  const color = PAIR_COLORS[card.colorIndex % PAIR_COLORS.length];
  const isFlipped = card.isFlipped || card.isMatched;

  const FaceComponent = card.halfType === 'left' ? shape.Left : shape.Right;

  const handleClick = () => {
    if (!disabled && !card.isMatched && !card.isFlipped) {
      onClick(card.id);
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={isFlipped || disabled ? -1 : 0}
      onClick={!isFlipped ? handleClick : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !isFlipped) handleClick();
      }}
      animate={{ scale: pulse ? [1, 1.055, 1] : 1 }}
      transition={{ duration: 0.45 }}
      className={`relative focus:outline-none ${!isFlipped && !disabled ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ perspective: "900px" }}
      whileHover={!isFlipped && !disabled ? { scale: 1.03 } : {}}
      whileTap={!isFlipped && !disabled ? { scale: 0.97 } : {}}
      id={`card-${card.id}`}
      aria-label={`Card ${card.id + 1}${card.isFlipped ? `, showing ${card.shapeName} ${card.halfType} half` : ', face down'}`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.58, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d", position: "relative", paddingBottom: "100%" }}
      >
        {/* Back face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            boxShadow: "0 2px 14px rgba(44,40,32,0.09), 0 1px 3px rgba(44,40,32,0.05)",
          }}
        >
          <div className="w-full h-full flex items-center justify-center rounded-[inherit]" style={{ background: "#EEE9E1" }}>
            <CardBack />
          </div>
        </div>

        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-white"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: card.isMatched ? "1.5px solid rgba(201,168,130,0.6)" : isMismatched ? "1.5px solid #e63946" : "1px solid rgba(44,40,32,0.08)",
            boxShadow: card.isMatched
              ? "0 4px 22px rgba(201,168,130,0.45), 0 1px 6px rgba(201,168,130,0.2)"
              : isMismatched
              ? "0 4px 22px rgba(230,57,70,0.3)"
              : "0 2px 14px rgba(44,40,32,0.08)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "8%" }}>
             <FaceComponent color={color} glowing={card.isMatched} />
          </div>
          {/* subtle split-line indicator */}
          <div
            className={`absolute inset-y-[18%] w-px ${card.halfType === "left" ? "right-0" : "left-0"}`}
            style={{ background: "rgba(74,127,165,0.13)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
