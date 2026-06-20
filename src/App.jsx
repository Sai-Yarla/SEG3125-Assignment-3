import { useState, useCallback } from 'react';
import { ThemeProvider } from './ThemeContext';
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
    // Restart with same config
    setScreen('gameplay');
    // Force remount by changing key (handled in render)
    setGameConfig(prev => ({ ...prev, _key: Date.now() }));
  }, []);

  const handleBackToSetup = useCallback(() => {
    setScreen('setup');
    setGameConfig(null);
    setGameResults(null);
  }, []);

  return (
    <ThemeProvider>
      {screen === 'setup' && (
        <SetupScreen onStart={handleStart} />
      )}

      {screen === 'gameplay' && gameConfig && (
        <GameplayScreen
          key={gameConfig._key || 'game'}
          config={gameConfig}
          onGameOver={handleGameOver}
          onBack={handleBackToSetup}
        />
      )}

      {screen === 'gameover' && gameResults && (
        <GameOverScreen
          results={gameResults}
          onRestart={handleRestart}
          onBack={handleBackToSetup}
        />
      )}
    </ThemeProvider>
  );
}
