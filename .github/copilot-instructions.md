# Portana Frontend - AI Coding Instructions

## Project Overview
Portana is a futuristic AI-powered portfolio interface with glassmorphism design. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Features real-time chat with GPT-4o backend, command system for instant portfolio data, and 60 FPS cyberpunk aesthetic with particle effects.

## Architecture

### Core Routing Pattern
- **App Router** structure: `app/(auth)/onboarding/` and `app/(public)/`
- Main entry: `app/page.tsx` orchestrates boot sequence → chat interface
- All client components marked with `"use client"` directive
- Uses `forwardRef` and `useImperativeHandle` for parent-child communication (see `chat-interface.tsx`)

### API Communication Flow
1. **Command-based**: `/projects`, `/stack` → Direct fetch to `https://portana-api.aahil-khan.tech/api/commands/{command}`
2. **Natural language**: User queries → `POST /api/chat/message` → Streamed SSE responses
3. **Centralized API**: All backend calls through `lib/api.ts` (SSE streaming via async generators)
4. **Response types**: `text` (AI answer + citations), `hybrid` (AI + command suggestion), `command` (instant data)

### State Management
- **Local state** with `useState` for UI (no Redux/Zustand)
- **Session storage**: `localStorage` for `user_id`, `session_token` during onboarding
- **Refs for performance**: `useRef` for mouse tracking, animation frames (avoids re-renders)

## Development Workflow

### Setup & Run
```bash
pnpm install              # Install dependencies (pnpm preferred)
pnpm dev                  # Development server (localhost:3000)
pnpm build && pnpm start  # Production build
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=https://portana-api.aahil-khan.tech
```

### Key Scripts
- TypeScript build errors are **ignored** in production (`next.config.mjs` → `ignoreBuildErrors: true`)
- Images **unoptimized** for static export compatibility

## Component Patterns

### Styling Convention
- **Typography**: Space Mono (body/mono), Orbitron (headings/display) - defined in `app/layout.tsx`
- **Colors**: Neon Cyan (`#00d9ff`), Violet (`#a78bfa`), Deep Blue background (`#0b0d10`)
- **Glassmorphism**: Use CSS variables `var(--glass-bg)`, `var(--glass-border)` from `globals.css`
- **Tailwind utilities**: `cn()` helper from `lib/utils.ts` for conditional classes
- **shadcn/ui**: New York style, uses `class-variance-authority` for variants (see `components/ui/button.tsx`)

### Animation Standards
- **Framer Motion** for all animations (60 FPS target)
- **Stagger children**: Use `variants` with `staggerChildren: 0.05-0.1` for lists
- **Performance**: Avoid word-by-word text animations, use GPU hints (`will-change`, `backfaceVisibility`)
- **Particle system**: Canvas-based in `background-effects.tsx` (40 particles, optimized distance calculations)

### Command System Implementation
1. **Check command**: `CommandHandler.handleCommand()` in `lib/command-handler.ts`
2. **Fetch data**: Direct API call or SSE stream
3. **Parse response**: `parseBackendResponse()` from `lib/response-types.ts`
4. **Render**: `CommandDataRenderer` component maps commands to views (`projects` → `ProjectsView`, etc.)

### Type Safety
- **Central types**: `lib/types.ts` defines API contracts (`ChatQuery`, `Step1Data`, etc.)
- **Response parsing**: Always use `parseBackendResponse()` for chat API responses
- **Import alias**: `@/` resolves to project root (configured in `tsconfig.json`)

## Critical Conventions

### API Integration
- **Backend URL**: Hardcoded production API in components (update via `lib/config.ts` for consistency)
- **Session tokens**: Pass via `Authorization: Bearer {token}` header (see `getAuthHeader()` in `config.ts`)
- **Error handling**: Wrap fetch in try-catch, return user-friendly messages (no raw error objects)

### Component Organization
- **Feature components**: `components/portana/` (onboarding steps, chat modules)
- **UI primitives**: `components/ui/` (shadcn/ui components, never edit directly)
- **Shared utilities**: `lib/` (API, types, command handler, utils)

### Mobile Responsiveness
- Use `text-xs md:text-sm` pattern for responsive typography
- Grid layouts: `grid-cols-1 md:grid-cols-2` for breakpoints
- Safe area insets: `paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)"`

## Onboarding Flow
5-step wizard in `app/(auth)/onboarding/`:
1. Basic profile → `Step1Response` with `session_token`
2. Resume upload → Multipart form-data, parse JSON response
3. Data sources (GitHub/Medium) → OAuth tokens optional
4. AI persona config → Tone, verbosity, formality settings
5. Deployment → Returns JWT for production chat API

**Storage**: Save `user_id` and `session_token` to `localStorage` after Step 1, use throughout flow.

## Performance Optimizations
- **Bundle size**: `optimizePackageImports` for Framer Motion, Lucide React in `next.config.mjs`
- **Compression**: `compress: true` for production responses
- **Canvas rendering**: Clear only changed areas, limit line connections to 50 max
- **No source maps**: `productionBrowserSourceMaps: false` reduces build size

## Testing & Debugging
- Check console for `[Step2] Resume parsed successfully` logs during onboarding
- Use browser DevTools Network tab to inspect SSE streams (`data: {...}` format)
- Particle system FPS visible via browser performance monitor (target: 60 FPS)

## Common Pitfalls
- Don't modify `components/ui/` files directly (regenerate with shadcn CLI)
- Always parse backend JSON strings (`parseBackendResponse()`) before rendering
- Use `@/` imports consistently (never relative `../../` paths)
- Test canvas animations on low-end devices (throttle CPU in DevTools)
