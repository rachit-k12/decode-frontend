# Backend Implementation Guide - Complete Specification

## Quick Summary

Your frontend currently generates data locally in 4 dashboard pages. This guide shows exactly what fields you need to add to your `/api/v1/dashboard/{username}` endpoint.

## Current API Response (What You Have)

Your current response is **90% complete**. You have:

- ✅ metrics (all fields)
- ✅ burnout (core fields)
- ✅ sentiment (core fields)
- ✅ communityMetrics
- ✅ profile (core fields)
- ✅ alerts
- ✅ recentActivity
- ✅ repositoryHealth

## Missing Fields (What You Need to Add)

You need to add **8 new fields** to eliminate all local data generation:

### 1. Add `burnout.trends` Object

**Current:**

```json
"burnout": {
  "riskScore": 62,
  "riskLevel": "high",
  "indicators": { ... },
  "recommendations": [ ... ],
  "recoveryMetrics": { ... }
}
```

**Add this:**

```json
"burnout": {
  "riskScore": 62,
  "riskLevel": "high",
  "indicators": { ... },
  "recommendations": [ ... ],
  "recoveryMetrics": { ... },
  "trends": {
    "responseTime": [
      {"date": "2025-09-01", "value": 4.2},
      {"date": "2025-09-02", "value": 4.5}
      // 30 days total
    ],
    "activityLevel": [
      {"date": "2025-09-01", "value": 65},
      {"date": "2025-09-02", "value": 68}
      // 30 days total
    ],
    "sentiment": [
      {"date": "2025-09-01", "value": 73},
      {"date": "2025-09-02", "value": 75}
      // 30 days total
    ]
  }
}
```

**Used in:** Burnout Assessment page - 30-day trend chart

---

### 2. Add `sentiment.multiLineTrend` Object

**Current:**

```json
"sentiment": {
  "score": 73,
  "trend": "stable",
  "wordFrequency": [ ... ],
  "feedbackDistribution": { ... },
  "topPositiveFeedback": [ ... ],
  "concernAreas": [ ... ]
}
```

**Add this:**

```json
"sentiment": {
  "score": 73,
  "trend": "stable",
  "wordFrequency": [ ... ],
  "feedbackDistribution": { ... },
  "topPositiveFeedback": [ ... ],
  "concernAreas": [ ... ],
  "multiLineTrend": {
    "overall": [
      {"date": "2025-08-01", "value": 70},
      {"date": "2025-08-02", "value": 71}
      // 90 days total
    ],
    "reviews": [
      {"date": "2025-08-01", "value": 72},
      {"date": "2025-08-02", "value": 73}
      // 90 days total
    ],
    "discussions": [
      {"date": "2025-08-01", "value": 68},
      {"date": "2025-08-02", "value": 69}
      // 90 days total
    ]
  }
}
```

**Used in:** Sentiment Analysis page - 90-day evolution chart

---

### 3. Add `profile.skillsRadar` Array

**Current:**

```json
"profile": {
  "name": "Sarah Maintainer",
  "username": "sarah_maintainer",
  "skills": [
    {
      "skill": "Code Review",
      "score": 52,
      "maxScore": 100,
      "category": "technical"
    }
  ],
  "impactSummary": { ... }
}
```

**Add this:**

```json
"profile": {
  "name": "Sarah Maintainer",
  "username": "sarah_maintainer",
  "skills": [ ... ],
  "impactSummary": { ... },
  "skillsRadar": [
    {"skill": "Code Review", "value": 95, "fullMark": 100},
    {"skill": "Issue Triage", "value": 88, "fullMark": 100},
    {"skill": "Mentorship", "value": 92, "fullMark": 100},
    {"skill": "Documentation", "value": 78, "fullMark": 100},
    {"skill": "Conflict Resolution", "value": 85, "fullMark": 100},
    {"skill": "Community Building", "value": 90, "fullMark": 100}
  ]
}
```

**Used in:** Invisible Labor page - Skills radar chart

**Note:** Use exactly these 6 skill names in this order.

---

### 4. Add NEW Top-Level `analytics` Object

**Add this entire new section to your response:**

