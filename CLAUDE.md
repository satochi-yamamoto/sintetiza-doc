# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SintetizaDoc is a Vue.js 3 SaaS application for intelligent document summarization using AI. The app supports PDF, DOCX, and TXT uploads, generates various types of summaries using OpenAI/Claude APIs, and provides export functionality with user management through Clerk and Supabase.

## Development Commands

```bash
# Development
npm run dev          # Start development server on port 3012
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Run Prettier formatting

# Testing
npm run test         # Run unit tests with Vitest
npm run test:ui      # Run tests with UI
npm run test:run     # Run tests once
npm run test:coverage # Run tests with coverage report
```

Note: The project uses Vite as the build tool and runs on port 3012 (configured in vite.config.js).

## Architecture Overview

### Frontend Stack
- **Vue.js 3** with Composition API
- **Vite** for build tooling with path aliases configured
- **Tailwind CSS** with custom color scheme and animations
- **Pinia** for state management
- **Vue Router** with lazy loading and route guards
- **Vue I18n** for internationalization (pt-BR/en)

### Authentication Strategy
The application uses **Clerk as the primary authentication system**:
- **Clerk**: Primary authentication with social logins (Google, Apple, GitHub)
- **Supabase**: Database and storage backend (auth system was migrated from Supabase to Clerk)
- User data is synced between Clerk and Supabase database
- Route guards use Clerk's `useAuth()` composable for authentication checks

### Backend Services
- **Supabase**: Database, storage, and real-time subscriptions
- **Clerk**: Primary authentication and user management
- **Stripe**: Payment processing and subscription management
- **OpenAI/Claude**: AI services with automatic failover (OpenAI primary, Claude fallback)

### Key Services Architecture

#### AI Service (`src/services/ai.js`)
- Supports both OpenAI (primary) and Claude (fallback)
- Multiple summary types: standard, executive, technical, educational
- Automatic provider failover
- Meeting analysis and translation capabilities

#### File Processor (`src/services/fileProcessor.js`)
- Handles PDF (PDF.js), DOCX (Mammoth), and TXT processing
- File validation with size limits
- Supabase Storage integration
- Audio transcription placeholder (Whisper API planned)

#### App Store (`src/stores/app.js`)
- Global application state management
- UI state (loading, sidebar, modals, notifications)
- Theme and language management
- File validation utilities and configuration
- Toast notifications system

## File Organization

```
src/
├── components/
│   ├── auth/            # Clerk authentication components
│   ├── layout/          # App layout components (Header, Footer)
│   ├── modals/          # Modal components
│   └── icons/           # SVG icon components
├── views/
│   ├── auth/            # Authentication pages (SignIn, SignUp, UserProfile)
│   ├── dashboard/       # User dashboard pages
│   └── admin/           # Admin panel pages
├── stores/              # Pinia stores (app store for global state)
├── services/            # API services (AI, Supabase, Stripe, export, file processing)
├── utils/               # Utility functions and constants
├── router/              # Vue Router configuration with Clerk guards
└── test/                # Test files (Vitest configuration)
```

## Configuration Details

### Vite Configuration
- Custom path aliases for clean imports (@, @components, @views, @stores, @services, @utils, @assets)
- Manual chunk splitting for optimal loading (vendor, supabase, clerk, stripe, ai, utils)
- Development server on port 3012
- Vue I18n configuration for internationalization

### Tailwind Configuration
- Custom color palette (primary, secondary, success, warning, error)
- Inter font family for UI, JetBrains Mono for code
- Custom animations and keyframes (fade-in, slide-up, pulse-slow)
- Tailwind plugins: forms, typography, aspect-ratio

## Environment Variables

Key environment variables used (create from .env.example):
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_OPENAI_API_KEY` / `VITE_ANTHROPIC_API_KEY`

## Route Structure

- Public routes: `/`, `/funcionalidades`, `/precos`, `/contato`
- Auth routes: `/sign-in`, `/sign-up`, `/user-profile` (Clerk components)
- Legacy redirects: `/login` → `/sign-in`, `/cadastro` → `/sign-up`, `/register` → `/sign-up`
- Dashboard routes: `/dashboard/*` (requires auth)
- Admin routes: `/admin/*` (requires admin role via Clerk publicMetadata)

Route guards use Clerk's `useAuth()` composable and automatically handle:
- Authentication checks with loading states
- Guest route protection
- Admin role verification through Clerk metadata
- Title and meta description updates

## Development Patterns

### Component Patterns
- Use Composition API with `<script setup>`
- Components follow PascalCase naming
- Use Tailwind utility classes with custom component classes when needed

### State Management
- Pinia stores use the composition pattern
- App store handles global UI state, theme, language, and notifications
- Clerk handles authentication state directly through composables
- Reactive state with computed properties for derived values

### Error Handling
- Vue Toastification for user notifications
- Service-level error handling with meaningful messages
- Automatic fallback between AI providers

## Database Schema (Supabase)

Key tables managed through migrations:
- `users` - User profiles and subscription data
- `documents` - Uploaded document metadata
- `summaries` - Generated summary data
- `subscriptions` - Stripe subscription tracking

## Testing and Quality

The project uses **Vitest** for unit testing with **jsdom** environment:

```bash
npm run test         # Run all tests
npm run test:ui      # Run tests with UI interface
npm run test:run     # Run tests once (CI mode)
npm run test:coverage # Run tests with coverage report
```

Test files are located in `src/test/` with setup in `src/test/setup.js`.

### Current Test Status
- Components tests: ✅ Fully working
- Auth tests: ⚠️ Partially working (8/13 passing)
- File upload tests: ⚠️ Some failures
- Integration tests: ⚠️ In progress

Run these commands before committing:
```bash
npm run lint     # Check code style
npm run build    # Ensure build succeeds
npm run test     # Run tests
```

## Key Integration Points

### Clerk Integration
- Handles primary authentication flow
- Syncs user data with Supabase
- Manages social login providers

### Supabase Integration
- Provides database and storage
- Backup authentication system
- Real-time subscriptions for data updates

### AI Integration
- OpenAI GPT-4o-mini for primary processing
- Claude Haiku for fallback
- Automatic provider switching on failures
- Multiple summary types: standard, executive, technical, educational
- Meeting analysis capabilities (decisions, tasks, insights)
- Translation support (Portuguese ↔ English)
- Text quality analysis and readability scoring

## Deployment Notes

- Frontend deploys to Vercel
- Supabase provides backend infrastructure
- Environment variables must be configured in deployment platform
- Build output is optimized with chunk splitting for performance

## Important Development Notes

### Authentication Migration
- The project recently migrated from Supabase Auth to Clerk
- Legacy auth routes (`/login`, `/cadastro`) redirect to new Clerk routes
- Some test files may still reference old auth patterns and need updates

### Internationalization
- Built-in i18n support with Vue I18n
- Default locale: `pt-BR`, fallback: `en`
- Messages defined in `src/main.js`

### File Processing
- Supports PDF (PDF.js), DOCX (Mammoth), TXT, and audio files
- File size limits and type validation in app store
- Upload functionality integrated with Supabase Storage

### Toast Notifications
- Uses Vue Toastification for user feedback
- Configured in `src/main.js` with custom options
- Notifications managed through app store