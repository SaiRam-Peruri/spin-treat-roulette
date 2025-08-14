import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { useLocationStore } from '@/store/locationStore';
import { cn } from '@/lib/utils';

interface LocationPromptProps {
  onLocationSet: () => void;
}

export const LocationPrompt: React.FC<LocationPromptProps> = ({ onLocationSet }) => {
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    isLoading, 
    error, 
    requestLocation, 
    setManualLocation 
  } = useLocationStore();

  const handleUseCurrentLocation = async () => {
    try {
      await requestLocation();
      onLocationSet();
    } catch (error) {
      console.error('Failed to get location:', error);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setIsSubmitting(true);
    setManualLocation(city.trim(), zipCode.trim() || undefined);
    
    // Small delay for better UX
    setTimeout(() => {
      setIsSubmitting(false);
      onLocationSet();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <Card className="w-full max-w-md glass-strong border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text flex items-center justify-center gap-2">
            <MapPin className="w-6 h-6" />
            Where are you?
          </CardTitle>
          <p className="text-muted-foreground">
            We need your location to find nearby restaurants
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Use Current Location Button */}
          <Button
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
            className={cn(
              "w-full py-3 text-lg font-medium",
              "bg-gradient-to-r from-primary to-primary-glow",
              "hover:from-primary-glow hover:to-primary",
              "transition-all duration-200"
            )}
            size="lg"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : (
              <Navigation className="w-5 h-5 mr-2" />
            )}
            {isLoading ? 'Getting location...' : 'Use Current Location'}
          </Button>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <AlertCircle className="w-4 h-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </motion.div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or enter manually
              </span>
            </div>
          </div>

          {/* Manual Location Form */}
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City *
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="e.g., San Francisco"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="glass border-white/20 focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-sm font-medium">
                ZIP Code (Optional)
              </Label>
              <Input
                id="zipCode"
                type="text"
                placeholder="e.g., 94102"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="glass border-white/20 focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={!city.trim() || isSubmitting}
              variant="outline"
              className="w-full border-white/20 hover:bg-white/10"
              size="lg"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                />
              ) : (
                <MapPin className="w-4 h-4 mr-2" />
              )}
              {isSubmitting ? 'Setting location...' : 'Set Location'}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center">
            Your location is only used to find nearby restaurants and is not stored permanently.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};