```json
{
  "metrics": { ... },
  "burnout": { ... },
  "sentiment": { ... },
  "communityMetrics": { ... },
  "profile": { ... },
  "alerts": [ ... ],
  "recentActivity": [ ... ],
  "repositoryHealth": [ ... ],
  "analytics": {
    "activityHeatmap": [
      {"day": "Monday", "hour": 0, "intensity": 45},
      {"day": "Monday", "hour": 1, "intensity": 12},
      {"day": "Monday", "hour": 2, "intensity": 8}
      // 168 entries total (7 days × 24 hours)
    ],
    "contributorGrowth": {
      "total": [
        {"date": "2025-09-01", "value": 150},
        {"date": "2025-09-02", "value": 152}
        // 30 days total
      ],
      "new": [
        {"date": "2025-09-01", "value": 5},
        {"date": "2025-09-02", "value": 6}
        // 30 days total
      ],
      "returning": [
        {"date": "2025-09-01", "value": 120},
        {"date": "2025-09-02", "value": 122}
        // 30 days total
      ]
    },
    "issueResolutionFunnel": [
      {"stage": "Created", "count": 234, "percentage": 100},
      {"stage": "Triaged", "count": 198, "percentage": 85},
      {"stage": "Assigned", "count": 156, "percentage": 67},
      {"stage": "In Progress", "count": 112, "percentage": 48},
      {"stage": "Resolved", "count": 98, "percentage": 42}
    ],
    "impactTimeline": [
      {
        "date": "2025-03-25",
        "type": "review",
        "title": "Security Fix Review",
        "impact": 95,
        "responses": 12,
        "color": "blue-500"
      },
      {
        "date": "2025-03-20",
        "type": "mentorship",
        "title": "Onboarded 5 New Contributors",
        "impact": 85,
        "responses": 8,
        "color": "purple-500"
      }
      // 4-10 major events
    ],
    "cumulativeLabor": [
      {
        "date": "2025-09-01",
        "reviews": 5,
        "triage": 8,
        "mentorship": 3,
        "documentation": 2,
        "discussions": 4
      },
      {
        "date": "2025-09-02",
        "reviews": 12,
        "triage": 16,
        "mentorship": 7,
        "documentation": 4,
        "discussions": 9
      }
      // 30 days total
    ]
  }
}
```

**Breakdown:**

#### 4a. `analytics.activityHeatmap`

- **Purpose:** Shows when the maintainer is most active
- **Size:** 168 entries (7 days × 24 hours)
- **Used in:** Invisible Labor page - Activity heatmap
- **Days:** "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
- **Hours:** 0-23
- **Intensity:** 0-100 (percentage of activity during that hour)

#### 4b. `analytics.contributorGrowth`

- **Purpose:** Shows repository contributor trends
- **Size:** 30 days per array (3 arrays total)
- **Used in:** Repository Health page - Contributor growth chart

#### 4c. `analytics.issueResolutionFunnel`

- **Purpose:** Shows issue lifecycle progression
- **Size:** 5 stages
- **Used in:** Repository Health page - Issue resolution funnel
- **Note:** Percentage should be relative to "Created" count

#### 4d. `analytics.impactTimeline`

- **Purpose:** Shows major contributions and their impact
- **Size:** 4-10 significant events
- **Used in:** Invisible Labor page - Impact timeline
- **Types:** "review", "mentorship", "triage", "documentation"
- **Colors:** "blue-500", "purple-500", "emerald-500", "amber-500"

#### 4e. `analytics.cumulativeLabor`

