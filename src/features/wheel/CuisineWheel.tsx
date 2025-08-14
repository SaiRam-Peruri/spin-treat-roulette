import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, RotateCcw, RefreshCw, Info } from 'lucide-react';
import { useWheelStore } from '@/store/wheelStore';
import { getCuisineOptions, getRandomCuisineOptions, CuisineOption } from '@/features/cuisine/cuisineOptions';
import { cn } from '@/lib/utils';

export const CuisineWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [cuisineOptions, setCuisineOptions] = useState<CuisineOption[]>([]);
  
  const { 
    winner,
    cuisineWinner,
    isCuisineSpinning, 
    setCuisineSpinning, 
    setCuisineWinner, 
    setCuisineSpin,
    resetCuisineWheel
  } = useWheelStore();

  // Load cuisine options when cuisine winner changes
  useEffect(() => {
    if (winner?.cuisine) {
      const options = getRandomCuisineOptions(winner.cuisine, 8);
      setCuisineOptions(options);
      resetCuisineWheel(); // Reset any previous cuisine wheel state
    }
  }, [winner?.cuisine, resetCuisineWheel]);

  const segmentAngle = cuisineOptions.length > 0 ? 360 / cuisineOptions.length : 0;

  const triggerConfetti = useCallback(() => {
    const count = 75;
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

    // Multiple confetti bursts for extra celebration
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
  }, []);

  const getWinningOption = useCallback((finalRotation: number): CuisineOption => {
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    const pointerAngle = (360 - normalizedRotation) % 360;
    const segmentIndex = Math.floor(pointerAngle / segmentAngle) % cuisineOptions.length;
    return cuisineOptions[segmentIndex];
  }, [cuisineOptions, segmentAngle]);

  const spinWheel = useCallback(() => {
    if (isCuisineSpinning || isAnimating || cuisineOptions.length === 0) return;

    setIsAnimating(true);
    setCuisineSpinning(true);
    setCuisineWinner(null);

    // Generate random spin parameters with more variation
    const minSpins = 5;
    const maxSpins = 10;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + randomDegrees;
    
    const duration = 4500 + (spins - minSpins) * 1200; // Longer duration for more suspense
    const finalRotation = rotation + totalRotation;
    setCuisineSpin(duration, finalRotation);

    setRotation(finalRotation);

    setTimeout(() => {
      const winningOption = getWinningOption(finalRotation);
      setCuisineWinner(winningOption);
      triggerConfetti();
      setCuisineSpinning(false);
      setIsAnimating(false);
    }, duration);
  }, [
    isCuisineSpinning, 
    isAnimating, 
    rotation, 
    cuisineOptions,
    setCuisineSpinning, 
    setCuisineWinner, 
    setCuisineSpin,
    getWinningOption,
    triggerConfetti
  ]);

  const resetAndSpin = useCallback(() => {
    setRotation(0);
    setIsAnimating(false);
    setCuisineWinner(null);
    setTimeout(() => spinWheel(), 100);
  }, [spinWheel, setCuisineWinner]);

  const refreshOptions = useCallback(() => {
    if (winner?.cuisine) {
      const newOptions = getRandomCuisineOptions(winner.cuisine, 8);
      setCuisineOptions(newOptions);
      setCuisineWinner(null);
      setRotation(0);
    }
  }, [winner?.cuisine, setCuisineWinner]);

  if (cuisineOptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="text-lg text-muted-foreground">
          Loading {winner?.cuisine} options...
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Wheel */}
        <motion.div
          className="relative w-80 h-80 md:w-96 md:h-96"
          animate={{ rotate: rotation }}
          transition={{
            duration: isAnimating ? 6.5 : 0,
            ease: [0.23, 1, 0.32, 1], // More dramatic easing
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 320"
            className="drop-shadow-2xl"
          >
            {cuisineOptions.map((option, index) => {
              const segmentAngle = 360 / cuisineOptions.length;
              const rotation = index * segmentAngle;
              const startAngle = rotation;
              const endAngle = startAngle + segmentAngle;
              
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
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

              const textAngle = startAngle + segmentAngle / 2;
              const textRad = (textAngle * Math.PI) / 180;
              const textRadius = 85;
              const textX = centerX + textRadius * Math.cos(textRad);
              const textY = centerY + textRadius * Math.sin(textRad);

              // Dynamic color based on index
              const colorIndex = (index % 12) + 1;

              return (
                <g key={option.id}>
                  <motion.path
                    d={pathData}
                    fill={`hsl(var(--segment-${colorIndex}))`}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    animate={cuisineWinner?.id === option.id ? {
                      filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
                    } : {}}
                    transition={{ duration: 0.6, repeat: cuisineWinner?.id === option.id ? 4 : 0 }}
                  />
                  
                  {/* Emoji */}
                  <text
                    x={textX}
                    y={textY - 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-lg pointer-events-none select-none"
                    transform={`rotate(${textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle} ${textX} ${textY - 8})`}
                  >
                    {option.emoji}
                  </text>
                  
                  {/* Text */}
                  <text
                    x={textX}
                    y={textY + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-bold fill-white drop-shadow-lg pointer-events-none select-none"
                    transform={`rotate(${textAngle > 90 && textAngle < 270 ? textAngle + 180 : textAngle} ${textX} ${textY + 8})`}
                  >
                    {option.name.length > 15 
                      ? option.name.substring(0, 12) + '...'
                      : option.name
                    }
                  </text>
                </g>
              );
            })}
            
            {/* Center circle */}
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

          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary z-10" />
          </div>
        </motion.div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary drop-shadow-lg" />
          <div className="w-3 h-3 bg-primary rounded-full -mt-1 mx-auto shadow-lg" />
        </div>

        {/* Floating particles for extra visual flair */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-accent rounded-full opacity-40"
              style={{
                left: `${15 + Math.random() * 70}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Winner Banner */}
      <AnimatePresence>
        {cuisineWinner && !isCuisineSpinning && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -50 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              delay: 0.3 
            }}
            className="text-center space-y-4 max-w-md"
          >
            <div className="text-6xl animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold gradient-text flex items-center justify-center gap-2">
              <span>{cuisineWinner.emoji}</span>
              {cuisineWinner.name}!
            </h2>
            
            <motion.div 
              className="glass p-4 rounded-xl space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-muted-foreground">
                {cuisineWinner.description}
              </p>
              
              <div className="flex gap-2 justify-center flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  ⭐ {cuisineWinner.popularity.toFixed(1)} popularity
                </Badge>
                
                {cuisineWinner.spiceLevel && (
                  <Badge variant="secondary" className="text-xs">
                    🌶️ {cuisineWinner.spiceLevel}/5 spice
                  </Badge>
                )}
                
                {cuisineWinner.dietary && cuisineWinner.dietary.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    🥬 {cuisineWinner.dietary.join(', ')}
                  </Badge>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Button
          onClick={spinWheel}
          disabled={isCuisineSpinning || isAnimating}
          size="lg"
          className={cn(
            "px-8 py-4 text-lg font-semibold rounded-xl",
            "bg-gradient-to-r from-accent to-accent-glow",
            "hover:from-accent-glow hover:to-accent",
            "transform transition-all duration-200",
            "hover:scale-105 hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {isCuisineSpinning ? 'Spinning...' : `Spin for ${winner?.cuisine}!`}
        </Button>

        {cuisineWinner && !isCuisineSpinning && (
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

        <Button
          onClick={refreshOptions}
          variant="outline"
          size="lg"
          disabled={isCuisineSpinning || isAnimating}
          className="px-6 py-4 text-lg rounded-xl border-2 hover:scale-105 transition-transform"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          New Options
        </Button>
      </div>

      {/* Loading indicator */}
      {isCuisineSpinning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-2"
        >
          <div className="text-lg text-muted-foreground animate-pulse">
            The wheel is spinning...
          </div>
          <div className="text-sm text-muted-foreground/60">
            Finding the perfect {winner?.cuisine} choice for you!
          </div>
        </motion.div>
      )}

      {/* Options preview */}
      {!isCuisineSpinning && !cuisineWinner && cuisineOptions.length > 0 && (
        <motion.div 
          className="text-center space-y-2 max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Info className="w-4 h-4" />
            {cuisineOptions.length} delicious {winner?.cuisine} options await!
          </p>
          <div className="flex gap-1 justify-center flex-wrap">
            {cuisineOptions.slice(0, 4).map((option, index) => (
              <span key={option.id} className="text-xs opacity-60">
                {option.emoji}
              </span>
            ))}
            <span className="text-xs opacity-40">...</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
