# Frontend Local Data Generation - Complete Mapping

## Overview

This document maps ALL places in the frontend where data is currently being generated locally instead of using the API. Each section shows:

1. The file location
2. The function generating the data
3. What API field should provide this data
4. The lines of code to update

---

## 1. Burnout Assessment Page

### File: `app/dashboard/burnout/page.tsx`

#### Local Generation:

```typescript
// Lines 24-56
const generateBurnoutTrends = () => {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  let responseTime = 4.2;
  let activityLevel = 65;
  let sentiment = 73;

  return dates.map((date) => {
    responseTime = Math.max(
      2,
      Math.min(12, responseTime + (Math.random() - 0.48) * 0.5)
    );
    activityLevel = Math.max(
      40,
      Math.min(100, activityLevel + (Math.random() - 0.45) * 8)
    );
    sentiment = Math.max(
      40,
      Math.min(90, sentiment + (Math.random() - 0.47) * 5)
    );

    return {
      date,
      responseTime: Math.round(responseTime * 10) / 10,
      activityLevel: Math.round(activityLevel),
      sentiment: Math.round(sentiment),
    };
  });
};

const burnoutTrends = generateBurnoutTrends();
```

#### Usage:

```typescript
// Lines 384-407
<MultiLineChart
  data={burnoutTrends}
  lines={[
    { dataKey: "responseTime", color: "#DC2626", name: "Response Time (hrs)" },
    { dataKey: "activityLevel", color: "#D97706", name: "Activity Level (%)" },
    { dataKey: "sentiment", color: "#059669", name: "Sentiment Score" },
  ]}
/>
```

#### API Field Needed:

```typescript
data?.burnout?.trends = {
  responseTime: [{ date: "2025-09-01", value: 4.2 }], // 30 days
  activityLevel: [{ date: "2025-09-01", value: 65 }], // 30 days
  sentiment: [{ date: "2025-09-01", value: 73 }], // 30 days
};
```

#### Fix Required:

Replace lines 58-407 with:

```typescript
// Remove the generateBurnoutTrends function and burnoutTrends constant

// In the component, transform the API data:
const burnoutTrends = useMemo(() => {
  if (!data?.burnout?.trends) return [];

  const { responseTime, activityLevel, sentiment } = data.burnout.trends;

  // Combine all three arrays by date
  const dateMap = new Map();

  responseTime.forEach((item) => {
    dateMap.set(item.date, { date: item.date, responseTime: item.value });
  });

  activityLevel.forEach((item) => {
    const existing = dateMap.get(item.date) || { date: item.date };
    dateMap.set(item.date, { ...existing, activityLevel: item.value });
  });

  sentiment.forEach((item) => {
    const existing = dateMap.get(item.date) || { date: item.date };
    dateMap.set(item.date, { ...existing, sentiment: item.value });
  });

  return Array.from(dateMap.values());
}, [data?.burnout?.trends]);
```

---

## 2. Sentiment Analysis Page

### File: `app/dashboard/sentiment/page.tsx`

#### Local Generation:

```typescript
// Lines 24-52
const generateMultiLineSentiment = () => {
  const dates = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    return date.toISOString().split("T")[0];
  });

  let overall = 65;
  let reviews = 70;
  let discussions = 60;

  return dates.map((date) => {
    overall = Math.max(40, Math.min(90, overall + (Math.random() - 0.45) * 3));
    reviews = Math.max(40, Math.min(90, reviews + (Math.random() - 0.45) * 4));
    discussions = Math.max(
      40,
      Math.min(90, discussions + (Math.random() - 0.45) * 5)
    );

    return {
      date,
      overall: Math.round(overall),
      reviews: Math.round(reviews),
      discussions: Math.round(discussions),
    };
  });
};

const multiLineSentimentData = generateMultiLineSentiment();
```

#### Usage:

```typescript
// Lines 331-347
<MultiLineChart
  data={multiLineSentimentData}
  lines={[
    { dataKey: "overall", color: "#3B82F6", name: "Overall" },
    { dataKey: "reviews", color: "#10B981", name: "Code Reviews" },
    { dataKey: "discussions", color: "#F59E0B", name: "Discussions" },
  ]}
/>
```

#### API Field Needed:

```typescript
data?.sentiment?.multiLineTrend = {
  overall: [{ date: "2025-08-01", value: 70 }], // 90 days
  reviews: [{ date: "2025-08-01", value: 72 }], // 90 days
  discussions: [{ date: "2025-08-01", value: 68 }], // 90 days
};
```

#### Fix Required:

Replace lines 24-52 with:

