
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BreathingPreset {
  id: string;
  name: string;
  inhale: number;
  hold?: number;
  exhale: number;
  description: string;
  type: 'breathing';
}

interface BreathingGuideProps {
    preset: BreathingPreset;
}

export const BreathingGuide = ({ preset }: BreathingGuideProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('pause');
  const [animationKey, setAnimationKey] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const phaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const cycleSteps = ['inhale'];
  if (preset.hold && preset.hold > 0) cycleSteps.push('hold');
  cycleSteps.push('exhale');
  // Box breathing has a pause after exhale
  if (preset.name === 'Box Breathing' && preset.hold && preset.hold > 0) cycleSteps.push('pause');

  const phaseDurations: Record<string, number> = {
      inhale: preset.inhale * 1000,
      hold: (preset.hold || 0) * 1000,
      exhale: preset.exhale * 1000,
      // For box breathing, the final pause is the same duration as the hold.
      pause: (preset.name === 'Box Breathing' ? (preset.hold || 0) : 0) * 1000,
  };

  const cleanupTimers = () => {
    if (phaseTimeoutRef.current) {
        clearTimeout(phaseTimeoutRef.current);
        phaseTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
    }
  };

  // Cleanup timers on component unmount
  useEffect(() => {
    return cleanupTimers;
  }, []);

  // Reset state when the preset changes
  useEffect(() => {
    cleanupTimers();
    setIsRunning(false);
    setPhase('pause');
    setCountdown(0);
    setAnimationKey(prev => prev + 1);
  }, [preset]);


  const startStopBreathing = () => {
     if (isRunning) {
       cleanupTimers();
       setIsRunning(false);
       setPhase('pause');
       setCountdown(0);
       setAnimationKey(prev => prev + 1);
     } else {
       setIsRunning(true);
       let currentPhaseIndex = 0;
       
       const runCycle = () => {
          cleanupTimers(); // Clean up previous timers before starting new ones
          
          const currentPhase = cycleSteps[currentPhaseIndex];
          setPhase(currentPhase as any);
          
          const duration = phaseDurations[currentPhase];
          const durationSeconds = duration / 1000;
          setCountdown(durationSeconds);

          if (duration <= 0) {
               currentPhaseIndex = (currentPhaseIndex + 1) % cycleSteps.length;
               runCycle();
               return;
          }

          countdownIntervalRef.current = setInterval(() => {
              setCountdown(prev => Math.max(0, prev - 1));
          }, 1000);

          phaseTimeoutRef.current = setTimeout(() => {
             currentPhaseIndex = (currentPhaseIndex + 1) % cycleSteps.length;
             runCycle();
          }, duration);
       };

       runCycle();
       setAnimationKey(prev => prev + 1);
     }
   };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div
        key={animationKey}
        className={cn(
          "relative w-48 h-48 rounded-full border-4 border-secondary flex items-center justify-center text-center",
          "bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20",
          "transition-transform",
           isRunning && phase === 'inhale' && 'scale-110',
           isRunning && phase === 'hold' && 'scale-110',
           isRunning && phase === 'exhale' && 'scale-90',
           isRunning && phase === 'pause' && 'scale-90'
        )}
        style={{
           transitionDuration: isRunning && phaseDurations[phase] > 0 ? `${phaseDurations[phase]/1000}s` : '0.5s',
           transitionTimingFunction: 'ease-in-out',
        }}
      >
        <div className="text-center">
            <p className="text-xl font-semibold text-purple-100 capitalize">{isRunning ? phase : "Ready?"}</p>
             {isRunning && countdown > 0 && (
                 <p className="text-5xl font-bold text-white tabular-nums mt-1">
                    {countdown}
                 </p>
             )}
             {!isRunning && (
                 <p className="text-sm text-purple-300/80 mt-1">
                    Press start to begin
                 </p>
             )}
        </div>
      </div>

       <Button
          onClick={startStopBreathing}
          variant="secondary"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
       >
         {isRunning ? 'Stop Breathing' : 'Start Breathing'}
       </Button>
    </div>
  );
};
