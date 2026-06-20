import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

interface SharkDef {
  name: string;
  color: string;
  shape: "A" | "B" | "C" | "D";
}

const SHARKS: SharkDef[] = [
  { name: "Great White",  color: "#6B9FB8", shape: "A" },
  { name: "Hammerhead",   color: "#8A9EB5", shape: "B" },
  { name: "Tiger Shark",  color: "#B8A48A", shape: "A" },
  { name: "Bull Shark",   color: "#7A8EA0", shape: "D" },
  { name: "Mako",         color: "#9BAAB8", shape: "C" },
  { name: "Reef Shark",   color: "#C4A882", shape: "A" },
  { name: "Blue Shark",   color: "#6D8FA8", shape: "D" },
  { name: "Nurse Shark",  color: "#B0A890", shape: "C" },
];

// All paths in 280×120 viewBox; body splits cleanly at x=140
const PATHS: Record<string, string> = {
  A: "M14,62 C14,50 22,40 40,34 C58,26 80,22 108,21 L122,20 L130,6 L138,20 C156,19 172,18 186,19 C198,20 210,24 217,27 L233,12 L250,27 C257,36 258,49 256,62 C258,75 257,88 250,97 L233,112 L217,97 C210,100 197,103 184,103 L130,104 L108,104 C80,104 58,100 40,93 C22,86 14,74 14,62 Z",
  B: "M6,60 L6,48 L36,44 C36,38 40,31 46,28 C62,21 84,19 110,18 L124,17 L130,4 L138,17 C156,16 172,16 188,17 C200,18 211,22 218,26 L234,12 L250,26 C258,35 258,48 256,60 C258,72 258,85 250,94 L234,108 L218,95 C211,98 199,101 187,101 L130,102 L110,102 C84,101 62,98 46,91 C40,87 36,80 36,74 L6,70 L6,60 Z",
  C: "M14,62 C14,50 22,40 42,34 C60,26 84,22 112,21 L126,20 L134,6 L141,20 C158,19 173,18 186,20 C197,21 207,25 212,29 L229,24 L254,5 L258,24 C264,34 265,48 263,62 C265,76 264,90 258,100 L254,118 L229,100 C214,106 197,108 181,108 L133,109 L112,109 C84,108 60,104 42,97 C22,88 14,74 14,62 Z",
  D: "M18,62 C18,52 26,42 46,36 C64,28 88,24 114,23 L128,22 L135,8 L143,22 C160,21 175,20 188,22 L205,25 L224,16 L242,29 C249,38 250,50 248,62 C250,74 249,86 242,95 L224,107 L205,100 C190,103 176,105 160,105 L135,106 L114,106 C88,105 64,101 46,93 C26,83 18,74 18,62 Z",
};

// ─── Types ─────────────────────────────────────────────────────────────────

type Screen = "selection" | "game" | "complete";

interface Card {
  id: number;
  pairId: number;
  half: "left" | "right";
  flipped: boolean;
  matched: boolean;
}

interface CarouselItem {
  id: string;
  label: string;
  sub: string;
  photo: string;
}

// ─── Utilities ─────────────────────────────────────────────────────────────

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const cards: Card[] = [];
  for (let p = 0; p < 8; p++) {
    cards.push({ id: p * 2,     pairId: p, half: "left",  flipped: false, matched: false });
    cards.push({ id: p * 2 + 1, pairId: p, half: "right", flipped: false, matched: false });
  }
  return shuffled(cards);
}

// ─── SVG primitives ────────────────────────────────────────────────────────

function SharkSVG({ pairId, viewBox }: { pairId: number; viewBox: string }) {
  const s = SHARKS[pairId];
  return (
    <svg viewBox={viewBox} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <path d={PATHS[s.shape]} fill={s.color} />
    </svg>
  );
}

