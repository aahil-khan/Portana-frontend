# Portana Frontend

A futuristic, AI-powered portfolio interface with glassmorphism design and real-time chat capabilities. Built with Next.js, React, Framer Motion, and Tailwind CSS.

## 🚀 Features

- **AI-Powered Chat**: Conversational AI assistant powered by GPT-4o
- **Dynamic Command System**: Type `/projects`, `/stack`, `/experience`, etc. for instant data
- **Glassmorphism UI**: Modern frosted glass aesthetic with neon cyan and violet accents
- **Real-time Responses**: Streaming chat responses with citations and knowledge base references
- **Cyberpunk Aesthetic**: Terminal-inspired interface with particle effects and holographic elements
- **Responsive Design**: Optimized for desktop with fluid animations
- **Typography**: Space Mono for body text, Orbitron for headings and accents
- **Performance Optimized**: 60 FPS animations, optimized particle system, GPU-accelerated rendering

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- Backend API running at `https://portana-api.aahil-khan.tech` (or localhost for development)

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/aahil-khan/portana.git
cd portana-frontend

# Install dependencies
npm install
# or
pnpm install
```

## 🏃 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production Build
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
portana-frontend/
├── app/
│   ├── layout.tsx          # Root layout with font imports
│   ├── page.tsx            # Main page (chat interface)
│   ├── globals.css         # Global styles and theme variables
│   └── onboarding/         # Onboarding flow pages
├── components/
│   ├── chat-interface.tsx   # Main chat component with routing logic
│   ├── boot-screen.tsx      # Animated boot/loading screen
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── top-bar.tsx          # Header with branding
│   ├── background-effects.tsx # Particle system and gradients
│   ├── command-data-renderer.tsx # Dynamic command response renderer
│   ├── command-suggestion.tsx # Interactive command buttons
│   ├── citations.tsx        # Knowledge base citations display
│   ├── chat-message.tsx     # Individual message component
│   └── portana/             # Onboarding components
├── lib/
│   └── response-types.ts    # TypeScript types and utilities
├── public/                  # Static assets
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎨 Design System

### Colors
- **Primary**: Neon Cyan (`#00d9ff`)
- **Secondary**: Violet/Amethyst (`#a78bfa`)
- **Background**: Deep Blue (`#0b0d10`)
- **Glass**: `rgba(255, 255, 255, 0.05)` with backdrop blur

### Typography
- **Display Font**: Orbitron (400, 700, 900 weights)
  - Used for: Boot screen, headings, accents, key titles
  - Style: Sharp, geometric, sci-fi aesthetic
- **Body Font**: Space Mono (400, 700 weights)
  - Used for: All body text, code, UI elements
  - Style: Retro-futuristic, terminal aesthetic, monospace

### Animations
- **Frame Rate**: 60 FPS target
- **Duration**: 0.2-0.3s for interactions, 20s for ambient animations
- **Easing**: ease-out for snappy interactions, linear for continuous effects

## 🔌 API Integration

### Backend Endpoints

**Chat Endpoint**
```
POST /api/chat/message
Body: { message: string }
Response: { type: "text" | "hybrid" | "command", content: string, ... }
```

**Command Endpoints**
```
GET /api/commands/projects    # Portfolio projects
GET /api/commands/stack       # Technology stack
GET /api/commands/experience  # Work experience
GET /api/commands/education   # Education history
GET /api/commands/timeline    # Combined timeline
GET /api/commands/summary     # Personal summary
GET /api/commands/achievements # Awards/recognition
GET /api/commands/all         # Complete portfolio data
```

## 🧠 Command System

Users can interact with Portana in multiple ways:

### Direct Commands (Instant Response)
- `/projects` - View portfolio projects
- `/stack` - See technology stack
- `/experience` - Work experience details
- `/education` - Education history
- `/timeline` - Combined timeline view
- `/summary` - Personal summary
- `/achievements` - Awards and recognition
- `/all` - Complete portfolio data

### Natural Language Queries
- "What projects have you worked on?"
- "Show me your tech stack"
- "Tell me about your experience"
- Regular conversation: "Hi!", "Hello", etc.

### Response Types

**Text Response**
- Natural language answer with citations
- Knowledge base references included

**Hybrid Response**
- AI answer + suggested command button
- Enables progressive feature discovery

**Command Response**
- Direct data from command endpoints
- Fast response times (<10ms)

## ⚡ Performance Optimizations

- **Particle System**: Reduced from 50 to 40 particles, optimized distance calculations
- **Animation**: Removed expensive word-by-word animations
- **Build**: SWC minification, response compression, tree-shaking for dependencies
- **CSS**: GPU acceleration hints (`will-change`, `backfaceVisibility`)
- **Mouse Tracking**: Uses `useRef` instead of state updates (no re-renders)
- **Canvas**: Optimized clearing and line connection limits (50 max)

**Result**: Smooth 60 FPS animations, eliminated frame jitter

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:
```
NEXT_PUBLIC_API_URL=https://portana-api.aahil-khan.tech
```

### Next.js Config (`next.config.mjs`)

Key optimizations:
- `productionBrowserSourceMaps: false` - Reduced bundle size
- `optimizePackageImports: ["framer-motion", "lucide-react"]` - Tree-shaking
- `compress: true` - Response compression
- `onDemandEntries` - Better dev/prod caching

## 📦 Dependencies

### Core
- **Next.js 16**: React framework with Turbopack
- **React 19**: UI library
- **TypeScript**: Type safety

### UI & Animation
- **Framer Motion**: Advanced animations
- **Tailwind CSS v4**: Utility-first styling
- **Lucide React**: Icon library

### Fonts
- **Google Fonts**: Space Mono, Orbitron

## 🚀 Deployment

The frontend is optimized for deployment to Vercel:

```bash
# Build for production
npm run build

# Start production server
npm run start
```

Environment variables are configured via `.env.local` for development.

## 📊 Build Performance

- **Build Time**: ~5-7 seconds (Turbopack)
- **Bundle Size**: <200KB (gzipped)
- **Time to Interactive**: <2 seconds
- **Target FPS**: 60 FPS sustained

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Cache Issues
```bash
rm -rf .next
npm run build
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🔒 Security

- API calls use HTTPS (production)
- No sensitive data stored in localStorage
- CSP headers configured in Next.js
- Input validation on all chat messages

## 📈 Future Enhancements

- [ ] Session persistence
- [ ] Message history export
- [ ] Voice input/output
- [ ] Mobile app wrapper
- [ ] Dark/light mode toggle
- [ ] Analytics integration
- [ ] Multi-language support

## 📝 License

This project is part of Aahil Khan's portfolio. See LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and create detailed commit messages.

## 📧 Contact

For questions or feedback about Portana:
- **GitHub**: [@aahil-khan](https://github.com/aahil-khan)
- **LinkedIn**: [Aahil Khan](https://www.linkedin.com/in/aahil-khan-015671287/)

---

**Made with ❤️ by Aahil Khan**

*Last Updated: November 12, 2025*
