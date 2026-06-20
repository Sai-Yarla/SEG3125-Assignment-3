import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function OptionCarousel({ items, value, onChange }) {
  const [idx, setIdx] = useState(Math.max(0, items.findIndex((x) => x.id === value)));

  const go = (dir) => {
    const next = (idx + dir + items.length) % items.length;
    setIdx(next);
    onChange(items[next].id);
  };

  const cur = items[idx];

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => go(-1)}
        className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
        aria-label="Previous"
      >
        <ChevronLeft size={15} />
      </button>

      <div className="relative flex-1 overflow-hidden" style={{ height: 172 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden rounded-2xl cursor-pointer"
            style={{
              border: "2px solid rgba(74,127,165,0.45)",
              boxShadow: "0 6px 28px rgba(74,127,165,0.13)",
            }}
            onClick={() => go(1)}
          >
            <img
              src={`https://images.unsplash.com/${cur.photo}`}
              alt={cur.label}
              className="w-full h-full object-cover"
              style={{ background: "#C4D8E8" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-[15px] leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
                {cur.label}
              </p>
              <p className="text-white/60 text-xs mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {cur.sub}
              </p>
            </div>
            {/* active indicator */}
            <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-primary/90 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => go(1)}
        className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
        aria-label="Next"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
