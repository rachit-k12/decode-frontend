# OSS Frontend Platform - Orchestration System

## What's Set Up

This is a **bare orchestration system** for building frontends with AI agent coordination. No features implemented yet - just the foundation.

### ✅ Orchestration Agents

Complete agent system in `/orchestration/`:

- **orchestrator-agent.md** - Coordinates all agents
- **design-agent.md** - UI/UX design guidelines
- **build-agent.md** - Implementation standards (using simple fetch)
- **browser-agent.md** - Testing and validation
- **shared-context.json** - Design tokens and contracts
- **SETUP.md** - What's been configured

### ✅ Design System

Basic design system configured:

- **Dark theme by default**
- HSL color variables in `/app/globals.css`
- Design tokens in `/app/theme.ts`
- Tailwind configured with custom colors, animations
- Helper utilities in `/lib/design-tokens.ts`
- **No `font-bold`** rule enforced

### ✅ Basic Utilities

Simple tools ready to use:

- `/lib/api.ts` - Simple fetch wrapper (NO TanStack Query)
- `/providers/client-providers.tsx` - Theme + Session
- `/.cursorrules` - Project rules for Cursor

## What's NOT Included

- ❌ No components built
- ❌ No routes created
- ❌ No features implemented
- ❌ No TanStack Query
- ❌ No mock data

## Next Steps

1. **Install MCPs** (if you need design inspiration from component libraries)
2. **Create your first route** when ready
3. **Build features slowly** using the agent guidelines
4. **Use simple fetch** from `/lib/api.ts`

## Quick Start

```bash
npm install
npm run dev
```

## Using the Agents

**Design:** Read `/orchestration/design-agent.md`
**Build:** Read `/orchestration/build-agent.md`  
**Validate:** Read `/orchestration/browser-agent.md`

## Simple Fetch Example

```tsx
import { fetchAPI } from "@/lib/api";
import { useState, useEffect } from "react";

export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAPI("/api/endpoint")
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}
```

---

**Status:** Orchestration system ready. Build at your own pace.
