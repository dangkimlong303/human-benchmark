import { useState, useRef, useCallback } from 'react';

export type GameState = 'IDLE' | 'WAITING' | 'READY' | 'RESULT' | 'TOO_EARLY';

export const useReactionTest = () => {
  const [gameState, setGameState] = useState<GameState>('IDLE');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startGame = useCallback(() => {
    setGameState('WAITING');
    setReactionTime(null);
    
    // Random time between 2 to 5 seconds
    const randomDelay = Math.floor(Math.random() * 3000) + 2000;
    
    timerRef.current = setTimeout(() => {
      setGameState('READY');
      startTimeRef.current = performance.now();
    }, randomDelay);
  }, []);

  const handleClick = useCallback(() => {
    switch (gameState) {
      case 'IDLE':
      case 'RESULT':
      case 'TOO_EARLY':
        // Start or restart the game
        startGame();
        break;
        
      case 'WAITING':
        // User clicked too early
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        setGameState('TOO_EARLY');
        break;
        
      case 'READY':
        // Correct click, calculate reaction time
        const endTime = performance.now();
        const timeTaken = Math.round(endTime - startTimeRef.current);
        setReactionTime(timeTaken);
        setGameState('RESULT');
        break;
    }
  }, [gameState, startGame]);

  // Cleanup timeout on unmount
  useCallback(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return {
    gameState,
    reactionTime,
    handleClick,
  };
};
