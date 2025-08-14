import { useCallback, useState } from 'react';
import { useWheelStore, WheelSegment } from '@/store/wheelStore';

export interface UseWheelResult {
  isSpinning: boolean;
  winner: WheelSegment | null;
  history: WheelSegment[];
  spin: () => Promise<WheelSegment>;
  reset: () => void;
  canSpin: boolean;
}

export function useWheel(): UseWheelResult {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const {
    segments,
    isSpinning,
    winner,
    spinHistory,
    setSpinning,
    setWinner,
    addToHistory,
    setSpin,
    resetWheel
  } = useWheelStore();

  const spin = useCallback(async (): Promise<WheelSegment> => {
    if (isSpinning || isAnimating) {
      throw new Error('Wheel is already spinning');
    }

    setIsAnimating(true);
    setSpinning(true);
    setWinner(null);

    return new Promise((resolve) => {
      // Generate random spin parameters
      const minSpins = 4;
      const maxSpins = 8;
      const spins = minSpins + Math.random() * (maxSpins - minSpins);
      const randomDegrees = Math.random() * 360;
      const totalRotation = spins * 360 + randomDegrees;
      
      // Duration between 4-8 seconds based on spin amount
      const duration = 4000 + (spins - minSpins) * 1000;
      
      setSpin(duration, totalRotation);

      // Calculate winning segment
      const segmentAngle = 360 / segments.length;
      const normalizedRotation = ((totalRotation % 360) + 360) % 360;
      const pointerAngle = (360 - normalizedRotation) % 360;
      const segmentIndex = Math.floor(pointerAngle / segmentAngle) % segments.length;
      const winningSegment = segments[segmentIndex];

      // Complete the spin after duration
      setTimeout(() => {
        setWinner(winningSegment);
        addToHistory(winningSegment);
        setSpinning(false);
        setIsAnimating(false);
        resolve(winningSegment);
      }, duration);
    });
  }, [
    isSpinning,
    isAnimating,
    segments,
    setSpinning,
    setWinner,
    addToHistory,
    setSpin
  ]);

  const reset = useCallback(() => {
    resetWheel();
    setIsAnimating(false);
  }, [resetWheel]);

  return {
    isSpinning: isSpinning || isAnimating,
    winner,
    history: spinHistory,
    spin,
    reset,
    canSpin: !isSpinning && !isAnimating
  };
}