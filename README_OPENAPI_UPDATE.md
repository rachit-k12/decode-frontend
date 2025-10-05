# OpenAPI Specification Update - Complete Documentation

## What Was the Problem?

Your frontend code was generating data locally (mock data) in many places instead of fetching it from the API. This meant:

- Charts showing fake/random data
- Data not persisting across refreshes
- No real user data being displayed

## What Did I Find?

I analyzed your entire codebase and found **8 places** where data is generated locally:

1. **Burnout page:** 30-day trend chart (responseTime, activityLevel, sentiment)
2. **Sentiment page:** 90-day multi-line sentiment evolution
3. **Invisible Labor page:** Activity heatmap (7 days × 24 hours = 168 data points)
4. **Invisible Labor page:** Skills radar chart (6 skills)
5. **Invisible Labor page:** Impact timeline (major contributions)
6. **Invisible Labor page:** Cumulative labor stacked area chart
7. **Repository Health page:** Contributor growth trends
8. **Repository Health page:** Issue resolution funnel

## Solution

I've created **4 comprehensive documentation files** for you:

### 1. `OPENAPI_SPEC_COMPLETE.md`

**For Backend Developers**

- Complete OpenAPI specification with ALL fields
- Shows the COMPLETE response structure your endpoint should return
- Includes the 8 new fields that are currently missing
- TypeScript interfaces for type safety

### 2. `BACKEND_IMPLEMENTATION_GUIDE.md`

**For Backend Developers - Quick Reference**

- Summary of what you have vs. what you need
- Exact JSON structure for each new field
- Python code examples for data generation
- Testing commands to verify your implementation
- Priority ranking (high/medium/low)

### 3. `FRONTEND_LOCAL_DATA_MAPPING.md`

**For Frontend Developers**

- Shows EXACTLY where in the code data is generated locally
- Line-by-line mapping of what needs to change
- Code snippets for the fixes
- Before/After comparisons

### 4. `OPENAPI_SPEC_CHANGES.md`

**For Everyone - Overview**

- Summary of all changes made
- What was missing from the original spec
- Data flow diagrams

---

## Quick Summary: What Needs to Be Added

### Current Status: 90% Complete ✅

Your API already returns:

- ✅ metrics (all core fields)
- ✅ burnout (core assessment)
- ✅ sentiment (core analysis)
- ✅ communityMetrics
- ✅ profile
- ✅ alerts
- ✅ recentActivity
- ✅ repositoryHealth

### Missing: 8 Fields ❌

You need to add these to your `/api/v1/dashboard/{username}` endpoint:

1. **`burnout.trends`** - Object with 3 arrays (30 days each)

   - responseTime, activityLevel, sentiment

2. **`sentiment.multiLineTrend`** - Object with 3 arrays (90 days each)

   - overall, reviews, discussions

3. **`profile.skillsRadar`** - Array of 6 skills

   - Code Review, Issue Triage, Mentorship, Documentation, Conflict Resolution, Community Building

4. **`analytics`** - NEW top-level object with 5 sub-fields:
   - **`activityHeatmap`** - Array of 168 items (7 days × 24 hours)
   - **`contributorGrowth`** - Object with 3 arrays (30 days each)
   - **`issueResolutionFunnel`** - Array of 5 stages
   - **`impactTimeline`** - Array of 4-10 major events
   - **`cumulativeLabor`** - Array of 30 days

---

## For Backend Team: Quick Start

### Step 1: Read This First

👉 **`BACKEND_IMPLEMENTATION_GUIDE.md`**

This shows you:

- What your current response looks like
- Exactly what to add
- Code examples for generating the data

### Step 2: Implement the Changes

Add the 8 new fields to your endpoint. Priority order:

**High Priority** (Main charts on dashboard pages):

1. `analytics.activityHeatmap` (168 items)
2. `analytics.cumulativeLabor` (30 days)
3. `burnout.trends` (3 arrays of 30 days)
4. `sentiment.multiLineTrend` (3 arrays of 90 days)

**Medium Priority**: 5. `analytics.contributorGrowth` (3 arrays of 30 days) 6. `analytics.issueResolutionFunnel` (5 items) 7. `profile.skillsRadar` (6 items)

**Low Priority**: 8. `analytics.impactTimeline` (4-10 items)

### Step 3: Test Your Implementation

```bash
# Test the endpoint returns all new fields
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.analytics'
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.burnout.trends'
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.sentiment.multiLineTrend'
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.profile.skillsRadar'

# Verify counts
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.analytics.activityHeatmap | length'
# Should return: 168
```

### Step 4: Notify Frontend Team

Once your changes are deployed, let the frontend team know so they can update the code.

---

## For Frontend Team: Quick Start

### Wait for Backend First!

⏳ Don't start until backend has added the new fields.

### Step 1: Read This First

👉 **`FRONTEND_LOCAL_DATA_MAPPING.md`**