function CardBack() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-[inherit]" style={{ background: "#EEE9E1" }}>
      <svg viewBox="0 0 56 56" className="w-3/4 h-3/4">
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M0,${9 + i * 10} Q14,${5 + i * 10} 28,${9 + i * 10} Q42,${13 + i * 10} 56,${9 + i * 10}`}
            stroke="#7BA7BC"
            strokeWidth="0.9"
            fill="none"
            opacity="0.4"
          />
        ))}
        <path
          d="M28,44 L28,29 Q28,24 23,21 Q17,18 15,14 Q21,17 28,17 L28,29"
          fill="#7BA7BC"
          opacity="0.22"
        />
        <line x1="15" y1="44" x2="41" y2="44" stroke="#7BA7BC" strokeWidth="0.9" opacity="0.28" />
      </svg>
    </div>
  );
}

// ─── GameCard ──────────────────────────────────────────────────────────────

function GameCard({ card, onClick }: { card: Card; onClick: () => void }) {
  const revealed = card.flipped || card.matched;
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (card.matched) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 650);
      return () => clearTimeout(t);
    }
  }, [card.matched]);

  return (
    <motion.div
      role="button"
      tabIndex={revealed ? -1 : 0}
      onClick={!revealed ? onClick : undefined}
      onKeyDown={(e) => { if (e.key === "Enter" && !revealed) onClick(); }}
      animate={{ scale: pulse ? [1, 1.055, 1] : 1 }}
      transition={{ duration: 0.45 }}
      className="relative focus:outline-none cursor-pointer"
      style={{ perspective: "900px" }}
      whileHover={!revealed ? { scale: 1.03 } : {}}
      whileTap={!revealed ? { scale: 0.97 } : {}}
    >
      <motion.div
        animate={{ rotateY: revealed ? 180 : 0 }}
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
          <CardBack />
        </div>

        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-white"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: card.matched ? "1.5px solid rgba(201,168,130,0.6)" : "1px solid rgba(44,40,32,0.08)",
            boxShadow: card.matched
              ? "0 4px 22px rgba(201,168,130,0.45), 0 1px 6px rgba(201,168,130,0.2)"
              : "0 2px 14px rgba(44,40,32,0.08)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center" style={{ padding: "8%" }}>
            <SharkSVG pairId={card.pairId} viewBox={card.half === "left" ? "0 0 140 120" : "140 0 140 120"} />
          </div>
          {/* subtle split-line indicator */}
          <div
            className={`absolute inset-y-[18%] w-px ${card.half === "left" ? "right-0" : "left-0"}`}
            style={{ background: "rgba(74,127,165,0.13)" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── OptionCarousel ────────────────────────────────────────────────────────

function OptionCarousel({ items, value, onChange }: { items: CarouselItem[]; value: string; onChange: (id: string) => void }) {
  const [idx, setIdx] = useState(Math.max(0, items.findIndex((x) => x.id === value)));

  const go = (dir: -1 | 1) => {
    const next = (idx + dir + items.length) % items.length;
    setIdx(next);
    onChange(items[next].id);
  };

  const cur = items[idx];

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => go(-1)}
        className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
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
            onClick={() => onChange(cur.id)}
          >
            <img
              src={`https://images.unsplash.com/${cur.photo}`}
              alt={cur.label}
              className="w-full h-full object-cover"
              style={{ background: "#C4D8E8" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/8 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white text-[15px] leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>
                {cur.label}
              </p>
              <p className="text-white/58 text-xs mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
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

      {/* Dot indicators */}
      <div className="absolute" style={{ display: "none" }} />

      <button
        onClick={() => go(1)}
        className="w-9 h-9 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
        aria-label="Next"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

// ─── Screen 1: Selection ───────────────────────────────────────────────────

function SelectionScreen({ onBegin }: { onBegin: () => void }) {
  const [difficulty, setDifficulty] = useState("beginner");
  const [theme, setTheme] = useState("sharks");

  const diffs: CarouselItem[] = [
    { id: "beginner",     label: "Beginner",     sub: "4 × 4 Grid · 8 Pairs",  photo: "photo-1505118380757-91f5f5632de0?w=700&h=400&fit=crop&auto=format" },
    { id: "intermediate", label: "Intermediate", sub: "6 × 6 Grid · 18 Pairs", photo: "photo-1518020382113-a7e8fc38eac9?w=700&h=400&fit=crop&auto=format" },
    { id: "expert",       label: "Expert",       sub: "8 × 8 Grid · 32 Pairs", photo: "photo-1483722284720-a43c88e8b8c3?w=700&h=400&fit=crop&auto=format" },
  ];

  const themes: CarouselItem[] = [
    { id: "sharks", label: "Shark Silhouettes", sub: "Apex Predator Forms",  photo: "photo-1560275619-4cc5fa59d3ae?w=700&h=400&fit=crop&auto=format" },
    { id: "ocean",  label: "Ocean Life",        sub: "Diverse Marine World", photo: "photo-1583212292454-1fe6229603b7?w=700&h=400&fit=crop&auto=format" },
    { id: "deep",   label: "Deep Sea",          sub: "Abyssal Wonders",      photo: "photo-1534766555764-ce878a5e3a2b?w=700&h=400&fit=crop&auto=format" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-background flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Wordmark */}
      <div className="flex-shrink-0 pt-14 pb-10 px-6 text-center">
        <p className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground mb-3">
          Memory · Gestalt
        </p>
        <h1
          className="text-foreground leading-none tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(2.6rem, 9vw, 4rem)" }}
        >
          Steel Shark
        </h1>
        <p className="text-sm text-muted-foreground mt-2.5">Discover the form within</p>
      </div>

      {/* Selection panels */}
      <div className="flex-1 flex flex-col gap-9 px-6 max-w-md mx-auto w-full">
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">Difficulty</span>
            <span className="text-xs text-primary capitalize">{difficulty}</span>
          </div>
          <OptionCarousel items={diffs} value={difficulty} onChange={setDifficulty} />
          {/* Position dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            {diffs.map((d) => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className="rounded-full transition-all"
                style={{
                  width: d.id === difficulty ? 16 : 6,
                  height: 6,
                  background: d.id === difficulty ? "#4A7FA5" : "rgba(74,127,165,0.25)",
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">Theme</span>
            <span className="text-xs text-primary">{themes.find((t) => t.id === theme)?.label}</span>
          </div>
          <OptionCarousel items={themes} value={theme} onChange={setTheme} />
          <div className="flex justify-center gap-1.5 mt-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="rounded-full transition-all"
                style={{
                  width: t.id === theme ? 16 : 6,
                  height: 6,
                  background: t.id === theme ? "#4A7FA5" : "rgba(74,127,165,0.25)",
                }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Begin Journey */}
      <div className="flex-shrink-0 py-12 flex flex-col items-center gap-2">
        <motion.button
          onClick={onBegin}
          whileHover={{ y: -1.5 }}
          whileTap={{ scale: 0.97 }}
          className="text-foreground border-b border-foreground/22 pb-px hover:border-foreground/55 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "1.0625rem" }}
        >
          Begin Journey
        </motion.button>
        <p className="text-[11px] text-muted-foreground mt-1">No timer · No pressure · Take your time</p>
      </div>
    </motion.div>
  );
}

