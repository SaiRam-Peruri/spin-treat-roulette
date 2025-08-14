import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, History, MapPin, RotateCcw } from 'lucide-react';
import { Wheel } from '@/features/wheel/Wheel';
import { ResultsPanel } from '@/features/restaurants/ResultsPanel';
import { LocationPrompt } from '@/features/location/LocationPrompt';
import { useWheelStore } from '@/store/wheelStore';
import { useLocationStore } from '@/store/locationStore';
import { useRestaurantStore } from '@/store/restaurantStore';
import { cn } from '@/lib/utils';

export const RoulettePage: React.FC = () => {
  const [showResults, setShowResults] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  
  const { winner, spinHistory } = useWheelStore();
  const { coordinates, city, hasPermission } = useLocationStore();
  const { restaurants, selectedCuisine } = useRestaurantStore();

  // Show location prompt if no location is set
  useEffect(() => {
    if (!coordinates && !city && !hasPermission) {
      setShowLocationPrompt(true);
    }
  }, [coordinates, city, hasPermission]);

  // Show results when we have a winner and restaurants
  useEffect(() => {
    if (winner && restaurants.length > 0) {
      setShowResults(true);
    }
  }, [winner, restaurants]);

  const handleLocationSet = () => {
    setShowLocationPrompt(false);
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  const handleHistoryClick = (cuisine: string) => {
    // Re-fetch restaurants for this cuisine
    const location = coordinates || { city: city || 'New York' };
    useRestaurantStore.getState().fetchRestaurants(cuisine, location);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold gradient-text">
              Restaurant Roulette
            </h1>
            <p className="text-muted-foreground">
              Can't decide where to eat? Let the wheel choose for you!
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Location Indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {coordinates ? 'Using GPS location' : city || 'Location not set'}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-white/20 hover:bg-white/10"
              onClick={() => setShowLocationPrompt(true)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Wheel Section */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl">
            <Wheel />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 border-l border-white/10 p-6 space-y-6">
          {/* Current Winner */}
          {winner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold">🎯 Winner</h3>
              <div className="glass p-4 rounded-xl space-y-2">
                <div className="text-2xl font-bold gradient-accent-text">
                  {winner.cuisine}
                </div>
                <p className="text-sm text-muted-foreground">
                  The wheel has spoken! Time to explore some delicious {winner.cuisine} options.
                </p>
                <Button
                  onClick={() => setShowResults(true)}
                  className="w-full mt-3 bg-gradient-to-r from-accent to-accent-glow text-accent-foreground"
                  size="sm"
                >
                  View Restaurants
                </Button>
              </div>
            </motion.div>
          )}

          <Separator className="opacity-20" />

          {/* Spin History */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <h3 className="text-lg font-semibold">Recent Spins</h3>
            </div>
            
            {spinHistory.length > 0 ? (
              <div className="space-y-2">
                {spinHistory.map((segment, index) => (
                  <motion.div
                    key={`${segment.id}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "w-full justify-between py-2 px-3 cursor-pointer",
                        "border-white/20 hover:bg-white/10 transition-colors",
                        "text-left"
                      )}
                      onClick={() => handleHistoryClick(segment.cuisine)}
                    >
                      <span>{segment.cuisine}</span>
                      <span className="text-xs opacity-60">
                        #{spinHistory.length - index}
                      </span>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No spins yet. Give the wheel a try!
              </p>
            )}
          </div>

          <Separator className="opacity-20" />

          {/* Quick Actions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-white/20 hover:bg-white/10"
                onClick={() => setShowLocationPrompt(true)}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Change Location
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start border-white/20 hover:bg-white/10"
                onClick={() => {
                  useWheelStore.getState().resetWheel();
                  useRestaurantStore.getState().clearRestaurants();
                  setShowResults(false);
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Everything
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showLocationPrompt && (
        <LocationPrompt onLocationSet={handleLocationSet} />
      )}

      <ResultsPanel 
        isOpen={showResults}
        onClose={handleCloseResults}
      />
    </div>
  );
};