import { useState, useEffect } from 'react';
import { GameIntro } from '@/app/components/GameIntro';
import { Tutorial } from '@/app/components/Tutorial';
import { GamePhase1, PreparednessData } from '@/app/components/GamePhase1';
import { GamePhase2, ResponseData } from '@/app/components/GamePhase2';
import { GamePhase3 } from '@/app/components/GamePhase3';
import { GameReport } from '@/app/components/GameReport';
import { HelpButton } from '@/app/components/HelpButton';
import { Toaster } from '@/app/components/ui/sonner';
import { toast } from 'sonner';

type GameScreen = 'intro' | 'tutorial' | 'phase1' | 'phase2' | 'phase3' | 'report';

interface GameState {
  screen: GameScreen;
  disaster: string;
  preparedness: PreparednessData | null;
  response: ResponseData | null;
}

const INITIAL_STATE: GameState = {
  screen: 'intro',
  disaster: '',
  preparedness: null,
  response: null
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Load saved game state from localStorage
    const saved = localStorage.getItem('drrm-game-state');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_STATE;
      }
    }
    return INITIAL_STATE;
  });

  // Auto-save game state
  useEffect(() => {
    localStorage.setItem('drrm-game-state', JSON.stringify(gameState));
  }, [gameState]);

  const handleStartGame = (disaster: string) => {
    setGameState({
      screen: 'phase1',
      disaster,
      preparedness: null,
      response: null
    });
    toast.success(`Starting ${disaster} scenario - Phase 1: Preparedness`);
  };

  const handleStartTutorial = () => {
    setGameState({ ...gameState, screen: 'tutorial' });
  };

  const handleTutorialComplete = () => {
    setGameState({ ...gameState, screen: 'intro' });
    toast.success('Tutorial completed! Choose a disaster scenario to begin.');
  };

  const handleTutorialExit = () => {
    setGameState({ ...gameState, screen: 'intro' });
  };

  const handlePhase1Complete = (preparednessData: PreparednessData) => {
    setGameState({
      ...gameState,
      screen: 'phase2',
      preparedness: preparednessData
    });
    toast.success('Phase 1 Complete! Moving to Response Phase...', {
      description: `Preparedness Score: ${preparednessData.preparednessScore}%`
    });
  };

  const handlePhase2Complete = (responseData: ResponseData) => {
    setGameState({
      ...gameState,
      screen: 'phase3',
      response: responseData
    });
    toast.success('Phase 2 Complete! Moving to Recovery Phase...', {
      description: `Response Score: ${responseData.responseScore}%`
    });
  };

  const handlePhase3Complete = () => {
    setGameState({ ...gameState, screen: 'report' });
    toast.success('All Phases Complete! Generating Report...');
  };

  const handlePlayAgain = () => {
    setGameState(INITIAL_STATE);
    toast.info('Ready for another scenario!');
  };

  const handleBackToMenu = () => {
    setGameState(INITIAL_STATE);
  };

  const calculateFinalScore = () => {
    if (!gameState.preparedness || !gameState.response) return 0;
    
    const prepWeight = 30;
    const responseWeight = 40;
    const recoveryWeight = 30; // Simplified - in Phase3 it calculates this properly
    
    const prepScore = (gameState.preparedness.preparednessScore / 100) * prepWeight;
    const respScore = (gameState.response.responseScore / 100) * responseWeight;
    const recovScore = (80 / 100) * recoveryWeight; // Default recovery score
    
    return Math.round(prepScore + respScore + recovScore);
  };

  return (
    <>
      {gameState.screen === 'intro' && (
        <GameIntro 
          onStartGame={handleStartGame}
          onStartTutorial={handleStartTutorial}
        />
      )}

      {gameState.screen === 'tutorial' && (
        <Tutorial
          onComplete={handleTutorialComplete}
          onExit={handleTutorialExit}
        />
      )}

      {gameState.screen === 'phase1' && (
        <GamePhase1
          disaster={gameState.disaster}
          onComplete={handlePhase1Complete}
        />
      )}

      {gameState.screen === 'phase2' && gameState.preparedness && (
        <GamePhase2
          disaster={gameState.disaster}
          preparedness={gameState.preparedness}
          onComplete={handlePhase2Complete}
        />
      )}

      {gameState.screen === 'phase3' && gameState.preparedness && gameState.response && (
        <GamePhase3
          disaster={gameState.disaster}
          preparedness={gameState.preparedness}
          response={gameState.response}
          onComplete={handlePhase3Complete}
        />
      )}

      {gameState.screen === 'report' && gameState.preparedness && gameState.response && (
        <GameReport
          disaster={gameState.disaster}
          preparedness={gameState.preparedness}
          response={gameState.response}
          finalScore={calculateFinalScore()}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {/* Always-visible Help Button (except on intro screen) */}
      {gameState.screen !== 'intro' && <HelpButton />}

      {/* Toast notifications */}
      <Toaster position="top-center" richColors />
    </>
  );
}
