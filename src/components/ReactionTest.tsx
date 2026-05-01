'use client';

import React from 'react';
import { useReactionTest, GameState } from '@/hooks/useReactionTest';

export const ReactionTest: React.FC = () => {
  const { gameState, reactionTime, handleClick } = useReactionTest();

  // Determine colors based on game state
  const bgColors: Record<GameState, string> = {
    IDLE: 'bg-blue-500 hover:bg-blue-600',
    WAITING: 'bg-red-500',
    READY: 'bg-green-500',
    RESULT: 'bg-blue-500 hover:bg-blue-600',
    TOO_EARLY: 'bg-blue-500 hover:bg-blue-600',
  };

  const currentBgClass = bgColors[gameState];

  return (
    <div 
      className={`w-full flex-1 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 select-none ${currentBgClass}`}
      onMouseDown={handleClick}
    >
      <div className="text-white text-center p-6 flex flex-col items-center">
        {gameState === 'IDLE' && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-6 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h1 className="text-6xl font-bold mb-4 tracking-tight">Reaction Time Test</h1>
            <p className="text-2xl font-medium opacity-90 mt-4">When the red box turns green, click as quickly as you can.</p>
            <p className="text-xl mt-8 font-semibold animate-pulse">Click anywhere to start.</p>
          </>
        )}

        {gameState === 'WAITING' && (
          <>
            <h1 className="text-6xl font-bold tracking-widest animate-pulse">•••</h1>
            <h2 className="text-4xl font-bold mt-4">Wait for green</h2>
          </>
        )}

        {gameState === 'READY' && (
          <>
            <h1 className="text-7xl font-black tracking-wider">CLICK!</h1>
          </>
        )}

        {gameState === 'RESULT' && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-6 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-7xl font-bold mb-4">{reactionTime} ms</h1>
            <p className="text-2xl mt-4 opacity-90">Click to keep going</p>
          </>
        )}

        {gameState === 'TOO_EARLY' && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-6 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-5xl font-bold mb-4">Too soon!</h1>
            <p className="text-2xl mt-4 opacity-90">Click to try again.</p>
          </>
        )}
      </div>
    </div>
  );
};