This shows you:

- Every file that needs to be changed
- Exact line numbers
- Before/After code snippets

### Step 2: Update the Code

Files to modify:

1. `app/dashboard/burnout/page.tsx`
2. `app/dashboard/sentiment/page.tsx`
3. `app/dashboard/invisible-labor/page.tsx`
4. `app/dashboard/repositories/page.tsx`

Main changes:

- Remove local data generation functions
- Use API data instead
- Transform API data format where needed

### Step 3: Update TypeScript Types

Add to `hooks/queries/useMaintainerData.ts`:

```typescript
export interface DashboardData {
  // ... existing fields ...
  burnout: {
    // ... existing fields ...
    trends: {
      responseTime: Array<{ date: string; value: number }>;
      activityLevel: Array<{ date: string; value: number }>;
      sentiment: Array<{ date: string; value: number }>;
    };
  };
  sentiment: {
    // ... existing fields ...
    multiLineTrend: {
      overall: Array<{ date: string; value: number }>;
      reviews: Array<{ date: string; value: number }>;
      discussions: Array<{ date: string; value: number }>;
    };
  };
  profile: {
    // ... existing fields ...
    skillsRadar: Array<{
      skill: string;
      value: number;
      fullMark: number;
    }>;
  };
  analytics: {
    activityHeatmap: Array<{
      day: string;
      hour: number;
      intensity: number;
    }>;
    contributorGrowth: {
      total: Array<{ date: string; value: number }>;
      new: Array<{ date: string; value: number }>;
      returning: Array<{ date: string; value: number }>;
    };
    issueResolutionFunnel: Array<{
      stage: string;
      count: number;
      percentage: number;
    }>;
    impactTimeline: Array<{
      date: string;
      type: string;
      title: string;
      impact: number;
      responses: number;
      color: string;
    }>;
    cumulativeLabor: Array<{
      date: string;
      reviews: number;
      triage: number;
      mentorship: number;
      documentation: number;
      discussions: number;
    }>;
  };
}
```

### Step 4: Test Everything

- [ ] Visit each dashboard page
- [ ] Verify all charts display real data
- [ ] Check loading states
- [ ] Check error handling
- [ ] Test with different usernames
- [ ] Verify no console errors

---

## Files Created

| File                              | Purpose                                    | For      |
| --------------------------------- | ------------------------------------------ | -------- |
| `OPENAPI_SPEC_COMPLETE.md`        | Complete API specification with all fields | Backend  |
| `BACKEND_IMPLEMENTATION_GUIDE.md` | Quick implementation guide with examples   | Backend  |
| `FRONTEND_LOCAL_DATA_MAPPING.md`  | Line-by-line code changes needed           | Frontend |
| `OPENAPI_SPEC_CHANGES.md`         | Overview of all changes made               | Everyone |
| `README_OPENAPI_UPDATE.md`        | This file - Quick start guide              | Everyone |

---

## Timeline

### Phase 1: Backend Implementation (3-5 days)

- Backend team implements the 8 new fields
- Test endpoint returns correct data
- Deploy to development/staging

### Phase 2: Frontend Integration (1-2 days)

- Frontend team updates code to use API data
- Remove local data generation
- Test all dashboard pages

### Phase 3: Testing & QA (1 day)

- Full integration testing
- Performance testing
- User acceptance testing

**Total Estimated Time: 1-2 weeks**

---

## Need Help?

### For Backend Questions:

- Read `BACKEND_IMPLEMENTATION_GUIDE.md`
- Check `OPENAPI_SPEC_COMPLETE.md` for complete structure
- Look at Python code examples in the guide

### For Frontend Questions:

- Read `FRONTEND_LOCAL_DATA_MAPPING.md`
- Check exact line numbers and code snippets
- TypeScript interfaces provided

### For General Questions:

- Read `OPENAPI_SPEC_CHANGES.md`
- Review this README
- Check the data flow and structure

---

## Success Criteria

Your implementation is complete when:

1. ✅ Backend endpoint returns all 8 new fields
2. ✅ All data arrays have correct lengths:
   - activityHeatmap: 168 items
   - 30-day trends: 30 items each
   - 90-day trends: 90 items each
   - skillsRadar: 6 items
   - issueResolutionFunnel: 5 items
3. ✅ Frontend code uses API data (no local generation)
4. ✅ All dashboard pages display correctly
5. ✅ Charts show real user data
6. ✅ No console errors
7. ✅ Response time < 2 seconds

---

## Questions?

If you have questions about:

- **Data structure**: Check `OPENAPI_SPEC_COMPLETE.md`
- **Implementation**: Check `BACKEND_IMPLEMENTATION_GUIDE.md`
- **Code changes**: Check `FRONTEND_LOCAL_DATA_MAPPING.md`
- **What changed**: Check `OPENAPI_SPEC_CHANGES.md`
