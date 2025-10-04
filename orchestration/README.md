# Frontend Orchestration System

This directory contains the complete orchestration system for building and maintaining the OSS Platform frontend with multiple specialized AI agents.

## Overview

The orchestration system consists of one **Orchestrator Agent** that coordinates multiple specialized **sub-agents** to collaboratively design, build, and validate modern, accessible UIs across three main features:

1. **Maintainer Dashboard** - Track maintainer activity and sentiment
2. **Milestone Celebrations** - Celebrate OSS achievements with social sharing
3. **Discoverability Engine** - Search and filter OSS projects

## File Structure

```
/orchestration
├── README.md                   # This file
├── orchestrator-agent.md       # Orchestrator Agent instructions
├── design-agent.md             # Design Agent instructions
├── build-agent.md              # Build Agent instructions
├── browser-agent.md            # Browser Agent instructions
├── shared-context.json         # Canonical design system and contracts
└── logs/                       # Agent communication logs (generated)
```

## Agent Roles

### Orchestrator Agent (`orchestrator-agent.md`)

**Purpose:** Central coordination system that maintains shared context and delegates tasks

**Responsibilities:**

- Maintain and version `shared-context.json`
- Delegate tasks to specialized agents
- Ensure consistency across all modules
- Resolve conflicts between agent outputs
- Monitor quality and performance metrics

**When to consult:** For high-level decisions, task assignments, and consistency reviews

### Design Agent (`design-agent.md`)

**Purpose:** Create modern UI/UX designs following the design system

**Responsibilities:**

- Create component specifications and layouts
- Define interaction patterns and animations
- Ensure accessibility compliance (WCAG AA)
- Design responsive breakpoints
- Use MCPs to fetch inspiration from component libraries

**When to consult:** For new UI components, layout decisions, visual consistency issues

**Key Constraints:**

- Mobile-first (99% of users on mobile)
- Dark theme by default
- No `font-bold` (use `font-medium` or `font-semibold`)
- Simple, uncluttered designs
- shadcn/ui as primary component library

### Build Agent (`build-agent.md`)

**Purpose:** Implement production-quality frontend code

**Responsibilities:**

- Translate designs into Next.js components
- Implement data fetching with TanStack Query v5
- Create responsive layouts with Tailwind CSS
- Write type-safe TypeScript (strict mode)
- Integrate component libraries

**When to consult:** For component implementation, data fetching logic, state management

**Key Requirements:**

- TypeScript strict mode, no `any` types
- Zero linter errors/warnings
- All UI states (loading, error, empty)
- Proper error boundaries
- Performance optimized (lazy loading, memoization)

### Browser Agent (`browser-agent.md`)

**Purpose:** Validate UI through testing and accessibility audits

**Responsibilities:**

- Capture screenshots of all UI states
- Test responsive behavior across breakpoints
- Validate keyboard navigation and focus states
- Check color contrast ratios
- Monitor Core Web Vitals

**When to consult:** For UI validation, accessibility audits, visual regression testing

**Validation Checklist:**

- All UI states rendered correctly
- Responsive on mobile, tablet, desktop
- Keyboard accessible (Tab, Enter, Escape)
- Screen reader friendly
- Color contrast WCAG AA compliant
- No console errors
- Performance targets met

## Shared Context

The `shared-context.json` file is the **single source of truth** for:

### Design Tokens

- Colors (HSL format for dark/light modes)
- Typography (font families, sizes, weights, line heights)
- Spacing scale (4px base unit)
- Border radius values
- Shadow levels
- Animation durations and easing

### Component Library Hierarchy

1. **shadcn/ui** (Primary) - Foundation components
2. **Magic UI** (Secondary) - Animations and micro-interactions
3. **React Bits** (Secondary) - Advanced patterns
4. **Aceternity UI** (Secondary) - Visual effects

### Data Contracts

- TanStack Query key structure
- Cache strategies (static, slow, medium, fast)
- API endpoint definitions
- Type definitions

### Accessibility Standards

- WCAG 2.1 Level AA compliance
- Keyboard navigation patterns
- ARIA requirements
- Focus management rules

### Routing Structure

- Route definitions for all three modules
- Metadata requirements
- OG image specifications

## Communication Protocol

Agents communicate via structured JSON messages logged to `/orchestration/logs/`.

### Message Types

**TASK_ASSIGNMENT** (Orchestrator → Sub-agent)

```json
{
  "type": "TASK_ASSIGNMENT",
  "taskId": "unique-id",
  "agent": "Design|Build|Browser",
  "priority": "High|Medium|Low",
  "context": ["relevant shared context sections"],
  "requirements": "detailed specifications",
  "dependencies": ["other task IDs"],
  "deadline": "timeframe"
}
```

**STATUS_UPDATE** (Sub-agent → Orchestrator)

```json
{
  "type": "STATUS_UPDATE",
  "taskId": "unique-id",
  "status": "In Progress|Blocked|Completed|Failed",
  "progress": "percentage or milestone",
  "blockers": ["list of issues"],
  "deliverables": ["links to files/commits"],
  "nextSteps": "planned actions"
}
```

**DESIGN_DELIVERABLE** (Design Agent → Orchestrator)

