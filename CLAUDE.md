# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SintetizaDoc is a Vue.js 3 SaaS application for intelligent document summarization using AI. The app supports PDF, DOCX, and TXT uploads, generates various types of summaries using OpenAI/Claude APIs, and provides export functionality with user management through Clerk and Supabase.

## Development Commands

```bash
# Development
npm run dev          # Start development server on port 3000
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Run Prettier formatting
```

Note: The project uses Vite as the build tool and runs on port 3000 (not the default 5173).

## Architecture Overview

### Frontend Stack
- **Vue.js 3** with Composition API
- **Vite** for build tooling with path aliases configured
- **Tailwind CSS** with custom color scheme and animations
- **Pinia** for state management
- **Vue Router** with lazy loading and route guards
- **Vue I18n** for internationalization (pt-BR/en)

### Authentication Strategy
The application uses a **dual authentication approach**:
- **Primary**: Clerk (social logins: Google, Apple, GitHub)
- **Fallback**: Supabase Auth
- Both systems are synchronized through the auth store

### Backend Services
- **Supabase**: Database, storage, and auth fallback
- **Clerk**: Primary authentication and user management
- **Stripe**: Payment processing and subscription management
- **OpenAI/Claude**: AI services with automatic fallback

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

#### Authentication Store (`src/stores/auth.js`)
- Manages dual auth (Clerk + Supabase)
- User profile synchronization
- Subscription and plan management
- Route protection logic

## File Organization

```
src/
├── components/
│   ├── layout/          # App layout components (Header, Footer)
│   ├── modals/          # Modal components
│   └── icons/           # SVG icon components
├── views/
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # User dashboard pages
│   └── admin/           # Admin panel pages
├── stores/              # Pinia stores
├── services/            # API services and integrations
├── utils/               # Utility functions and constants
└── router/              # Vue Router configuration
```

## Configuration Details

### Vite Configuration
- Custom path aliases for clean imports (@, @components, @views, etc.)
- Manual chunk splitting for optimal loading
- Development server on port 3000

### Tailwind Configuration
- Custom color palette (primary, secondary, success, warning, error)
- Inter font family for UI, JetBrains Mono for code
- Custom animations and keyframes

## Environment Variables

Key environment variables used (create from .env.example):
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_OPENAI_API_KEY` / `VITE_ANTHROPIC_API_KEY`

## Route Structure

- Public routes: `/`, `/funcionalidades`, `/precos`, `/contato`
- Auth routes: `/login`, `/cadastro`, `/esqueci-senha`
- Dashboard routes: `/dashboard/*` (requires auth)
- Admin routes: `/admin/*` (requires admin role)

Route guards automatically handle authentication and admin access control.

## Development Patterns

### Component Patterns
- Use Composition API with `<script setup>`
- Components follow PascalCase naming
- Use Tailwind utility classes with custom component classes when needed

### State Management
- Pinia stores use the composition pattern
- Auth store handles both Clerk and Supabase synchronization
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

Run these commands before committing:
```bash
npm run lint     # Check code style
npm run build    # Ensure build succeeds
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

## Deployment Notes

- Frontend deploys to Vercel
- Supabase provides backend infrastructure
- Environment variables must be configured in deployment platform
- Build output is optimized with chunk splitting for performance