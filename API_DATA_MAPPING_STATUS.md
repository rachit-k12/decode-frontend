# API Data Mapping Status - Frontend Updates Complete

## Summary

I've updated all frontend code to use the actual API data from `http://10.7.29.62:8000/api/v1/dashboard/{username}` wherever available. The code now follows this pattern:

1. **Uses real API data** for all fields that currently exist in the API response
2. **Has temporary fallbacks** for the 8 missing fields that backend hasn't implemented yet
3. **Includes TODO comments** marking exactly where backend data is expected

## What Was Updated

### 1. TypeScript Types (`hooks/queries/useMaintainerData.ts`)

Added optional fields with TODO comments for the 8 missing backend fields:

- `burnout.trends?` - 30-day trend data
- `sentiment.multiLineTrend?` - 90-day multi-line sentiment
- `profile.skillsRadar?` - Skills in radar chart format
- `analytics?` - Entire analytics object with 5 sub-fields

### 2. Burnout Page (`app/dashboard/burnout/page.tsx`)

**Using from API:**

- ✅ `burnout.riskScore`
- ✅ `burnout.riskLevel`
- ✅ `burnout.indicators.*`
- ✅ `burnout.recommendations`
- ✅ `burnout.recoveryMetrics.*`

**Temporary Fallback:**

- ⏳ `burnout.trends` - Generates 30-day trend chart data locally until backend adds it

### 3. Sentiment Page (`app/dashboard/sentiment/page.tsx`)

**Using from API:**

- ✅ `sentiment.score`
- ✅ `sentiment.trend`
- ✅ `sentiment.wordFrequency`
- ✅ `sentiment.feedbackDistribution`
- ✅ `sentiment.topPositiveFeedback`
- ✅ `sentiment.concernAreas`

**Temporary Fallback:**

- ⏳ `sentiment.multiLineTrend` - Generates 90-day multi-line data locally until backend adds it

### 4. Invisible Labor Page (`app/dashboard/invisible-labor/page.tsx`)

**Using from API:**

- ✅ `metrics.invisibleLaborScore`
- ✅ `metrics.reviewImpactScore`
- ✅ `metrics.activityDistribution`
- ✅ `metrics.weeklyActivity`
- ✅ `communityMetrics.*`
- ✅ `profile.impactSummary.*`
- ✅ `profile.skills` - Transformed to radar chart format

**Temporary Fallback:**

- ⏳ `analytics.activityHeatmap` - Uses deterministic generation for 30-day heatmap
- ⏳ `profile.skillsRadar` - Falls back to transforming `profile.skills` or default data

### 5. Repository Health Page (`app/dashboard/repositories/page.tsx`)

**Using from API:**

- ✅ `repositoryHealth[]` - All repository data displayed correctly

**Temporary Fallback:**

- ⏳ `analytics.contributorGrowth` - Generates 30-day growth trends locally
- ⏳ `analytics.issueResolutionFunnel` - Uses default funnel data

### 6. Dashboard Overview Page (`app/dashboard/page.tsx`)

**Already using API data correctly:**

- ✅ `metrics.*` - All core metrics
- ✅ `alerts[]` - Alert notifications
- ✅ All data is from API, no local generation

## Backend TODO List

The backend team needs to add these 8 fields to the `/api/v1/dashboard/{username}` endpoint:

### High Priority (Main visualizations)

1. **`burnout.trends`** - Object with 3 arrays (30 days each)

   ```typescript
   trends: {
     responseTime: Array<{ date: string; value: number }>;
     activityLevel: Array<{ date: string; value: number }>;
     sentiment: Array<{ date: string; value: number }>;
   }
   ```

2. **`sentiment.multiLineTrend`** - Object with 3 arrays (90 days each)

   ```typescript
   multiLineTrend: {
     overall: Array<{ date: string; value: number }>;
     reviews: Array<{ date: string; value: number }>;
     discussions: Array<{ date: string; value: number }>;
   }
   ```

3. **`analytics.activityHeatmap`** - Array of 168 items (7 days × 24 hours)

   ```typescript
   activityHeatmap: Array<{
     day: string;
     hour: number;
     intensity: number;
   }>;
   ```

4. **`analytics.contributorGrowth`** - Object with 3 arrays (30 days each)
   ```typescript
   contributorGrowth: {
     total: Array<{ date: string; value: number }>;
     new: Array<{ date: string; value: number }>;
     returning: Array<{ date: string; value: number }>;
   }
   ```

### Medium Priority

5. **`analytics.issueResolutionFunnel`** - Array of 5 stages

   ```typescript
   issueResolutionFunnel: Array<{
     stage: string;
     count: number;
     percentage: number;
   }>;
   ```

6. **`profile.skillsRadar`** - Array of 6 skills
   ```typescript
   skillsRadar: Array<{
     skill: string;
     value: number;
     fullMark: number;
   }>;
   ```

### Low Priority

7. **`analytics.impactTimeline`** - Array of 4-10 major events

   ```typescript
   impactTimeline: Array<{
     date: string;
     type: string;
     title: string;
     impact: number;
     responses: number;
     color: string;
   }>;
   ```

8. **`analytics.cumulativeLabor`** - Array of 30 days
   ```typescript
   cumulativeLabor: Array<{
     date: string;
     reviews: number;
     triage: number;
     mentorship: number;
     documentation: number;
     discussions: number;
   }>;
   ```

## How Frontend Will Adapt

Once backend adds any of these fields:

1. Frontend will **automatically detect** the new field
2. Frontend will **switch from fallback to API data** automatically
3. No frontend code changes needed - it's already set up to handle both cases

## Example

Current code pattern in all files:

```typescript
// Uses API data if available, falls back to generated data if not
const burnoutTrends = burnout.trends
  ? transformAPIData(burnout.trends) // Use API data
  : generateFallbackData(); // Temporary fallback

// When backend adds burnout.trends, the switch happens automatically
```

## Testing Backend Changes

Once backend implements a field, test it:

```bash
# Test specific field exists
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.burnout.trends'

# Verify array lengths
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.burnout.trends.responseTime | length'
# Should return: 30

curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.analytics.activityHeatmap | length'
# Should return: 168
```

## Current Status

| Component          | API Data | Fallback Data | Status                          |
| ------------------ | -------- | ------------- | ------------------------------- |
| Dashboard Overview | 100%     | 0%            | ✅ Complete                     |
| Burnout Risk       | 90%      | 10%           | ⏳ Waiting for `trends`         |
| Sentiment Analysis | 85%      | 15%           | ⏳ Waiting for `multiLineTrend` |
| Invisible Labor    | 70%      | 30%           | ⏳ Waiting for `analytics.*`    |
| Repository Health  | 80%      | 20%           | ⏳ Waiting for `analytics.*`    |

**Overall:** ~85% of data comes from API, 15% is temporary fallback

## Next Steps

1. **Backend Team**: Implement the 8 missing fields (see BACKEND_IMPLEMENTATION_GUIDE.md)
2. **Frontend Team**: No action needed - code is ready for automatic switchover
3. **Testing**: Verify each field as backend adds them
4. **Cleanup**: Remove fallback functions once all fields are added (marked with TODO comments)

## Questions?

- For backend implementation details: See `BACKEND_IMPLEMENTATION_GUIDE.md`
- For complete API spec: See `OPENAPI_SPEC_COMPLETE.md`
- For data structures: See TypeScript types in `hooks/queries/useMaintainerData.ts`