```typescript
// Remove the generateMultiLineSentiment function and multiLineSentimentData constant

// In the component, transform the API data:
const multiLineSentimentData = useMemo(() => {
  if (!data?.sentiment?.multiLineTrend) return [];

  const { overall, reviews, discussions } = data.sentiment.multiLineTrend;

  // Combine all three arrays by date
  const dateMap = new Map();

  overall.forEach((item) => {
    dateMap.set(item.date, { date: item.date, overall: item.value });
  });

  reviews.forEach((item) => {
    const existing = dateMap.get(item.date) || { date: item.date };
    dateMap.set(item.date, { ...existing, reviews: item.value });
  });

  discussions.forEach((item) => {
    const existing = dateMap.get(item.date) || { date: item.date };
    dateMap.set(item.date, { ...existing, discussions: item.value });
  });

  return Array.from(dateMap.values());
}, [data?.sentiment?.multiLineTrend]);
```

---

## 3. Invisible Labor Analytics Page

### File: `app/dashboard/invisible-labor/page.tsx`

#### 3.1 Local Generation: Activity Heatmap

```typescript
// Lines 113-140
const heatMapData = useMemo(() => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data: Array<{
    day: string;
    hour: number;
    intensity: number;
    opacity: number;
  }> = [];

  for (const day of days) {
    for (let hour = 0; hour < 24; hour++) {
      const seed = (days.indexOf(day) * 24 + hour) * 12345;
      const pseudoRandom = ((seed * 9301 + 49297) % 233280) / 233280;
      const intensity = pseudoRandom * 100;
      const opacity = Math.max(0.2, intensity / 100);

      data.push({
        day,
        hour,
        intensity: Math.round(intensity),
        opacity,
      });
    }
  }

  return data;
}, []);
```

#### API Field Needed:

```typescript
data?.analytics?.activityHeatmap = [
  { day: "Monday", hour: 0, intensity: 45 },
  { day: "Monday", hour: 1, intensity: 12 },
  // ... 168 entries total (7 days × 24 hours)
];
```

#### Fix Required:

Replace lines 113-140 with:

```typescript
const heatMapData = useMemo(() => {
  if (!data?.analytics?.activityHeatmap) return [];

  return data.analytics.activityHeatmap.map((item) => ({
    ...item,
    opacity: Math.max(0.2, item.intensity / 100),
  }));
}, [data?.analytics?.activityHeatmap]);
```

#### 3.2 Local Generation: Skills Radar

```typescript
// Lines 24-31
const radarData = [
  { skill: "Code Review", value: 95, fullMark: 100 },
  { skill: "Issue Triage", value: 88, fullMark: 100 },
  { skill: "Mentorship", value: 92, fullMark: 100 },
  { skill: "Documentation", value: 78, fullMark: 100 },
  { skill: "Conflict Resolution", value: 85, fullMark: 100 },
  { skill: "Community Building", value: 90, fullMark: 100 },
];
```

#### API Field Needed:

```typescript
data?.profile?.skillsRadar = [
  { skill: "Code Review", value: 95, fullMark: 100 },
  { skill: "Issue Triage", value: 88, fullMark: 100 },
  // ... etc
];
```

#### Fix Required:

Replace line 24-31 with:

```typescript
// Remove the radarData constant

// In the component, use:
const radarData = data?.profile?.skillsRadar || [];
```

#### 3.3 Local Generation: Impact Timeline

```typescript
// Lines 377-410 (hardcoded in JSX)
{[
  {
    date: "2024-03-25",
    type: "review",
    title: "Security Fix Review",
    impact: 95,
    responses: 12,
    color: "blue-500",
  },
  {
    date: "2024-03-20",
    type: "mentorship",
    title: "Onboarded 5 New Contributors",
    impact: 85,
    responses: 8,
    color: "purple-500",
  },
  // ... etc
].map((event, index) => ( /* render */ ))}
```

#### API Field Needed:

```typescript
data?.analytics?.impactTimeline = [
  {
    date: "2025-03-25",
    type: "review",
    title: "Security Fix Review",
    impact: 95,
    responses: 12,
    color: "blue-500",
  },
];
```

#### Fix Required:

Replace lines 377-410 with:

```typescript
{(data?.analytics?.impactTimeline || []).map((event, index) => (
  <div
    key={index}
    className="flex items-center gap-4 rounded-lg border p-4 hover:shadow-md transition-shadow"
  >
    {/* ... existing render code ... */}
  </div>
))}
```

---

## 4. Repository Health Page

### File: `app/dashboard/repositories/page.tsx`

#### 4.1 Local Generation: Contributor Growth

```typescript
// Lines 27-52
const generateContributorGrowth = () => {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  let total = 150;
  let newContribs = 5;
  let returning = 120;

  return dates.map((date) => {
    total = Math.max(100, total + Math.floor(Math.random() * 10 - 3));
    newContribs = Math.max(0, newContribs + Math.floor(Math.random() * 5 - 2));
    returning = Math.max(80, returning + Math.floor(Math.random() * 8 - 3));

    return {
      date,
      total,
      new: newContribs,
      returning,
    };
  });
};

const contributorGrowthData = generateContributorGrowth();
```

#### API Field Needed:

```typescript
data?.analytics?.contributorGrowth = {
  total: [{ date: "2025-09-01", value: 150 }], // 30 days
  new: [{ date: "2025-09-01", value: 5 }], // 30 days
  returning: [{ date: "2025-09-01", value: 120 }], // 30 days
};
```

