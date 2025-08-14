
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Restaurant } from './restaurantStore';
import { CuisineOption } from '../features/cuisine/cuisineOptions';

export interface WheelSegment {
  id: string;
  cuisine: string;
  color: string;
  angle: number;
}

export interface RestaurantWheelSegment {
  id: string;
  restaurant: Restaurant;
  color: string;
  angle: number;
}

export interface WheelState {
  segments: WheelSegment[];
  isSpinning: boolean;
  winner: WheelSegment | null;
  spinHistory: WheelSegment[];
  spinDuration: number;
  finalRotation: number;
  
  // Restaurant wheel state
  restaurantSegments: RestaurantWheelSegment[];
  isRestaurantSpinning: boolean;
  restaurantWinner: RestaurantWheelSegment | null;
  showRestaurantWheel: boolean;
  restaurantSpinDuration: number;
  restaurantFinalRotation: number;

  // Cuisine wheel state (improved second wheel)
  cuisineWinner: CuisineOption | null;
  isCuisineSpinning: boolean;
  showCuisineWheel: boolean;
  cuisineSpinDuration: number;
  cuisineFinalRotation: number;
}

export interface WheelActions {
  setSpinning: (spinning: boolean) => void;
  setWinner: (winner: WheelSegment | null) => void;
  addToHistory: (segment: WheelSegment) => void;
  setSpin: (duration: number, rotation: number) => void;
  resetWheel: () => void;
  
  // Restaurant wheel actions
  setRestaurantSegments: (restaurants: Restaurant[]) => void;
  setRestaurantSpinning: (spinning: boolean) => void;
  setRestaurantWinner: (winner: RestaurantWheelSegment | null) => void;
  setShowRestaurantWheel: (show: boolean) => void;
  setRestaurantSpin: (duration: number, rotation: number) => void;
  resetRestaurantWheel: () => void;

  // Cuisine wheel actions (improved second wheel)
  setCuisineWinner: (winner: CuisineOption | null) => void;
  setCuisineSpinning: (spinning: boolean) => void;
  setShowCuisineWheel: (show: boolean) => void;
  setCuisineSpin: (duration: number, rotation: number) => void;
  resetCuisineWheel: () => void;
}

export type WheelStore = WheelState & WheelActions;

const DEFAULT_SEGMENTS: WheelSegment[] = [
  { id: '1', cuisine: 'Italian', color: 'segment-1', angle: 0 },
  { id: '2', cuisine: 'Mexican', color: 'segment-2', angle: 30 },
  { id: '3', cuisine: 'Chinese', color: 'segment-3', angle: 60 },
  { id: '4', cuisine: 'Indian', color: 'segment-4', angle: 90 },
  { id: '5', cuisine: 'Thai', color: 'segment-5', angle: 120 },
  { id: '6', cuisine: 'Japanese', color: 'segment-6', angle: 150 },
  { id: '7', cuisine: 'Mediterranean', color: 'segment-7', angle: 180 },
  { id: '8', cuisine: 'Burgers', color: 'segment-8', angle: 210 },
  { id: '9', cuisine: 'Pizza', color: 'segment-9', angle: 240 },
  { id: '10', cuisine: 'BBQ', color: 'segment-10', angle: 270 },
  { id: '11', cuisine: 'Vegan', color: 'segment-11', angle: 300 },
  { id: '12', cuisine: 'Seafood', color: 'segment-12', angle: 330 },
];

const RESTAURANT_COLORS = [
  'segment-1', 'segment-2', 'segment-3', 'segment-4', 'segment-5', 'segment-6',
  'segment-7', 'segment-8', 'segment-9', 'segment-10', 'segment-11', 'segment-12'
];

export const useWheelStore = create<WheelStore>()(
  persist(
    (set, get) => ({
      segments: DEFAULT_SEGMENTS,
      isSpinning: false,
      winner: null,
      spinHistory: [],
      spinDuration: 0,
      finalRotation: 0,
      
      // Restaurant wheel initial state
      restaurantSegments: [],
      isRestaurantSpinning: false,
      restaurantWinner: null,
      showRestaurantWheel: false,
      restaurantSpinDuration: 0,
      restaurantFinalRotation: 0,

      // Cuisine wheel initial state
      cuisineWinner: null,
      isCuisineSpinning: false,
      showCuisineWheel: false,
      cuisineSpinDuration: 0,
      cuisineFinalRotation: 0,

      setSpinning: (spinning) => set({ isSpinning: spinning }),

      setWinner: (winner) => set({ winner }),

      addToHistory: (segment) => set((state) => ({
        spinHistory: [segment, ...state.spinHistory].slice(0, 5) // Keep last 5
      })),

      setSpin: (duration, rotation) => set({ 
        spinDuration: duration, 
        finalRotation: rotation 
      }),

      resetWheel: () => set({
        isSpinning: false,
        winner: null,
        spinDuration: 0,
        finalRotation: 0,
        showRestaurantWheel: false,
        restaurantWinner: null,
        restaurantSegments: []
      }),

      // Restaurant wheel actions
      setRestaurantSegments: (restaurants) => {
        const segments: RestaurantWheelSegment[] = restaurants.map((restaurant, index) => ({
          id: restaurant.id,
          restaurant,
          color: RESTAURANT_COLORS[index % RESTAURANT_COLORS.length],
          angle: (360 / restaurants.length) * index
        }));
        set({ restaurantSegments: segments });
      },

      setRestaurantSpinning: (spinning) => set({ isRestaurantSpinning: spinning }),

      setRestaurantWinner: (winner) => set({ restaurantWinner: winner }),

      setShowRestaurantWheel: (show) => set({ showRestaurantWheel: show }),

      setRestaurantSpin: (duration, rotation) => set({ 
        restaurantSpinDuration: duration, 
        restaurantFinalRotation: rotation 
      }),

      resetRestaurantWheel: () => set({
        isRestaurantSpinning: false,
        restaurantWinner: null,
        restaurantSpinDuration: 0,
        restaurantFinalRotation: 0,
        restaurantSegments: [],
        showRestaurantWheel: false
      }),

      // Cuisine wheel actions
      setCuisineWinner: (winner) => set({ cuisineWinner: winner }),

      setCuisineSpinning: (spinning) => set({ isCuisineSpinning: spinning }),

      setShowCuisineWheel: (show) => set({ showCuisineWheel: show }),

      setCuisineSpin: (duration, rotation) => set({ 
        cuisineSpinDuration: duration, 
        cuisineFinalRotation: rotation 
      }),

      resetCuisineWheel: () => set({
        isCuisineSpinning: false,
        cuisineWinner: null,
        cuisineSpinDuration: 0,
        cuisineFinalRotation: 0
      })
    }),
    {
      name: 'wheel-storage', // unique name for localStorage
      partialize: (state) => ({
        winner: state.winner,
        spinHistory: state.spinHistory,
        showRestaurantWheel: state.showRestaurantWheel,
        restaurantSegments: state.restaurantSegments,
        restaurantWinner: state.restaurantWinner,
        finalRotation: state.finalRotation,
        restaurantFinalRotation: state.restaurantFinalRotation,
      }),
    }
  )
);
