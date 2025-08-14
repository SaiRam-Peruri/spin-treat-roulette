import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Clock,
  DollarSign
} from 'lucide-react';
import { Restaurant } from '@/store/restaurantStore';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  restaurant, 
  index 
}) => {
  const getPriceDisplay = (level: number) => {
    return '$'.repeat(Math.min(level, 4)) || '$$';
  };

  const handleOpenMaps = () => {
    const query = encodeURIComponent(`${restaurant.name} ${restaurant.address}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    if (restaurant.phone) {
      window.open(`tel:${restaurant.phone}`, '_self');
    }
  };

  const handleWebsite = () => {
    if (restaurant.website) {
      window.open(restaurant.website, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glass border-none overflow-hidden">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
            {restaurant.imageUrl ? (
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="text-6xl opacity-20">🍽️</div>
              </div>
            )}
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <Badge 
                className={cn(
                  "text-xs font-medium",
                  restaurant.isOpen 
                    ? "bg-green-500/90 text-white" 
                    : "bg-red-500/90 text-white"
                )}
              >
                <Clock className="w-3 h-3 mr-1" />
                {restaurant.isOpen ? 'Open' : 'Closed'}
              </Badge>
            </div>

            {/* Price Level */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-black/50 text-white">
                <DollarSign className="w-3 h-3 mr-1" />
                {getPriceDisplay(restaurant.priceLevel)}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            {/* Header */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {restaurant.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{restaurant.rating.toFixed(1)}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {restaurant.distance}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {restaurant.description}
            </p>

            {/* Address */}
            <div className="text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 inline mr-1" />
              {restaurant.address}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleOpenMaps}
                className="flex-1 bg-primary hover:bg-primary/90"
                size="sm"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Directions
              </Button>

              {restaurant.phone && (
                <Button
                  onClick={handleCall}
                  variant="outline"
                  size="sm"
                  className="hover:bg-accent"
                >
                  <Phone className="w-4 h-4" />
                </Button>
              )}

              {restaurant.website && (
                <Button
                  onClick={handleWebsite}
                  variant="outline"
                  size="sm"
                  className="hover:bg-accent"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};