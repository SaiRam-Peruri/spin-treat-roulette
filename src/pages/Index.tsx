import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Utensils, MapPin, Star, ArrowRight, Zap } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Premium Spinning Wheel',
      description: 'Beautiful animations with realistic physics and confetti celebrations'
    },
    {
      icon: MapPin,
      title: 'Location-Based Results',
      description: 'Find restaurants near you using GPS or manual location entry'
    },
    {
      icon: Utensils,
      title: '12 Cuisine Types',
      description: 'From Italian to Thai, discover restaurants for every craving'
    },
    {
      icon: Star,
      title: 'Real Restaurant Data',
      description: 'Integrated with Google Places and Yelp APIs for authentic results'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                <Zap className="w-4 h-4 mr-2" />
                Premium Restaurant Discovery
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="gradient-text">Restaurant</span>
                <br />
                <span className="gradient-accent-text">Roulette</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Can't decide where to eat? Let our beautiful spinning wheel choose for you! 
                Discover amazing restaurants near you with just a spin.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                size="lg"
                className="px-8 py-6 text-xl font-semibold rounded-2xl bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/roulette'}
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Start Spinning
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-accent/30 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Why You'll Love It
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the most delightful way to discover new restaurants with premium features and beautiful design.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass border-white/20 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 border border-white/20"
          >
            <div className="text-6xl mb-6">🎯🍽️</div>
            <h2 className="text-4xl font-bold gradient-accent-text mb-6">
              Ready to Discover Your Next Meal?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of food lovers who've found their perfect restaurant with our premium roulette experience.
            </p>
            <Button
              size="lg"
              className="px-10 py-6 text-xl font-semibold rounded-2xl bg-gradient-to-r from-accent to-accent-glow text-accent-foreground hover:from-accent-glow hover:to-accent transform hover:scale-105 transition-all duration-200"
              onClick={() => window.location.href = '/roulette'}
            >
              <Utensils className="w-6 h-6 mr-3" />
              Let's Eat!
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
