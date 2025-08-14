import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCcw } from 'lucide-react';
import { useWheelStore } from '@/store/wheelStore';
import { useLocationStore } from '@/store/locationStore';
import { useRestaurantStore } from '@/store/restaurantStore';
import { WheelSegment } from './WheelSegment';
import { cn } from '@/lib/utils';

export const Wheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { 
    segments, 
    isSpinning, 
    winner,
    setSpinning, 
    setWinner, 
    addToHistory,
    setSpin,
    resetWheel
  } = useWheelStore();
  
  const { coordinates, city, requestLocation } = useLocationStore();
  const { fetchRestaurants, setSelectedCuisine } = useRestaurantStore();

  const segmentAngle = 360 / segments.length;

  const triggerConfetti = useCallback(() => {
    const count = 50;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#9370DB'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#FFD700', '#FF69B4', '#00CED1'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#FF6347', '#9370DB', '#FFD700'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#00CED1', '#FF69B4'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#FFD700', '#9370DB'],
    });
  }, []);

  const getWinningSegment = useCallback((finalRotation: number): typeof segments[0] => {
    // Normalize rotation to 0-360 range
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    
    // Calculate which segment the pointer (at top) is pointing to
    // Since we're rotating clockwise, we need to account for the direction
    const pointerAngle = (360 - normalizedRotation) % 360;
    const segmentIndex = Math.floor(pointerAngle / segmentAngle) % segments.length;
    
    return segments[segmentIndex];
  }, [segments, segmentAngle]);

  const spinWheel = useCallback(async () => {
    if (isSpinning || isAnimating) return;

    // Ensure we have location before spinning
    if (!coordinates && !city) {
      await requestLocation();
    }

    setIsAnimating(true);
    setSpinning(true);
    setWinner(null);

    // Generate random spin parameters
    const minSpins = 4;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + randomDegrees;
    
    // Duration between 4-8 seconds based on spin amount
    const duration = 4000 + (spins - minSpins) * 1000;
    
    const finalRotation = rotation + totalRotation;
    setSpin(duration, finalRotation);

    // Start the animation
    setRotation(finalRotation);

    // Wait for animation to complete
    setTimeout(() => {
      const winningSegment = getWinningSegment(finalRotation);
      setWinner(winningSegment);
      addToHistory(winningSegment);
      setSelectedCuisine(winningSegment.cuisine);
      
      // Trigger confetti and sound
      triggerConfetti();
      
      // Fetch restaurants for the winning cuisine
      const location = coordinates || { city: city || 'New York' };
      fetchRestaurants(winningSegment.cuisine, location);
      
      setSpinning(false);
      setIsAnimating(false);
    }, duration);
  }, [
    isSpinning, 
    isAnimating, 
    rotation, 
    coordinates, 
    city, 
    requestLocation,
    setSpinning, 
    setWinner, 
    addToHistory, 
    setSpin,
    setSelectedCuisine,
    fetchRestaurants,
    getWinningSegment,
    triggerConfetti
  ]);

  const resetAndSpin = useCallback(() => {
    resetWheel();
    setRotation(0);
    setIsAnimating(false);
    // Small delay to allow reset to complete
    setTimeout(() => spinWheel(), 100);
  }, [resetWheel, spinWheel]);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Wheel */}
        <motion.div
          className="relative w-80 h-80 md:w-96 md:h-96"
          animate={{ rotate: rotation }}
          transition={{
            duration: isAnimating ? 6 : 0,
            ease: [0.25, 0.46, 0.45, 0.94], // easeOutCubic
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 320"
            className="drop-shadow-2xl"
          >
            {/* Segments */}
            {segments.map((segment, index) => {
              const segmentAngle = 360 / segments.length;
              const rotation = index * segmentAngle;
              const startAngle = rotation;
              const endAngle = startAngle + segmentAngle;
              
              // Convert to radians
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              // Calculate path
              const largeArcFlag = segmentAngle > 180 ? 1 : 0;
              const centerX = 160;
              const centerY = 160;
              const radius = 150;
              
              const x1 = centerX + radius * Math.cos(startRad);
              const y1 = centerY + radius * Math.sin(startRad);
              const x2 = centerX + radius * Math.cos(endRad);
              const y2 = centerY + radius * Math.sin(endRad);
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              // Text position
              const textAngle = startAngle + segmentAngle / 2;
              const textRad = (textAngle * Math.PI) / 180;
              const textRadius = 100;
              const textX = centerX + textRadius * Math.cos(textRad);
              const textY = centerY + textRadius * Math.sin(textRad);

              return (
                <g key={segment.id}>
                  <motion.path
                    d={pathData}
                    fill={`hsl(var(--segment-${index + 1}))`}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    animate={winner?.id === segment.id ? {
                      filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)']
                    } : {}}
                    transition={{ duration: 0.5, repeat: winner?.id === segment.id ? 3 : 0 }}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold fill-white drop-shadow-lg pointer-events-none select-none"
                    transform={`rotate(${textAngle} ${textX} ${textY})`}
                  >
                    {segment.cuisine}
                  </text>
                </g>
              );
            })}
            
            {/* Center Circle */}
            <circle
              cx="160"
              cy="160"
              r="25"
              fill="white"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              className="drop-shadow-lg"
            />
          </svg>

          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary z-10" />
          </div>
        </motion.div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary drop-shadow-lg" />
          <div className="w-3 h-3 bg-primary rounded-full -mt-1 mx-auto shadow-lg" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full opacity-30"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Winner Banner */}
      <AnimatePresence>
        {winner && !isSpinning && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -50 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 30,
              delay: 0.2 
            }}
            className="text-center space-y-2"
          >
            <div className="text-6xl">🎉</div>
            <h2 className="text-4xl font-bold gradient-text animate-bounce-in">
              {winner.cuisine}!
            </h2>
            <p className="text-xl text-muted-foreground">
              Time to explore some delicious options!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={spinWheel}
          disabled={isSpinning || isAnimating}
          size="lg"
          className={cn(
            "px-8 py-4 text-lg font-semibold rounded-xl",
            "bg-gradient-to-r from-primary to-primary-glow",
            "hover:from-primary-glow hover:to-primary",
            "transform transition-all duration-200",
            "hover:scale-105 hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "disabled:transform-none"
          )}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
        </Button>

        {winner && !isSpinning && (
          <Button
            onClick={resetAndSpin}
            variant="outline"
            size="lg"
            className="px-6 py-4 text-lg rounded-xl border-2 hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Spin Again
          </Button>
        )}
      </div>

      {/* Loading indicator */}
      {isSpinning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-lg text-muted-foreground animate-pulse">
            The wheel is spinning...
          </div>
        </motion.div>
      )}
    </div>
  );
};