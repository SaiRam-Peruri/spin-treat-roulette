
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, History, ArrowLeft, RotateCcw, MapPin, Home } from 'lucide-react';
import { Wheel } from '@/features/wheel/Wheel';
import { RestaurantWheel } from '@/features/wheel/RestaurantWheel';
import { LocationPrompt } from '@/features/location/LocationPrompt';
import { useWheelStore } from '@/store/wheelStore';
import { useLocationStore } from '@/store/locationStore';
import { useRestaurantStore } from '@/store/restaurantStore';
import { cn } from '@/lib/utils';

export const RoulettePage: React.FC = () => {
  const navigate = useNavigate();
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  
  const { 
    winner, 
    spinHistory, 
    showRestaurantWheel,
    restaurantWinner,
    setShowRestaurantWheel,
    setRestaurantSegments,
    resetWheel,
    resetRestaurantWheel
  } = useWheelStore();

  const { coordinates, city, hasPermission } = useLocationStore();
  const { restaurants, selectedCuisine, isLoading, clearRestaurants } = useRestaurantStore();

  // URL parameter handling for state persistence
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const step = urlParams.get('step');
    const cuisine = urlParams.get('cuisine');
    
    // Only auto-fetch restaurants if URL indicates we should be on restaurant wheel
    // and we don't already have restaurants data, and we're not currently loading
    if (step === 'restaurants' && cuisine && !restaurants.length && !isLoading && !showRestaurantWheel) {
      const location = coordinates || { city: city || 'New York' };
      useRestaurantStore.getState().fetchRestaurants(cuisine, location);
      useRestaurantStore.getState().setSelectedCuisine(cuisine);
    }
  }, [coordinates, city, restaurants.length, isLoading, showRestaurantWheel]);

  // Update URL when state changes (but not when manually navigating back)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentStep = urlParams.get('step');
    
    if (showRestaurantWheel && selectedCuisine) {
      // Only update URL if we're not already on the restaurant step
      if (currentStep !== 'restaurants') {
        urlParams.set('step', 'restaurants');
        urlParams.set('cuisine', selectedCuisine);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
      }
    } else if (winner && currentStep === 'restaurants') {
      // We're going back to cuisine wheel, update URL
      urlParams.set('step', 'cuisine');
      urlParams.set('cuisine', winner.cuisine);
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [showRestaurantWheel, selectedCuisine, winner]);

  // Show location prompt if no location is set
  useEffect(() => {
    if (!coordinates && !city && !hasPermission) {
      setShowLocationPrompt(true);
    }
  }, [coordinates, city, hasPermission]);

  // Show restaurant wheel when we have restaurants from API
  useEffect(() => {
    if (winner && restaurants.length > 0 && !showRestaurantWheel) {
      setRestaurantSegments(restaurants.slice(0, 8)); // Limit to 8 restaurants for better visibility
      setShowRestaurantWheel(true);
    }
  }, [winner, restaurants, showRestaurantWheel, setRestaurantSegments, setShowRestaurantWheel]);

  const handleLocationSet = () => {
    setShowLocationPrompt(false);
  };

  const handleHistoryClick = (cuisine: string) => {
    // Fetch restaurants for this cuisine again
    const location = coordinates || { city: city || 'New York' };
    useRestaurantStore.getState().fetchRestaurants(cuisine, location);
  };

  const handleBackToCuisine = () => {
    // Reset restaurant wheel state
    setShowRestaurantWheel(false);
    resetRestaurantWheel();
    clearRestaurants();
    
    // Update URL to reflect we're back on cuisine wheel
    const urlParams = new URLSearchParams(window.location.search);
    if (winner) {
      urlParams.set('step', 'cuisine');
      urlParams.set('cuisine', winner.cuisine);
    } else {
      urlParams.delete('step');
      urlParams.delete('cuisine');
    }
    
    const newUrl = urlParams.toString() 
      ? `${window.location.pathname}?${urlParams.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newUrl);
  };

  const handleBackToHome = () => {
    // Optional: Clear all state when going back to home
    const shouldClearState = window.confirm('Going back to home will reset your progress. Are you sure?');
    
    if (shouldClearState) {
      resetWheel();
      setShowRestaurantWheel(false);
      resetRestaurantWheel();
      clearRestaurants();
      
      // Clear URL parameters
      window.history.replaceState({}, '', '/roulette');
    }
    
    // Navigate to home page using React Router
    navigate('/');
  };

  const handleResetAll = () => {
    resetWheel();
    setShowRestaurantWheel(false);
    resetRestaurantWheel();
    clearRestaurants();
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="space-y-1">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <button 
                onClick={() => navigate('/')}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <span>Restaurant Roulette</span>
              {showRestaurantWheel && (
                <>
                  <span>/</span>
                  <span className="text-primary">{selectedCuisine} Restaurants</span>
                </>
              )}
            </div>
            
            <h1 className="text-3xl font-bold gradient-text">
              Restaurant Roulette
            </h1>
            <p className="text-muted-foreground">
              {showRestaurantWheel 
                ? `Spin to pick a ${selectedCuisine} restaurant!`
                : "Can't decide where to eat? Let the wheel choose for you!"
              }
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Back to Home Button */}
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 hover:bg-white/10"
              onClick={handleBackToHome}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>

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
            {showRestaurantWheel ? (
              <div className="space-y-6">
                <div className="text-center">
                  <Button
                    onClick={handleBackToCuisine}
                    variant="outline"
                    size="sm"
                    className="mb-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Cuisine Wheel
                  </Button>
                </div>
                <RestaurantWheel />
              </div>
            ) : (
              <Wheel />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 border-l border-white/10 p-6 space-y-6">
          {/* Final Winner */}
          {restaurantWinner && showRestaurantWheel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold">🎯 Final Winner</h3>
              <div className="glass p-4 rounded-xl space-y-2">
                <div className="text-2xl font-bold gradient-accent-text">
                  {restaurantWinner.restaurant.name}
                </div>
                <p className="text-sm text-muted-foreground">
                  {restaurantWinner.restaurant.address}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span>⭐ {restaurantWinner.restaurant.rating}</span>
                  <span>•</span>
                  <span>{'$'.repeat(restaurantWinner.restaurant.priceLevel)}</span>
                  <span>•</span>
                  <span>{restaurantWinner.restaurant.distance}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Cuisine Winner */}
          {winner && !restaurantWinner && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold">🎯 Cuisine Winner</h3>
              <div className="glass p-4 rounded-xl space-y-2">
                <div className="text-2xl font-bold gradient-accent-text">
                  {winner.cuisine}
                </div>
                <p className="text-sm text-muted-foreground">
                  {isLoading 
                    ? "Loading restaurants from API..."
                    : showRestaurantWheel 
                    ? "Now spin for a specific restaurant!"
                    : restaurants.length > 0 
                    ? "Restaurant wheel ready!"
                    : "Finding restaurants..."
                  }
                </p>
              </div>
            </motion.div>
          )}

          <Separator className="opacity-20" />

          {/* API Status */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold">🔄 Loading</h3>
              <div className="glass p-4 rounded-xl space-y-2">
                <div className="text-sm text-muted-foreground">
                  Fetching {selectedCuisine} restaurants from API...
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full animate-pulse w-2/3"></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Restaurant Count */}
          {restaurants.length > 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold">📍 Found Restaurants</h3>
              <div className="glass p-4 rounded-xl space-y-2">
                <div className="text-lg font-bold text-primary">
                  {restaurants.length} restaurants
                </div>
                <p className="text-sm text-muted-foreground">
                  Found {restaurants.length} {selectedCuisine} restaurants via API
                </p>
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
                onClick={handleResetAll}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Everything
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start border-white/20 hover:bg-white/10"
                onClick={handleBackToHome}
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Location Prompt Modal */}
      {showLocationPrompt && (
        <LocationPrompt onLocationSet={handleLocationSet} />
      )}
    </div>
  );
};
