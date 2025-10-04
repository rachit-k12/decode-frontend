# OSS Frontend Platform - Orchestration System

## Project Overview

A production-ready Next.js application with a complete **AI agent orchestration system** for building consistent, accessible, and modern UIs across three OSS-focused modules.

## What's Been Created

### 1. Orchestration System (`/orchestration`)

A complete multi-agent system with detailed instructions for:

- **Orchestrator Agent** - Central coordinator maintaining shared context
- **Design Agent** - Creates UI/UX following design system principles
- **Build Agent** - Implements production-quality code
- **Browser Agent** - Validates UI, accessibility, and performance

Each agent has comprehensive guidelines in dedicated `.md` files with clear responsibilities, communication protocols, and success criteria.

### 2. Shared Context Schema (`/orchestration/shared-context.json`)

A canonical JSON file defining:

- Design tokens (colors, typography, spacing, shadows, animations)
- Component library hierarchy (shadcn/ui → Magic UI → React Bits → Aceternity UI)
- TanStack Query keys and caching strategies
- Accessibility checklist (WCAG AA compliance)
- Routing structure for all modules
- Performance targets (Core Web Vitals)

This serves as the **single source of truth** across all agents.

### 3. Design System Implementation

**Theme Configuration:**

- `/app/theme.ts` - Comprehensive design tokens
- `/app/globals.css` - Updated with HSL color variables for dark/light modes
- `/lib/design-tokens.ts` - Programmatic access to design system
- `/tailwind.config.ts` - Enhanced with semantic colors, animations, and utilities

**Key Features:**

- Dark theme by default (99% of users on mobile)
- HSL color format for easy manipulation
- No `font-bold` (uses `font-medium` and `font-semibold` only)
- Semantic color tokens (success, warning, error, info)
- Comprehensive animation library (fade, slide, scale, special effects)
- Mobile-first responsive breakpoints

### 4. Shared UI Components (`/components/shared`)

Production-ready components with full accessibility:

- **EmptyState** - User-friendly no-data messaging with CTAs
- **ErrorState** - Detailed error display with retry functionality
- **Card** - Flexible card component with hover and clickable variants
- **Skeleton** - Loading states that match final content shape
- **Modal** - Accessible modal with focus trap and keyboard support
- **Various Skeletons** - Dashboard, Profile, Detail, CV loading states

All components include:

- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Responsive design
- Dark mode support

### 5. Data Fetching Layer

**TanStack Query Setup:**

- `/lib/queryClient.ts` - Configured query client with smart defaults
- `/lib/api.ts` - Type-safe API utilities with error handling
- `/shared/query-keys.ts` - Centralized query key definitions
- `/shared/types.ts` - TypeScript interfaces for all data models

**Features:**

- Automatic retries with exponential backoff
- Proper cache management
- Type-safe requests
- Timeout handling
- Error boundaries

### 6. App Structure

**Routes Created:**

```
/app
├── maintainer/
│   ├── page.tsx              # Maintainer dashboard
│   └── [id]/
│       ├── page.tsx          # Maintainer profile
│       └── cv/
│           └── page.tsx      # Contribution CV
├── milestones/
│   ├── page.tsx              # Milestone dashboard
│   └── [id]/
│       └── page.tsx          # Milestone detail
├── discover/
│   ├── page.tsx              # Discovery engine
│   └── [id]/
│       └── page.tsx          # Project detail
├── error.tsx                 # Global error boundary
└── layout.tsx                # Root layout (existing)
```

### 7. Maintainer Dashboard (Fully Implemented)

**Components Created:**

- `MaintainerDashboard.tsx` - Grid view of maintainers with search/filters
- `MaintainerProfile.tsx` - Detailed profile with tabs for activity/sentiment
- `ActivityFeed.tsx` - Filterable activity timeline with type indicators
- `SentimentChart.tsx` - Visual sentiment analysis over time
- `ContributionCV.tsx` - Shareable CV with OG metadata

**Features:**

- Real-time search functionality
- Activity type filtering (PR reviews, issue triage, mentorship, docs, CI fixes)
- Sentiment visualization with color-coded indicators
- Responsive design (mobile-first)
- Keyboard accessible
- Social sharing capabilities

**Data Hooks:**

- `useMaintainerProfile()` - Fetch maintainer details
- `useMaintainerActivity()` - Fetch filtered activities
- `useMaintainerSentiment()` - Fetch sentiment data
- `useMaintainerCV()` - Fetch CV data

### 8. Providers & Configuration

**Updated:**

- `/providers/client-providers.tsx` - Integrated TanStack Query client
- Dark mode as default theme
- Proper provider hierarchy

### 9. Cursor Rules (`.cursorrules`)

Comprehensive project rules including:

- Tech stack overview
- Agent system structure
- Design system rules
- Accessibility requirements
- Data fetching patterns
- Code quality standards
- File organization guidelines

## What's Remaining

### 1. Milestone Celebrations Module

**Needs:**

- `MilestoneDashboard.tsx` - Grid of milestone cards
- `MilestoneCard.tsx` - Individual milestone display
- `MilestoneDetail.tsx` - Celebration view with confetti
- `LinkedInPostGenerator.tsx` - Generate shareable posts
- `useMilestones()` hook - Data fetching

**Features to Implement:**

- Milestone filtering (stars, PRs, anniversaries, contributors, releases)
- Confetti animation on milestone view
- LinkedIn post generation with OG preview
- Copy/share functionality