#### Fix Required:

Replace lines 27-52 with:

```typescript
// Remove the generateContributorGrowth function and contributorGrowthData constant

// In the component, transform the API data:
const contributorGrowthData = useMemo(() => {
  if (!data?.analytics?.contributorGrowth) return [];

  const {
    total,
    new: newContribs,
    returning,
  } = data.analytics.contributorGrowth;

  // Combine all three arrays by date
  const dateMap = new Map();

  total.forEach((item) => {
    dateMap.set(item.date, { date: item.date, total: item.value });
  });

  newContribs.forEach((item) => {
    const existing = dateMap.get(item.date) || { date: item.date };
    dateMap.set(item.date, { ...existing, new: item.value });
  });

  returning.forEach((item) => {
    const existing = dateMap.get(item.date) || { date: item.date };
    dateMap.set(item.date, { ...existing, returning: item.value });
  });

  return Array.from(dateMap.values());
}, [data?.analytics?.contributorGrowth]);
```

#### 4.2 Local Generation: Issue Resolution Funnel

```typescript
// Lines 54-61
const issueResolutionData = [
  { stage: "Created", count: 234, percentage: 100 },
  { stage: "Triaged", count: 198, percentage: 85 },
  { stage: "Assigned", count: 156, percentage: 67 },
  { stage: "In Progress", count: 112, percentage: 48 },
  { stage: "Resolved", count: 98, percentage: 42 },
];
```

#### API Field Needed:

```typescript
data?.analytics?.issueResolutionFunnel = [
  { stage: "Created", count: 234, percentage: 100 },
  { stage: "Triaged", count: 198, percentage: 85 },
  // ... etc
];
```

#### Fix Required:

Replace lines 54-61 with:

```typescript
// Remove the issueResolutionData constant

// In the component, use:
const issueResolutionData = data?.analytics?.issueResolutionFunnel || [];
```

---

## 5. Invisible Labor - Cumulative Labor Chart

### File: `app/dashboard/invisible-labor/page.tsx`

#### Current Usage:

```typescript
// Line 282
<StackedAreaChart data={metrics.weeklyActivity} />
```

This is using `weeklyActivity` which shows weekly snapshots, not cumulative data.

#### API Field Needed:

```typescript
data?.analytics?.cumulativeLabor = [
  {
    date: "2025-09-01",
    reviews: 5,
    triage: 8,
    mentorship: 3,
    documentation: 2,
    discussions: 4,
  },
  {
    date: "2025-09-02",
    reviews: 12, // cumulative: 5 + 7
    triage: 16, // cumulative: 8 + 8
    mentorship: 7, // cumulative: 3 + 4
    documentation: 4,
    discussions: 9,
  },
  // 30 days
];
```

#### Fix Required:

Replace line 282 with:

```typescript
<StackedAreaChart data={data?.analytics?.cumulativeLabor || []} />
```

---

## Summary of All Changes

### Files to Modify:

1. ✅ `app/dashboard/burnout/page.tsx`
2. ✅ `app/dashboard/sentiment/page.tsx`
3. ✅ `app/dashboard/invisible-labor/page.tsx`
4. ✅ `app/dashboard/repositories/page.tsx`

### API Fields to Add:

1. ✅ `burnout.trends` (object with 3 arrays)
2. ✅ `sentiment.multiLineTrend` (object with 3 arrays)
3. ✅ `profile.skillsRadar` (array)
4. ✅ `analytics.activityHeatmap` (array - 168 items)
5. ✅ `analytics.contributorGrowth` (object with 3 arrays)
6. ✅ `analytics.issueResolutionFunnel` (array - 5 items)
7. ✅ `analytics.impactTimeline` (array)
8. ✅ `analytics.cumulativeLabor` (array - 30 days)

### Import to Add:

In all modified files, add:

```typescript
import { useMemo } from "react";
```

---

## Testing Checklist

After backend implements the new fields:

- [ ] Burnout page: 30-day trend chart displays correctly
- [ ] Sentiment page: 90-day multi-line chart displays correctly
- [ ] Invisible Labor: Activity heatmap displays correctly
- [ ] Invisible Labor: Skills radar chart displays correctly
- [ ] Invisible Labor: Impact timeline displays correctly
- [ ] Invisible Labor: Cumulative labor stacked area chart displays correctly
- [ ] Repository Health: Contributor growth chart displays correctly
- [ ] Repository Health: Issue resolution funnel displays correctly
- [ ] All charts animate smoothly
- [ ] No console errors
- [ ] Loading states work correctly
- [ ] Error states work correctly

---

## Notes

1. All date formats should be `YYYY-MM-DD`
2. All timestamps should be ISO 8601: `YYYY-MM-DDTHH:mm:ss.SSSZ`
3. The frontend will add `opacity` to heatmap data - backend only needs `intensity`
4. Colors in API response should be Tailwind class names (e.g., "blue-500") or hex codes (e.g., "#6366f1")
5. All arrays should be sorted by date (oldest first)
