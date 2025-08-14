import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { X, MapPin, RefreshCw, ExternalLink } from 'lucide-react';
import { useRestaurantStore } from '@/store/restaurantStore';
import { useWheelStore } from '@/store/wheelStore';
import { RestaurantCard } from './RestaurantCard';
import { cn } from '@/lib/utils';

interface ResultsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { 
    restaurants, 
    isLoading, 
    error, 
    selectedCuisine,
    fetchRestaurants,
    clearRestaurants
  } = useRestaurantStore();
  
  const { winner } = useWheelStore();

  const handleRetry = () => {
    if (selectedCuisine) {
      // Use mock data as fallback
      fetchRestaurants(selectedCuisine, { city: 'San Francisco' });
    }
  };

  const handleGoogleSearch = () => {
    if (selectedCuisine) {
      const query = encodeURIComponent(`${selectedCuisine} restaurants near me`);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
  };

  const handleYelpSearch = () => {
    if (selectedCuisine) {
      const query = encodeURIComponent(`${selectedCuisine} restaurants`);
      window.open(`https://www.yelp.com/search?find_desc=${query}`, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className={cn(
              "fixed right-0 top-0 h-full w-full max-w-2xl z-50",
              "glass-strong border-l border-white/20",
              "flex flex-col"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold gradient-text">
                  {selectedCuisine} Restaurants
                </h2>
                {winner && (
                  <p className="text-sm text-muted-foreground">
                    🎯 Your wheel landed on {winner.cuisine}!
                  </p>
                )}
              </div>
              
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="rounded-full h-10 w-10 p-0 hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* Loading State */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                      />
                      <p className="text-lg text-muted-foreground">
                        Finding delicious {selectedCuisine} restaurants...
                      </p>
                    </motion.div>
                  )}

                  {/* Error State */}
                  {error && !isLoading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="text-6xl mb-4">😔</div>
                      <h3 className="text-xl font-semibold">Oops! Something went wrong</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        {error}
                      </p>
                      
                      <div className="flex gap-3 justify-center flex-wrap">
                        <Button onClick={handleRetry} className="bg-primary hover:bg-primary/90">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Try Again
                        </Button>
                        <Button onClick={handleGoogleSearch} variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Search on Google
                        </Button>
                        <Button onClick={handleYelpSearch} variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Search on Yelp
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Empty State */}
                  {!isLoading && !error && restaurants.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-4"
                    >
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold">No restaurants found</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        We couldn't find any {selectedCuisine} restaurants in your area. 
                        Try searching online or expanding your search area.
                      </p>
                      
                      <div className="flex gap-3 justify-center flex-wrap">
                        <Button onClick={handleGoogleSearch} className="bg-primary hover:bg-primary/90">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Search on Google
                        </Button>
                        <Button onClick={handleYelpSearch} variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Search on Yelp
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Results */}
                  {!isLoading && !error && restaurants.length > 0 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <p className="text-muted-foreground">
                          Found {restaurants.length} amazing {selectedCuisine} restaurant{restaurants.length !== 1 ? 's' : ''} near you
                        </p>
                      </div>

                      <Separator className="opacity-20" />

                      <div className="grid gap-6">
                        {restaurants.map((restaurant, index) => (
                          <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            index={index}
                          />
                        ))}
                      </div>

                      {/* Additional Search Options */}
                      <div className="pt-6 border-t border-white/20">
                        <p className="text-sm text-muted-foreground text-center mb-4">
                          Want to explore more options?
                        </p>
                        <div className="flex gap-3 justify-center">
                          <Button onClick={handleGoogleSearch} variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            More on Google
                          </Button>
                          <Button onClick={handleYelpSearch} variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            More on Yelp
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};