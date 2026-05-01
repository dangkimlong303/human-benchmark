import { useState, useRef, useCallback, useEffect } from 'react';

export type AimGameState = 'IDLE' | 'PLAYING' | 'RESULT' | 'TIMEOUT';

interface Position {
  x: number;
  y: number;
}

export const useAimTest = () => {
  const [gameState, setGameState] = useState<AimGameState>('IDLE');
  const [targetCount, setTargetCount] = useState<number>(30); // Configurable: 20, 30, 40
  const [hits, setHits] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  
  // X and Y in percentages (10% to 90%)
  const [targetPos, setTargetPos] = useState<Position>({ x: 50, y: 50 });

  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomPos = () => {
    // Keep target within 10% to 90% of the container to avoid edge clipping
    return {
      x: Math.floor(Math.random() * 80) + 10,
      y: Math.floor(Math.random() * 80) + 10,
    };
  };

  const startGame = useCallback((selectedCount: number) => {
    setTargetCount(selectedCount);
    setHits(0);
    setMisses(0);
    setTimeTaken(null);
    setTargetPos(generateRandomPos());
    setGameState('PLAYING');
    
    startTimeRef.current = performance.now();

    // 1-minute cut-off time
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setGameState('TIMEOUT');
    }, 60000);
  }, []);

  const handleHit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent trigger miss
    if (gameState !== 'PLAYING') return;

    const newHits = hits + 1;
    setHits(newHits);

    if (newHits >= targetCount) {
      // Game over, calculate time
      const endTime = performance.now();
      setTimeTaken(Math.round(endTime - startTimeRef.current));
      setGameState('RESULT');
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    } else {
      // Next target
      setTargetPos(generateRandomPos());
    }
  }, [gameState, hits, targetCount]);

  const handleMiss = useCallback(() => {
    if (gameState !== 'PLAYING') return;
    setMisses((prev) => prev + 1);
  }, [gameState]);

  const resetGame = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setGameState('IDLE');
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    gameState,
    targetCount,
    hits,
    misses,
    timeTaken,
    targetPos,
    startGame,
    handleHit,
    handleMiss,
    resetGame,
  };
};
