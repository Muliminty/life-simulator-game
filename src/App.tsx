import { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import StartScreen from './components/StartScreen';
import GameView from './views/GameView';

function App() {
  const { player, gameStarted, createNewGame, resetGame } = useGameState();
  const [showStartScreen, setShowStartScreen] = useState(!gameStarted);

  const handleCreateGame = (name: string, attributes: any) => {
    createNewGame(name, attributes);
    setShowStartScreen(false);
  };

  const handleReset = () => {
    resetGame();
    setShowStartScreen(true);
  };

  if (showStartScreen || !player) {
    return <StartScreen onCreateGame={handleCreateGame} />;
  }

  return (
    <>
      <GameView />
      <div style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          重置游戏
        </button>
      </div>
    </>
  );
}

export default App;

