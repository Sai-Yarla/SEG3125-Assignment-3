import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import SetupScreen from './screens/SetupScreen';
import GameplayScreen from './screens/GameplayScreen';
import GameOverScreen from './screens/GameOverScreen';

/* ═══════════════════════════════════════════════════════════════════════════
   App — Root component with screen routing
   setup → gameplay → gameover → (restart | setup)
   ═══════════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [screen, setScreen] = useState('setup'); // setup | gameplay | gameover
  const [gameConfig, setGameConfig] = useState(null);
  const [gameResults, setGameResults] = useState(null);

  const handleStart = useCallback((config) => {
    setGameConfig(config);
    setScreen('gameplay');
  }, []);

  const handleGameOver = useCallback((results) => {
    setGameResults(results);
    setScreen('gameover');
  }, []);

  const handleRestart = useCallback(() => {
    setScreen('gameplay');
    setGameConfig(prev => ({ ...prev, _key: Date.now() }));
  }, []);

  const handleBackToSetup = useCallback(() => {
    setScreen('setup');
    setGameConfig(null);
    setGameResults(null);
  }, []);

  return (
    <div className="w-full h-full bg-background overflow-y-auto overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === 'setup' && (
          <SetupScreen key="setup" onStart={handleStart} />
        )}

        {screen === 'gameplay' && gameConfig && (
          <GameplayScreen
            key={gameConfig._key || 'gameplay'}
            config={gameConfig}
            onGameOver={handleGameOver}
            onBack={handleBackToSetup}
          />
        )}

        {screen === 'gameover' && gameResults && (
          <GameOverScreen
            key="gameover"
            stats={gameResults}
            onRestart={handleRestart}
            onMenu={handleBackToSetup}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

