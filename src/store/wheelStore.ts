
import { create } from 'zustand';
import { Restaurant } from './restaurantStore';

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
}

export interface WheelActions {
  setSpinning: (spinning: boolean) => void;
  setWinner: (winner: WheelSegment | null) => void;
  addToHistory: (segment: WheelSegment) => void;
  setSpin: (duration: number, rotation: number) => void;
  resetWheel: () => void;
  
  // Restaurant wheel actions
  setRestaurantSegments: (segments: RestaurantWheelSegment[]) => void;
  setRestaurantSpinning: (spinning: boolean) => void;
  setRestaurantWinner: (winner: RestaurantWheelSegment | null) => void;
  setShowRestaurantWheel: (show: boolean) => void;
  setRestaurantSpin: (duration: number, rotation: number) => void;
  resetRestaurantWheel: () => void;
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

export const useWheelStore = create<WheelStore>((set, get) => ({
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
    const segments = restaurants.map((restaurant, index) => ({
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
    showRestaurantWheel: false,
    restaurantSegments: []
  })
}));