// ─── Screen 2: Game ────────────────────────────────────────────────────────

function GameScreen({ onComplete }: { onComplete: () => void }) {
  const [deck, setDeck] = useState<Card[]>(buildDeck);
  const [open, setOpen] = useState<number[]>([]);
  const [pairs, setPairs] = useState(0);
  const busyRef = useRef(false);

  const flip = useCallback((idx: number) => {
    if (busyRef.current) return;
    const card = deck[idx];
    if (card.flipped || card.matched) return;
    if (open.length >= 2) return;

    setDeck((d) => d.map((c, i) => (i === idx ? { ...c, flipped: true } : c)));
    const newOpen = [...open, idx];
    setOpen(newOpen);

    if (newOpen.length === 2) {
      busyRef.current = true;
      const [a, b] = newOpen;
      const cA = deck[a];
      const cB = deck[b];

      setTimeout(() => {
        if (cA.pairId === cB.pairId && cA.half !== cB.half) {
          setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, matched: true, flipped: true } : c)));
          setPairs((p) => {
            const next = p + 1;
            if (next === 8) setTimeout(onComplete, 950);
            return next;
          });
        } else {
          setDeck((d) => d.map((c, i) => (i === a || i === b ? { ...c, flipped: false } : c)));
        }
        setOpen([]);
        busyRef.current = false;
      }, 960);
    }
  }, [deck, open, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="flex-shrink-0 pt-10 pb-5 px-6 flex items-end justify-between max-w-sm mx-auto w-full">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-muted-foreground">Steel Shark</p>
          <p className="text-sm text-foreground mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gestalt Match
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Pairs found</p>
          <p
            className="text-[1.6rem] text-foreground leading-none mt-0.5"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            {pairs}
            <span className="text-sm text-muted-foreground"> / 8</span>
          </p>
        </div>
      </div>

      {/* Pair progress bar */}
      <div className="px-6 max-w-sm mx-auto w-full mb-5">
        <div className="h-px bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary/40 rounded-full"
            animate={{ width: `${(pairs / 8) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 flex items-center justify-center px-5 pb-4">
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 10, maxWidth: 344 }}
        >
          {deck.map((card, idx) => (
            <GameCard key={card.id} card={card} onClick={() => flip(idx)} />
          ))}
        </div>
      </div>

      {/* Hint */}
      <p className="flex-shrink-0 pb-8 text-center text-[11px] text-muted-foreground">
        Pair each shark&apos;s left and right halves
      </p>
    </motion.div>
  );
}

// ─── Screen 3: Complete ────────────────────────────────────────────────────

function CompleteScreen({ onMenu }: { onMenu: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Assembled Great White – halves slide in */}
      <motion.div
        className="mb-8 relative"
        style={{ width: 268 }}
        animate={{ filter: ["drop-shadow(0 0 0px rgba(201,168,130,0))", "drop-shadow(0 6px 20px rgba(201,168,130,0.45))"] }}
        transition={{ delay: 1.15, duration: 0.7 }}
      >
        <div className="flex" style={{ height: 115 }}>
          <motion.div
            style={{ width: 134, height: 115, flexShrink: 0 }}
            initial={{ x: -28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          >
            <SharkSVG pairId={0} viewBox="0 0 140 120" />
          </motion.div>
          <motion.div
            style={{ width: 134, height: 115, flexShrink: 0 }}
            initial={{ x: 28, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          >
            <SharkSVG pairId={0} viewBox="140 0 140 120" />
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center text-[10px] tracking-[0.22em] uppercase text-muted-foreground mt-2"
        >
          {SHARKS[0].name}
        </motion.p>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05 }}
        className="text-center mb-9"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-2.5">All pairs discovered</p>
        <h1
          className="text-foreground leading-none tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(2.2rem, 7vw, 3.4rem)" }}
        >
          Level Complete
        </h1>
        <p className="text-sm text-muted-foreground mt-3">Eight apex forms, perfectly aligned.</p>
      </motion.div>

      {/* All 8 shark tiles */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-4 w-full mb-10"
        style={{ gap: 10, maxWidth: 340 }}
      >
        {SHARKS.map((shark, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.28 + i * 0.065, duration: 0.38 }}
            className="bg-white rounded-xl border border-border flex flex-col items-center py-2.5 px-1"
            style={{ boxShadow: "0 2px 10px rgba(44,40,32,0.07)" }}
          >
            <svg
              viewBox="0 0 280 120"
              width="100%"
              className="h-7"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d={PATHS[shark.shape]} fill={shark.color} />
            </svg>
            <p className="text-[7.5px] text-muted-foreground mt-1.5 text-center leading-tight px-0.5">
              {shark.name}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.85 }}
        className="flex items-center gap-8"
      >
        <button
          onClick={onMenu}
          className="text-primary border-b border-primary/38 pb-px hover:border-primary transition-colors"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "0.9375rem" }}
        >
          Explore Gallery
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

// ─── Root ──────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("selection");

  return (
    <div className="size-full bg-background overflow-y-auto overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === "selection" && (
          <SelectionScreen key="sel" onBegin={() => setScreen("game")} />
        )}
        {screen === "game" && (
          <GameScreen key="game" onComplete={() => setScreen("complete")} />
        )}
        {screen === "complete" && (
          <CompleteScreen key="comp" onMenu={() => setScreen("selection")} />
        )}
      </AnimatePresence>
    </div>
  );
}
