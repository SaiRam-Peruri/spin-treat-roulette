
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCcw, MapPin, Phone, ExternalLink } from 'lucide-react';
import { useWheelStore } from '@/store/wheelStore';
import { cn } from '@/lib/utils';

export const RestaurantWheel: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { 
    restaurantSegments, 
    isRestaurantSpinning, 
    restaurantWinner,
    setRestaurantSpinning, 
    setRestaurantWinner, 
    setRestaurantSpin,
    resetRestaurantWheel
  } = useWheelStore();

  const segmentAngle = restaurantSegments.length > 0 ? 360 / restaurantSegments.length : 0;

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
  }, []);

  const getWinningSegment = useCallback((finalRotation: number) => {
    const normalizedRotation = ((finalRotation % 360) + 360) % 360;
    const pointerAngle = (360 - normalizedRotation) % 360;
    const segmentIndex = Math.floor(pointerAngle / segmentAngle) % restaurantSegments.length;
    return restaurantSegments[segmentIndex];
  }, [restaurantSegments, segmentAngle]);

  const spinWheel = useCallback(() => {
    if (isRestaurantSpinning || isAnimating || restaurantSegments.length === 0) return;

    setIsAnimating(true);
    setRestaurantSpinning(true);
    setRestaurantWinner(null);

    // Generate random spin parameters
    const minSpins = 4;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const randomDegrees = Math.random() * 360;
    const totalRotation = spins * 360 + randomDegrees;
    
    const duration = 4000 + (spins - minSpins) * 1000;
    const finalRotation = rotation + totalRotation;
    setRestaurantSpin(duration, finalRotation);

    setRotation(finalRotation);

    setTimeout(() => {
      const winningSegment = getWinningSegment(finalRotation);
      setRestaurantWinner(winningSegment);
      triggerConfetti();
      setRestaurantSpinning(false);
      setIsAnimating(false);
    }, duration);
  }, [
    isRestaurantSpinning, 
    isAnimating, 
    rotation, 
    restaurantSegments,
    setRestaurantSpinning, 
    setRestaurantWinner, 
    setRestaurantSpin,
    getWinningSegment,
    triggerConfetti
  ]);

  const resetAndSpin = useCallback(() => {
    setRotation(0);
    setIsAnimating(false);
    setTimeout(() => spinWheel(), 100);
  }, [spinWheel]);

  if (restaurantSegments.length === 0) {
    return null;
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
            duration: isAnimating ? 6 : 0,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 320 320"
            className="drop-shadow-2xl"
          >
            {restaurantSegments.map((segment, index) => {
              const segmentAngle = 360 / restaurantSegments.length;
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
              const textRadius = 90;
              const textX = centerX + textRadius * Math.cos(textRad);
              const textY = centerY + textRadius * Math.sin(textRad);

              return (
                <g key={segment.id}>
                  <motion.path
                    d={pathData}
                    className={`fill-[hsl(var(--${segment.color}))]`}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="2"
                    animate={restaurantWinner?.id === segment.id ? {
                      filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)']
                    } : {}}
                    transition={{ duration: 0.5, repeat: restaurantWinner?.id === segment.id ? 3 : 0 }}
                  />
                  <text
                    x={textX}
                    y={textY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-bold fill-white drop-shadow-lg pointer-events-none select-none"
                    transform={`rotate(${textAngle} ${textX} ${textY})`}
                  >
                    {segment.restaurant.name.length > 12 
                      ? segment.restaurant.name.substring(0, 12) + '...'
                      : segment.restaurant.name
                    }
                  </text>
                </g>
              );
            })}
            
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
      </div>

      {/* Winner Banner */}
      <AnimatePresence>
        {restaurantWinner && !isRestaurantSpinning && (
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
            className="text-center space-y-4 max-w-md"
          >
            <div className="text-6xl">🎉</div>
            <h2 className="text-3xl font-bold gradient-text">
              {restaurantWinner.restaurant.name}!
            </h2>
            <div className="glass p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <span>⭐ {restaurantWinner.restaurant.rating}</span>
                <span>•</span>
                <span>{'$'.repeat(restaurantWinner.restaurant.priceLevel)}</span>
                <span>•</span>
                <span>{restaurantWinner.restaurant.distance}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {restaurantWinner.restaurant.address}
              </p>
              <div className="flex gap-2 justify-center">
                {restaurantWinner.restaurant.phone && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={`tel:${restaurantWinner.restaurant.phone}`}>
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </a>
                  </Button>
                )}
                <Button size="sm" variant="outline" asChild>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantWinner.restaurant.name + ' ' + restaurantWinner.restaurant.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Directions
                  </a>
                </Button>
                {restaurantWinner.restaurant.website && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={restaurantWinner.restaurant.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Website
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={spinWheel}
          disabled={isRestaurantSpinning || isAnimating}
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
          {isRestaurantSpinning ? 'Spinning...' : 'Spin for Restaurant!'}
        </Button>

        {restaurantWinner && !isRestaurantSpinning && (
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
    </div>
  );
};
