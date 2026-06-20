import { motion } from 'motion/react';
import { MECHANICAL_SHAPES } from '../cards/MechanicalCards';
import { SHARK_SHAPES } from '../cards/SharkCards';

/* ═══════════════════════════════════════════════════════════════════════════
   GameOverScreen — End of game summary and gallery
   ═══════════════════════════════════════════════════════════════════════════ */

export default function GameOverScreen({ stats, onRestart, onMenu }) {
  const shapes = stats.config.deck === 'mechanical' ? MECHANICAL_SHAPES : SHARK_SHAPES;
  const targetShape = shapes[0];
  const FaceLeft = targetShape.Left;
  const FaceRight = targetShape.Right;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Assembled Entity – halves slide in */}
      <motion.div
        className="mb-8 relative"
        style={{ width: 268 }}
        animate={{ filter: ["drop-shadow(0 0 0px rgba(201,168,130,0))", "drop-shadow(0 0 50px rgba(201,168,130,0.8))", "drop-shadow(0 10px 30px rgba(201,168,130,0.5))"] }}
        transition={{ delay: 1.15, duration: 1.5, ease: "easeOut" }}
      >
        <div className="flex" style={{ height: 115 }}>
          <motion.div
            style={{ width: 134, height: 115, flexShrink: 0 }}
            initial={{ x: -60, opacity: 0, rotate: -15 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.32, duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <div className="w-full h-full p-2">
              <FaceLeft color={stats.config.deck === 'mechanical' ? '#e76f51' : '#6B9FB8'} />
            </div>
          </motion.div>
          <motion.div
            style={{ width: 134, height: 115, flexShrink: 0 }}
            initial={{ x: 60, opacity: 0, rotate: 15 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.32, duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <div className="w-full h-full p-2">
              <FaceRight color={stats.config.deck === 'mechanical' ? '#e76f51' : '#6B9FB8'} />
            </div>
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
          className="text-center text-xs tracking-[0.3em] uppercase text-primary font-bold mt-4"
        >
          {targetShape.name} Formed!
        </motion.p>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.05, type: "spring" }}
        className="text-center mb-10"
      >
        <p className={`text-xs tracking-[0.3em] uppercase font-bold mb-3 ${stats.won ? 'text-green-600' : 'text-destructive'}`}>
          {stats.won ? 'All pairs discovered' : 'Time Expired'}
        </p>
        <h1
          className="text-foreground leading-none tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(2.8rem, 8vw, 4.5rem)" }}
        >
          {stats.won ? 'Level Complete' : 'Mission Failed'}
        </h1>
        <p className="text-base text-muted-foreground mt-4">
          {stats.won
            ? `${stats.matches} perfect forms, perfectly aligned in ${stats.moves} moves.`
            : `You found ${stats.matches} pairs before time ran out.`}
        </p>
      </motion.div>

      {/* Discovered pairs grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-4 w-full mb-10"
        style={{ gap: 10, maxWidth: 340 }}
      >
        {shapes.slice(0, 8).map((shape, i) => {
          const ShapeLeft = shape.Left;
          const ShapeRight = shape.Right;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.28 + i * 0.065, duration: 0.38 }}
              className="bg-white rounded-xl border border-border flex flex-col items-center py-2.5 px-1"
              style={{ boxShadow: "0 2px 10px rgba(44,40,32,0.07)" }}
            >
              <div className="flex h-7 w-full justify-center opacity-80">
                <div className="w-1/2 h-full"><ShapeLeft color="#2a9d8f" /></div>
                <div className="w-1/2 h-full"><ShapeRight color="#2a9d8f" /></div>
              </div>
              <p className="text-[7.5px] text-muted-foreground mt-1.5 text-center leading-tight px-0.5 truncate w-full">
                {shape.name}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.85 }}
        className="flex items-center gap-8"
      >
        <button
          onClick={onRestart}
          className="text-primary border-b border-primary/38 pb-px hover:border-primary transition-colors"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "0.9375rem" }}
        >
          Play Again
        </button>
        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
        <button
          onClick={onMenu}
          className="text-foreground/65 border-b border-foreground/18 pb-px hover:text-foreground hover:border-foreground/45 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "0.9375rem" }}
        >
          Return to Menu
        </button>
      </motion.div>
    </motion.div>
  );
}
