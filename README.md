# 🎯 Restaurant Roulette

A premium, animation-rich restaurant picker that helps you discover nearby dining options through an interactive spinning wheel experience.

## ✨ Features

### 🎪 Interactive Spinning Wheel
- **Premium Animations**: 4-8 second spins with realistic easing and momentum
- **12 Cuisine Types**: Italian, Mexican, Chinese, Indian, Thai, Japanese, Mediterranean, Burgers, Pizza, BBQ, Vegan, Seafood
- **Confetti Celebrations**: Canvas-based particle effects when the wheel stops
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile

### 📍 Location-Based Restaurant Discovery
- **GPS Geolocation**: Automatic location detection with user permission
- **Manual Location Entry**: Fallback city/ZIP input for privacy or GPS issues
- **Real Restaurant Data**: Integration with Google Places API and Yelp Fusion API
- **Smart Fallbacks**: Mock data when APIs are unavailable

### 🎨 Premium UI/UX
- **Glassmorphism Design**: Modern glass-like cards and overlays
- **Gradient Color System**: Beautiful HSL-based color palette
- **Dark/Light Mode**: Automatic theme switching based on system preferences
- **Micro-Interactions**: Hover effects, button animations, and loading states

### 📱 Mobile-First Responsive
- **Touch-Friendly**: Large buttons and swipe gestures
- **Full-Screen Modals**: Mobile-optimized result panels
- **Adaptive Layout**: Sidebar becomes bottom sheet on mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd restaurant-roulette
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys (optional - app works with mock data):
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_YELP_API_KEY=your_yelp_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔧 Configuration

### API Keys Setup

#### Google Places API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Places API"
4. Create credentials (API Key)
5. Restrict key to your domain for security

#### Yelp Fusion API  
1. Visit [Yelp Developers](https://www.yelp.com/developers/v3/manage_app)
2. Create a new app
3. Copy your API key from the app dashboard

### Customizing Cuisines

Edit `src/store/wheelStore.ts` to modify the default segments:

```typescript
const DEFAULT_SEGMENTS: WheelSegment[] = [
  { id: '1', cuisine: 'Your Cuisine', color: 'segment-1', angle: 0 },
  // Add more segments...
];
```

### Styling & Colors

The design system is defined in:
- `src/index.css` - CSS variables and design tokens
- `tailwind.config.ts` - Tailwind color mappings

Modify the segment colors by updating the `--segment-*` CSS variables.

## 🏗️ Architecture

### Project Structure
```
src/
├── features/
│   ├── wheel/
│   │   ├── Wheel.tsx           # Main spinning wheel component
│   │   ├── WheelSegment.tsx    # Individual wheel segments
│   │   └── useWheel.ts         # Wheel logic hook
│   ├── restaurants/
│   │   ├── ResultsPanel.tsx    # Restaurant results modal
│   │   ├── RestaurantCard.tsx  # Individual restaurant cards
│   │   └── api/
│   │       ├── restaurantAPI.ts # API integration
│   │       └── mock.ts         # Fallback mock data
│   └── location/
│       ├── LocationPrompt.tsx  # Location permission UI
│       └── useGeolocation.ts   # GPS location hook
├── store/
│   ├── wheelStore.ts           # Wheel state management
│   ├── locationStore.ts        # Location state (with persistence)
│   └── restaurantStore.ts      # Restaurant data state
├── pages/
│   ├── Index.tsx               # Landing page
│   └── RoulettePage.tsx        # Main roulette experience
└── components/ui/              # Reusable UI components (shadcn)
```

### State Management
- **Zustand**: Lightweight state management
- **Persistence**: Location data saved to localStorage
- **TypeScript**: Full type safety throughout

### Animation System
- **Framer Motion**: Component animations and transitions
- **Canvas Confetti**: Particle effects for celebrations
- **CSS Animations**: GPU-optimized transforms and effects

## 🧪 How It Works

### Wheel Physics
1. **Spin Generation**: Random duration (4-8s) and rotation (4-8 full spins + random degrees)
2. **Easing Function**: `easeOutCubic` for realistic deceleration
3. **Segment Selection**: Deterministic based on final rotation angle
4. **Winner Calculation**: Pointer at top determines winning segment

### Restaurant Fetching Priority
1. **Google Places API**: Text search for cuisine + location
2. **Yelp Fusion API**: Business search with filters
3. **Mock Data**: Realistic fallback data if APIs unavailable

### Location Handling
1. **GPS First**: Request user's current coordinates
2. **Manual Fallback**: City/ZIP input if GPS denied
3. **Persistence**: Remember location choice for future visits
4. **Privacy**: Location only used for restaurant search

## 🎯 Performance

### Optimizations
- **GPU Acceleration**: CSS transforms for smooth animations
- **Lazy Loading**: Results panel only renders when needed
- **Image Optimization**: Responsive images with fallbacks
- **Code Splitting**: Dynamic imports for heavy dependencies

### Accessibility
- **Keyboard Navigation**: Space/Enter to spin, Tab navigation
- **ARIA Labels**: Screen reader support for all interactions
- **Focus Management**: Proper focus trapping in modals
- **Motion Preferences**: Respects `prefers-reduced-motion`

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Test Coverage
- Wheel angle → segment mapping logic
- API utility functions with mock fetch
- Hook behavior for wheel spinning lifecycle

## 📦 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables in Production
Make sure to set your API keys in your deployment platform:
- `VITE_GOOGLE_MAPS_API_KEY`
- `VITE_YELP_API_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

### Common Issues

**Wheel not spinning smoothly?**
- Check if your browser supports CSS transforms
- Disable browser extensions that might interfere

**No restaurants showing?**
- Verify your API keys are correct
- Check browser console for error messages
- Ensure location permissions are granted

**Location not working?**
- Try manual location entry
- Check if HTTPS is enabled (required for geolocation)
- Clear browser cache and cookies

### Getting Help
- Review the console logs for error details
- Ensure all dependencies are properly installed
- Check that API keys are properly configured

---

Made with ❤️ and lots of 🍕