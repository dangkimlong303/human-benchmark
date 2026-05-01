'use client';

import React from 'react';
import { useAimTest } from '@/hooks/useAimTest';

export const AimTest: React.FC = () => {
  const {
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
  } = useAimTest();

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 relative overflow-hidden">
      
      {gameState === 'IDLE' && (
        <div className="flex flex-col items-center p-6 text-center max-w-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-6 text-[#2b87d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Aim Trainer</h1>
          <p className="text-xl opacity-80 mb-10">
            Hit the targets as quickly and accurately as you can. You have 1 minute.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button onClick={() => startGame(20)} className="px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-[#2b87d1] dark:hover:border-[#2b87d1] hover:text-[#2b87d1] transition-colors font-medium">
              20 Targets
            </button>
            <button onClick={() => startGame(30)} className="px-6 py-3 bg-[#2b87d1] text-white border border-transparent rounded-lg hover:bg-[#2069a5] transition-colors font-medium shadow-sm">
              30 Targets
            </button>
            <button onClick={() => startGame(40)} className="px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:border-[#2b87d1] dark:hover:border-[#2b87d1] hover:text-[#2b87d1] transition-colors font-medium">
              40 Targets
            </button>
          </div>
        </div>
      )}

      {gameState === 'PLAYING' && (
        <div className="w-full flex-1 flex flex-col items-center justify-center p-4 bg-zinc-100 dark:bg-zinc-950">
          {/* Top stats bar */}
          <div className="w-full max-w-4xl flex justify-between text-lg font-bold mb-4 opacity-70 select-none px-2">
            <div>Target: {hits} / {targetCount}</div>
            <div className="text-red-500">Misses: {misses}</div>
          </div>
          
          {/* Arena Box */}
          <div 
            className="w-full max-w-4xl h-[60vh] min-h-[400px] relative cursor-crosshair bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm"
            onMouseDown={handleMiss}
          >
            {/* The Target */}
            <div 
              className="absolute flex items-center justify-center rounded-full bg-[#2b87d1] hover:bg-[#2069a5] transition-colors shadow-lg cursor-pointer animate-in fade-in zoom-in duration-100"
              style={{ 
                left: `${targetPos.x}%`, 
                top: `${targetPos.y}%`,
                width: '60px',
                height: '60px',
                transform: 'translate(-50%, -50%)'
              }}
              onMouseDown={handleHit}
            >
              {/* Bullseye rings */}
              <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center pointer-events-none">
                 <div className="w-4 h-4 bg-white rounded-full pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {gameState === 'RESULT' && (
        <div className="flex flex-col items-center p-6 text-center max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-5xl font-bold mb-2">Test Complete</h1>
          
          <div className="w-full bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 my-8 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-700 pb-4">
              <span className="text-zinc-500 dark:text-zinc-400">Total Time</span>
              <span className="text-2xl font-bold">{timeTaken} ms</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-700 pb-4">
              <span className="text-zinc-500 dark:text-zinc-400">Average Time per Target</span>
              <span className="text-2xl font-bold">{timeTaken ? Math.round(timeTaken / targetCount) : 0} ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 dark:text-zinc-400">Missed Clicks</span>
              <span className="text-2xl font-bold text-red-500">{misses}</span>
            </div>
          </div>

          <button onClick={resetGame} className="px-8 py-4 bg-[#2b87d1] text-white rounded-lg hover:bg-[#2069a5] transition-colors font-bold text-lg shadow-md">
            Try Again
          </button>
        </div>
      )}

      {gameState === 'TIMEOUT' && (
        <div className="flex flex-col items-center p-6 text-center max-w-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mb-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-5xl font-bold mb-4">Time's Up!</h1>
          <p className="text-xl opacity-80 mb-8">
            You didn't finish hitting all {targetCount} targets within the 1-minute limit.
          </p>
          <div className="flex gap-4">
            <span className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">Hits: <strong>{hits}</strong></span>
            <span className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg">Misses: <strong className="text-red-500">{misses}</strong></span>
          </div>
          <button onClick={resetGame} className="mt-8 px-8 py-4 bg-[#2b87d1] text-white rounded-lg hover:bg-[#2069a5] transition-colors font-bold text-lg shadow-md">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};