```json
{
  "type": "DESIGN_DELIVERABLE",
  "feature": "feature name",
  "components": ["list of designed components"],
  "designDecisions": "key choices made",
  "accessibility": "compliance notes",
  "responsive": "breakpoint behavior",
  "animations": "motion specifications",
  "dependencies": ["external libraries needed"]
}
```

## Workflow

### Typical Development Flow

1. **Orchestrator** receives feature request
2. **Orchestrator** analyzes requirements, updates `shared-context.json` if needed
3. **Orchestrator** assigns design work to **Design Agent**
4. **Design Agent** creates UI specifications
5. **Orchestrator** reviews and approves design
6. **Orchestrator** assigns implementation to **Build Agent**
7. **Build Agent** implements feature with proper error handling and states
8. **Orchestrator** assigns validation to **Browser Agent**
9. **Browser Agent** tests UI, accessibility, and performance
10. **Browser Agent** reports findings to **Orchestrator**
11. If issues found, **Orchestrator** delegates fixes to **Build Agent** (go to 8)
12. If approved, feature is complete

### Conflict Resolution

When agents produce conflicting outputs:

1. Reference `shared-context.json` as source of truth
2. Follow component library hierarchy (shadcn/ui > Magic UI > React Bits > Aceternity)
3. Prioritize accessibility and performance over aesthetics
4. Document decision rationale
5. Update `shared-context.json` to prevent future conflicts

## Design System Principles

### Colors & Theme

- Dark theme by default (99% of users)
- All colors via CSS custom properties
- HSL format for easy manipulation
- Semantic color names (success, warning, error, info)
- 4.5:1 contrast ratio minimum for text

### Typography

- **Never use `font-bold`** (use `font-medium` or `font-semibold`)
- Semantic font sizes (text-sm through text-5xl)
- Line heights optimized for readability
- FoundersGrotesk for body, TWKEverett for headings

### Spacing

- 4px (0.25rem) base unit
- Consistent scale: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64

### Components

- All components must have loading, error, and empty states
- Keyboard accessible (Tab, Enter, Escape, Arrow keys)
- Touch targets minimum 44x44px on mobile
- Hover states on desktop, active states on mobile

### Animation

- Duration: 150-300ms micro-interactions, 300-500ms transitions
- Respect `prefers-reduced-motion`
- Use `transform` and `opacity` for performance
- Purposeful animations only (feedback, attention, smooth transitions)

## Performance Targets

### Core Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **FID** (First Input Delay): < 100ms

### Bundle Size

- Initial JS bundle: < 200kb (gzipped)

### Images

- WebP format with fallback
- Max 200kb per image
- Lazy load below the fold

## Accessibility Requirements

All components must be:

- Keyboard navigable
- Screen reader friendly (ARIA labels, roles, live regions)
- High contrast (4.5:1 text, 3:1 interactive elements)
- Focus indicators visible
- Error messages announced to screen readers

## Testing Strategy

### Browser Agent validates:

1. **Visual** - Screenshots of all states across breakpoints
2. **Functional** - All interactions work as expected
3. **Accessibility** - Keyboard nav, screen reader, contrast
4. **Performance** - Core Web Vitals, bundle size
5. **Cross-browser** - Chrome, Safari, Firefox, Edge

### States to Test

- Default (with data)
- Loading (skeleton screens)
- Empty (no data with helpful message)
- Error (with retry option)

### Breakpoints

- Mobile: < 768px (primary target)
- Tablet: 768px - 1023px
- Desktop: 1024px+

## Success Criteria

A feature is complete when:

- Visual design matches specifications
- All UI states implemented and tested
- Responsive on mobile, tablet, desktop
- Keyboard accessible
- Screen reader friendly
- WCAG AA compliant
- TypeScript strict mode, zero errors
- Performance targets met
- Browser Agent approval

## Updating Shared Context

When to update `shared-context.json`:

1. **New design tokens** - Colors, spacing, typography added
2. **Component patterns** - New reusable patterns emerge
3. **API changes** - Endpoints or data contracts modified
4. **Accessibility standards** - New requirements or patterns
5. **Performance thresholds** - Targets adjusted based on data

Process:

1. Propose change to Orchestrator
2. Orchestrator reviews for consistency
3. Update `shared-context.json` with version bump
4. Notify all agents of change
5. Document rationale in commit message

## Troubleshooting

### Issue: Visual inconsistency across modules

**Solution:** Review `shared-context.json` design tokens, ensure all components use CSS variables

### Issue: Performance regression

**Solution:** Browser Agent runs performance audit, identifies bottleneck, Build Agent optimizes

### Issue: Accessibility failure

**Solution:** Browser Agent identifies specific WCAG violation, Build Agent implements fix following accessibility checklist

### Issue: Conflicting design patterns

**Solution:** Orchestrator reviews component library hierarchy, establishes canonical pattern in shared context

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Magic UI Components](https://magicui.design)
- [TanStack Query v5 Docs](https://tanstack.com/query/latest)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js App Router](https://nextjs.org/docs/app)

## Support

For questions or issues with the orchestration system:

1. Check `shared-context.json` for canonical patterns
2. Review relevant agent's `.md` file for guidelines
3. Consult orchestrator for conflicts or ambiguity
4. Update this README if clarification needed

---

**Last Updated:** October 4, 2025
**Version:** 1.0.0