### 2. Discoverability Engine Module

**Needs:**

- `DiscoveryEngine.tsx` - Search + filter interface
- `ProjectCard.tsx` - Project cards in grid layout
- `FilterPanel.tsx` - Advanced filtering sidebar
- `ProjectDetail.tsx` - Detailed project view
- `useProjects()` hook - Search and filter queries

**Features to Implement:**

- Full-text search with autocomplete
- Multi-faceted filters (language, health score, activity, compatibility)
- Pagination or infinite scroll
- Save search functionality
- Shareable query URLs

### 3. API Route Handlers

**Needs:**

- `/app/api/maintainer/**` - Maintainer endpoints
- `/app/api/milestones/**` - Milestone endpoints
- `/app/api/projects/**` - Project search endpoints

### 4. Additional Polish

- Add animations using Framer Motion
- Integrate Magic UI components (shimmer buttons, text reveal)
- Add Aceternity UI effects (background beams)
- Create more comprehensive mock data
- Add unit tests (if required)

## How to Use the Orchestration System

### For Development

1. **Consult Orchestrator Agent** (`/orchestration/orchestrator-agent.md`)

   - For task planning and delegation
   - For consistency reviews
   - For conflict resolution

2. **Design New Features**

   - Refer to Design Agent (`/orchestration/design-agent.md`)
   - Check `shared-context.json` for design tokens
   - Use approved component libraries in order of priority

3. **Build Features**

   - Follow Build Agent (`/orchestration/build-agent.md`) guidelines
   - Use query keys from `/shared/query-keys.ts`
   - Implement all UI states (loading, error, empty)
   - Ensure TypeScript strict mode compliance

4. **Validate Implementation**
   - Use Browser Agent (`/orchestration/browser-agent.md`) checklist
   - Test all UI states
   - Verify keyboard navigation
   - Check accessibility with screen reader
   - Measure Core Web Vitals

### Key Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npm run type-check
```

## Design System Quick Reference

### Colors

Use semantic tokens via CSS variables:

```tsx
className = "bg-background text-foreground";
className = "bg-card border-border";
className = "text-success"; // Green
className = "text-warning"; // Yellow
className = "text-error"; // Red
className = "text-info"; // Blue
```

### Typography

```tsx
className = "font-heading text-4xl font-semibold"; // Headings
className = "font-sans text-base"; // Body
className = "font-medium"; // Medium weight (NOT bold)
className = "font-semibold"; // Semibold (NOT bold)
```

### Spacing

```tsx
className = "p-6"; // Padding: 24px
className = "gap-4"; // Gap: 16px
className = "mb-8"; // Margin bottom: 32px
```

### Components

```tsx
import { Button } from "@/components/ui/forms/button";
import { Card } from "@/components/shared/Card";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
```

### Data Fetching

```tsx
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/shared/query-keys";
import { api } from "@/lib/api";

const { data, isLoading, error } = useQuery({
  queryKey: QUERY_KEYS.maintainer.detail(id),
  queryFn: () => api.get(`/api/maintainer/${id}`),
});
```

## Accessibility Features Built-In

All components include:

- ✅ Keyboard navigation (Tab, Enter, Escape, Arrows)
- ✅ ARIA labels, roles, and live regions
- ✅ Focus indicators (focus-visible)
- ✅ Color contrast compliance (WCAG AA)
- ✅ Screen reader announcements
- ✅ Touch targets 44x44px minimum
- ✅ Semantic HTML
- ✅ Skip links and landmarks

## Performance Optimizations

- ✅ Server Components by default
- ✅ Lazy loading with `next/dynamic`
- ✅ Image optimization with `next/image`
- ✅ TanStack Query caching strategies
- ✅ React Suspense boundaries
- ✅ Error boundaries at route level
- ✅ CSS-in-CSS (no runtime CSS-in-JS overhead)

## Mobile-First Approach

Design decisions prioritize mobile (99% of users):

- Touch-friendly interactions
- Bottom navigation (when applicable)
- Stacked layouts on small screens
- Optimized font sizes for readability
- Reduced motion support
- Efficient data loading

## Next Steps

1. **Complete Milestone Celebrations**

   - Implement components listed above
   - Add confetti animations
   - Integrate LinkedIn sharing

2. **Complete Discoverability Engine**

   - Build search interface
   - Implement filter panel
   - Add project cards
   - Create detail views

3. **Add Backend Integration**

   - Create API route handlers
   - Connect to database
   - Implement authentication

4. **Polish & Enhancement**

   - Add more Magic UI animations
   - Integrate Aceternity UI effects
   - Expand mock data
   - Add real API calls

5. **Testing & Validation**
   - Run Browser Agent validation
   - Test with screen readers
   - Measure performance
   - Cross-browser testing

## Support & Documentation

- **Main README**: `/orchestration/README.md`
- **Agent Instructions**: `/orchestration/*-agent.md`
- **Shared Context**: `/orchestration/shared-context.json`
- **Cursor Rules**: `/.cursorrules`
- **Design Tokens**: `/lib/design-tokens.ts`
- **API Utilities**: `/lib/api.ts`

## License

This orchestration system and codebase structure can be reused for any frontend project requiring consistent, accessible UIs built with AI assistance.

---

**Created:** October 4, 2025  
**Status:** Foundation Complete, Ready for Feature Development  
**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, TanStack Query v5, shadcn/ui