- **Purpose:** Shows cumulative effort over time (for stacked area chart)
- **Size:** 30 days
- **Used in:** Invisible Labor page - Cumulative labor chart
- **Note:** Values should be cumulative (each day adds to previous day's total)

---

## Implementation Priority

### High Priority (Used on Multiple Pages)

1. ✅ `analytics.activityHeatmap` - Visible on Invisible Labor page
2. ✅ `analytics.cumulativeLabor` - Main chart on Invisible Labor page
3. ✅ `burnout.trends` - Main chart on Burnout page
4. ✅ `sentiment.multiLineTrend` - Main chart on Sentiment page

### Medium Priority (Used on Specific Pages)

5. ✅ `analytics.contributorGrowth` - Repository Health page
6. ✅ `analytics.issueResolutionFunnel` - Repository Health page
7. ✅ `profile.skillsRadar` - Invisible Labor page

### Low Priority (Nice to Have)

8. ✅ `analytics.impactTimeline` - Invisible Labor page

---

## Data Generation Tips

### Activity Heatmap (168 entries)

```python
def generate_activity_heatmap(username: str, days: int = 7):
    """
    Generate activity heatmap for the last 7 days

    Returns: List of {day, hour, intensity} objects
    """
    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    heatmap = []

    # Fetch user's activity timestamps from database
    activities = get_user_activities(username, days=7)

    for day_name in days_of_week:
        for hour in range(24):
            # Count activities for this day+hour combination
            count = count_activities_for_day_hour(activities, day_name, hour)

            # Normalize to 0-100 scale
            intensity = min(100, (count / max_activities_per_hour) * 100)

            heatmap.append({
                "day": day_name,
                "hour": hour,
                "intensity": round(intensity)
            })

    return heatmap
```

### Contributor Growth (3 arrays of 30 days each)

```python
def generate_contributor_growth(repo_ids: List[str], days: int = 30):
    """
    Generate contributor growth trends

    Returns: {total: [], new: [], returning: []}
    """
    growth = {"total": [], "new": [], "returning": []}

    for i in range(days):
        date = (datetime.now() - timedelta(days=days-i-1)).strftime("%Y-%m-%d")

        # Query contributor counts for this date
        total_contributors = count_contributors_up_to_date(repo_ids, date)
        new_contributors = count_new_contributors_on_date(repo_ids, date)
        returning_contributors = count_returning_contributors_on_date(repo_ids, date)

        growth["total"].append({"date": date, "value": total_contributors})
        growth["new"].append({"date": date, "value": new_contributors})
        growth["returning"].append({"date": date, "value": returning_contributors})

    return growth
```

### Cumulative Labor (30 days)

```python
def generate_cumulative_labor(username: str, days: int = 30):
    """
    Generate cumulative labor over time

    Returns: List of daily cumulative activity counts
    """
    cumulative = []
    totals = {"reviews": 0, "triage": 0, "mentorship": 0, "documentation": 0, "discussions": 0}

    for i in range(days):
        date = (datetime.now() - timedelta(days=days-i-1)).strftime("%Y-%m-%d")

        # Get activities for this date
        daily_activities = get_activities_for_date(username, date)

        # Add to cumulative totals
        totals["reviews"] += daily_activities["reviews"]
        totals["triage"] += daily_activities["triage"]
        totals["mentorship"] += daily_activities["mentorship"]
        totals["documentation"] += daily_activities["documentation"]
        totals["discussions"] += daily_activities["discussions"]

        cumulative.append({
            "date": date,
            **totals.copy()  # Use copy to avoid reference issues
        })

    return cumulative
```

---

## Testing Your Implementation

### 1. Test Each New Field

```bash
# Test the endpoint
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.burnout.trends'
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.sentiment.multiLineTrend'
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.profile.skillsRadar'
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.analytics'
```

### 2. Validate Data Counts

```bash
# Verify heatmap has 168 entries
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.analytics.activityHeatmap | length'
# Should return: 168

# Verify 30-day trends
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.burnout.trends.responseTime | length'
# Should return: 30

# Verify 90-day sentiment
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.sentiment.multiLineTrend.overall | length'
# Should return: 90
```

### 3. Validate Data Structure

```bash
# Check skillsRadar has exactly 6 skills
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.profile.skillsRadar | length'
# Should return: 6

# Check funnel has exactly 5 stages
curl http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer | jq '.analytics.issueResolutionFunnel | length'
# Should return: 5
```

---

## Complete Response Example

See `OPENAPI_SPEC_COMPLETE.md` for the full JSON structure with all fields.

---

## Next Steps

1. **Backend Team:**

   - Add the 8 new fields to your endpoint
   - Use the data generation tips above
   - Test using the curl commands
   - Verify all counts and structures

2. **Frontend Team:**

   - Wait for backend to add the fields
   - Then follow `FRONTEND_LOCAL_DATA_MAPPING.md` to update the code
   - Test each dashboard page

3. **Testing:**
   - Verify all charts display correctly
   - Check loading states
   - Check error handling
   - Verify performance (response time < 2 seconds)

---

## Questions?

If you need clarification on any field:

1. Check `OPENAPI_SPEC_COMPLETE.md` for the complete structure
2. Check `FRONTEND_LOCAL_DATA_MAPPING.md` for where each field is used
3. Look at the current frontend code to see how data is being generated locally
