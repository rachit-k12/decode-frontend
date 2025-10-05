# Dashboard Analytics & Metrics Guide

This comprehensive guide documents all analytics and metrics displayed across the Maintainer Dashboard application, organized by each sidebar tab.

---

## 1. Overview (Main Dashboard)

**Route:** `/dashboard`

**Purpose:** Provides a high-level snapshot of maintainer health and activity across all tracked metrics.

### Key Performance Indicators (KPIs)

#### Primary Metrics Cards

- **Invisible Labor Score**: Numerical score (0-100+) representing non-code contributions
  - Shows 30-day trend with percentage change
  - Color-coded: Blue
- **Review Impact**: Percentage score (0-100%) measuring code review quality and effectiveness
  - Shows trend percentage
  - Color-coded: Green
- **Community Engagement**: Percentage score (0-100%) of active participation
  - Measures interaction with community members
  - Color-coded: Purple
- **Burnout Risk**: Percentage score (0-100%) indicating risk level
  - Shows risk level: Low/Medium/High/Critical
  - Color-coded: Orange
  - Lower is better

#### Secondary Metrics

- **Response Time**: Average hours for first response to issues/PRs
  - Time-based metric
- **Total Contributions**: Lifetime count of all contributions
  - Includes reviews, triage, mentorship, docs, discussions
- **Mentorship Hours**: Quarterly count of mentorship activities
  - Time invested in helping contributors

### Visualizations

#### Weekly Activity Breakdown (Bar Chart)

- Shows distribution of activities over past 7 days
- Categories:
  - Code Reviews
  - Issue Triage
  - Mentorship Sessions
  - Documentation Updates
  - Community Discussions

#### Activity Distribution (Pie Chart)

- Time allocation across different activity types
- Percentage breakdown of effort distribution

#### 30-Day Sentiment Trend (Line Chart)

- Community sentiment score over time
- Range: 0-100
- Tracks feedback patterns and community health

### Alerts & Notifications Panel

- High burnout risk warnings
- Review impact achievements
- Community engagement milestones
- Custom alerts from API

---

## 2. Invisible Labor Analytics

**Route:** `/dashboard/invisible-labor`

**Purpose:** Comprehensive analysis of non-code contributions that are typically undervalued or untracked.

### Key Invisible Work Metrics

#### Quick Stats Cards (6 metrics)

1. **Reviews**: Total number of code reviews completed
2. **Triage**: Issues organized and categorized
3. **Mentorship**: Contributors helped with onboarding/guidance
4. **Documentation**: Pages improved or created
5. **Discussions**: Community thank you messages received
6. **Impact Score**: Overall invisible labor rating

### Visualizations

#### Daily Activity Heat Map

- Calendar-style visualization showing activity intensity
- Data points:
  - Date
  - Day of week
  - Activity count per day
  - Activity level (1-4 scale)
  - Color-coded intensity (blue gradient)
- Interactive hover tooltips with detailed counts

#### Cumulative Labor Over Time (Stacked Area Chart)

- 30-day trend of different contribution types
- Shows growth/decline patterns
- Categories match weekly activity breakdown

#### Multi-dimensional Skills Assessment (Radar Chart)

- Expertise evaluation across activities:
  - Code Review Quality
  - Issue Triage Efficiency
  - Mentorship Effectiveness
  - Documentation Skills
  - Community Management
- Scores out of 100 for each dimension

#### Major Contribution Timeline

- Chronological list of significant contributions
- Each event includes:
  - Date
  - Type (review/mentorship/triage/documentation)
  - Title/description
  - Impact score (0-100)
  - Community responses count
  - Points earned

### Metrics Details

- **Total Reviews**: Cumulative count from profile.impactSummary
- **Issues Triaged**: Count of issues organized/labeled
- **Mentorship Sessions**: Number of 1-on-1 or group mentoring events
- **Documentation Improved**: Page count of docs created/edited
- **Thank You Messages**: Appreciative feedback from community
- **Overall Impact Score**: Composite score from all invisible work

---

## 3. Sentiment Analysis & Community Health

**Route:** `/dashboard/sentiment`

**Purpose:** Monitor community feedback patterns and maintain positive project environments.

### Primary Metrics

#### Current Sentiment Score (Gauge)

- Score: 0-100
- Visual: Circular progress gauge
- Color-coded:
  - Green (70-100): Positive
  - Yellow (50-69): Neutral
  - Red (0-49): Concerning
- Trend indicator: Improving/Stable/Declining

#### Community Response Metrics

- **Thank You Messages**: Count of appreciative community messages
- **Appreciation Rate**: Percentage of appreciative feedback
- **Community Growth**: New members count
- **Sentiment Score**: Duplicate display for quick reference

### Sentiment Analysis Components

#### Feedback Word Cloud

- Most frequently mentioned terms in feedback
- Color-coded by sentiment:
  - Green: Positive words
  - Red: Negative words
  - Gray: Neutral words
- Size proportional to frequency

#### Feedback Distribution (Pie Chart)

Breakdown by type:

- **Constructive**: Helpful, improvement-focused feedback
- **Appreciative**: Thank yous and praise
- **Critical**: Negative or complaint feedback
- **Neutral**: Informational or neutral comments

Each shown as percentage with color coding

### Sentiment Trends

#### Sentiment Trend Over Time (Line Chart)

- 30-day evolution of sentiment score
- Tracks overall community mood
- Helps identify declining sentiment early

#### Top Positive Feedback (List)

- Recent appreciative messages
- Quotes from community members
- Green-highlighted cards

#### Areas of Concern (List)

- Feedback requiring attention
- Potential issues flagged
- Orange-highlighted warning cards

### Community Health Indicators

Progress bars for:

- **Community Engagement**: Percentage (0-100%)
- **Review Impact Score**: Percentage (0-100%)
- **Sentiment Score**: Percentage (0-100%)
- **Documentation Improved**: Pages count with visual bar

---

## 4. Burnout Risk Assessment

**Route:** `/dashboard/burnout`

**Purpose:** Monitor workload patterns and provide personalized recommendations for sustainable maintenance.

### Overall Burnout Risk

#### Risk Score Gauge

- Score: 0-100% (higher = more risk)
- Visual: Circular progress indicator
- Risk Levels:
  - Low (0-29%): Green
  - Medium (30-49%): Yellow
  - High (50-69%): Orange
  - Critical (70-100%): Red

### Risk Indicators (Detailed Breakdown)

Five key indicators with individual scores and progress bars:

1. **Workload**
   - Percentage of capacity (0-100%)
   - Measures overall activity level
2. **Response Time**
   - Percentage indicator of delayed responses
   - Higher = longer delays = more risk
3. **Activity Spikes**
   - Percentage of activity variations
   - Detects unsustainable bursts of work
4. **Weekend Work**

   - Percentage of work done on weekends
   - Lower is healthier (should be <30%)

5. **Sentiment Drop**
   - Measures decline in community feedback quality

### Recovery Progress Metrics

Three recovery tracking cards:

- **Days Off Taken**: Count in last 30 days
- **Tasks Delegated**: Count delegated this month
- **Scope Reduced**: Percentage reduction from peak load

### Visualizations

#### 30-Day Burnout Indicators (Multi-line Chart)

Three trend lines:

- **Response Time (hrs)**: Red line - average response time
- **Activity Level (%)**: Orange line - work intensity
- **Sentiment Score**: Green line - community mood

Helps identify correlations between workload and sentiment

#### Personalized Recommendations (List)

- Actionable steps to reduce burnout
- Generated based on current indicators
- Examples:
  - "Take 2 consecutive days off this week"
  - "Delegate 30% of code reviews"
  - "Set auto-responder for issues"
  - "Schedule focus time blocks"

### Early Warning Signs

Grid of 6 indicators with status:

- **Increasing response times**: Status with trend data
- **Weekend activity spike**: Alert if 3+ consecutive weekends
- **Sentiment decline**: Community feedback tracking
- **Late night commits**: Commits after midnight count
- **Break frequency**: Days without >2 hour breaks
- **Issue backlog**: Backlog size stability

Each marked as:

- OK (green): Healthy status
- Warning (yellow): Needs attention
- Alert (red): Immediate action needed

---

## 5. Repository Health Dashboard

**Route:** `/dashboard/repositories`

**Purpose:** Monitor health metrics and contributor patterns across all maintained repositories.

### Repository Overview Cards

Each repository displays:

#### Health Score & Badge

- Score: 0-100
- Badges:
  - Healthy (80-100): Green
  - Needs Attention (60-79): Yellow
  - Critical (<60): Red

#### Quick Stats

- **Stars**: GitHub stars count
- **Forks**: Fork count
- **Contributors**: Active contributor count
- **Response Time**: Average first response in hours

#### Issues & Pull Requests

Two sub-cards per repo:

- **Issues**:
  - Open count (primary)
  - Resolved count (green secondary)
- **Pull Requests**:
  - Open count (primary)
  - Merged count (green secondary)

#### Community Sentiment Indicator

- Status: Positive/Neutral/Negative
- Icon-based with color coding:
  - Green check: Positive
  - Yellow activity: Neutral
  - Red X: Negative

### Repository Sorting Options

- Sort by Health Score (default)
- Sort by Recent Activity
- Sort by Contributor Count

### Repository Health Matrix

Multi-dimensional assessment grid showing 4 metrics per repository:

1. **Activity Score**: 0-100% (recent commit/PR frequency)
2. **Community Score**: Same as health score
3. **Issues Resolution Rate**: % of resolved vs open issues
4. **Response Score**: 0-100% (based on response time, inverted)

Each with color-coded progress bar

### Visualizations

#### Contributor Growth Trends (Multi-line Chart)

Three trend lines:

- **Total Contributors**: Blue - overall count
- **New Contributors**: Green - first-time contributors
- **Returning Contributors**: Purple - repeat contributors

Tracks contributor retention and onboarding success

#### Issue Resolution Funnel

Five-stage funnel showing:

1. **Created**: Issues opened
2. **Triaged**: Issues categorized
3. **In Progress**: Actively being worked on
4. **In Review**: PR submitted
5. **Resolved**: Closed/merged

Each stage shows:

- Count
- Percentage
- Width proportional to count

---

## 6. Contribution Profile

**Route:** `/dashboard/profile`

**Purpose:** Comprehensive maintainer CV with achievements and impact metrics for professional sharing.

### Profile Header

- Profile avatar (generated gradient)
- Name and username
- Bio/description
- Joined date
- Quick stats:
  - Contributors helped count
  - Total reviews count

### Impact Summary Cards (6 metrics)

1. **Code Reviews**: Total reviews completed
2. **Issues Triaged**: Total issues organized
3. **Contributors Helped**: Mentorship count
4. **Docs Improved**: Documentation page count
5. **Community Impact**: Percentage score (0-100%)
6. **Hours Invested**: Time commitment tracking

### Achievements & Recognition

Badge system with levels:

- **Bronze**: Entry-level achievements
- **Silver**: Intermediate milestones
- **Gold**: Advanced accomplishments
- **Platinum**: Exceptional achievements

Each achievement includes:

- Icon (dynamic based on type)
- Title
- Description
- Level badge
- Earned date
- Category

### Skill Assessment

Detailed breakdown of maintainer capabilities:

#### Skills with Progress Bars

Each skill shows:

- Skill name
- Category badge (Technical/Soft/Leadership)
- Score out of max score (e.g., 88/100)
- Color-coded progress bar with gradient
- Category colors:
  - Blue: Technical skills
  - Green: Soft skills
  - Purple: Leadership skills

#### Skill Category Summaries

Three aggregate scores:

- **Technical**: Average of technical skills
- **Soft Skills**: Average of interpersonal skills
- **Leadership**: Average of leadership abilities

### Key Repository Contributions

List of primary projects with:

- Repository name
- Role (e.g., "Core Maintainer", "Contributor")
- Contributions count
- Impact level badge (High/Medium/Low)
- Duration of involvement
- Progress bar showing contribution volume

### Community Testimonials

Grid of feedback cards showing:

- Quote/testimonial content
- Author name and avatar
- Repository context
- Date of testimonial

### Career Timeline

Chronological visualization of milestones:

- Date (YYYY-MM format)
- Event description
- Type indicator:
  - Milestone (blue): Major achievements
  - Achievement (green): Accomplishments
  - Start (purple): Beginning points
- Emoji icon per event
- Vertical timeline with gradient line

Examples:

- Reached 1000+ code reviews
- Became core maintainer
- Mentored 100th contributor
- Led major release
- Started OSS contributions

### Export Options

Three export formats:

1. **Export as PDF**: Download professional PDF report
2. **LinkedIn Format**: Copy formatted text for LinkedIn
3. **Shareable Link**: Generate public profile URL

Additional sharing:

- Share button (general social share)
- Direct LinkedIn integration (planned)
- Copy public URL (planned)

---

## 7. Activity Timeline (Bonus Feature)

**Route:** `/dashboard/timeline`

**Purpose:** Interactive timeline of contributions with detailed activity breakdowns.

### Timeline Controls

- **Date Navigation**: Previous/Next day buttons
- **Current Date Display**: Selected date
- **Zoom Controls**: 50-200% zoom levels
- **Full Screen Toggle**: Maximize view
- **Activity Filter**: Dropdown to filter by type
  - All Activities
  - Code Reviews
  - Issue Triage
  - Mentorship
  - Documentation
  - Discussions
  - Releases

### Sprint Overview

Visual sprint markers showing:

- Sprint name (e.g., "Sprint 42")
- Start and end dates
- Status:
  - Completed (green)
  - Active (blue)
  - Planned (gray)

### Interactive Activity Timeline

24-hour horizontal timeline with:

- Hour markers (0:00 - 23:00)
- Activity events as circular badges
- Color-coded by type:
  - Blue: Code Reviews
  - Green: Issue Triage
  - Purple: Mentorship
  - Orange: Documentation
  - Pink: Discussions
  - Indigo: Releases

#### Event Details (on hover)

- Event title
- Description
- Exact timestamp
- Impact score
- Linked PR number (if applicable)
- Linked issue number (if applicable)

### 24-Hour Activity Distribution

Hourly breakdown showing:

- Hour of day (0-23)
- Stacked horizontal bars with activity types
- Activity counts per hour
- Color-coded segments:
  - Blue: Reviews
  - Green: Triage
  - Purple: Mentorship
  - Amber: Documentation
  - Pink: Discussions

Legend included for all activity types

### Collaboration Network

Network visualization showing:

- Central node: You
- Connected nodes: Frequent collaborators
- Edge thickness: Interaction frequency
- Labels: Collaborator names and interaction counts

### Contribution Flow Analysis

Five-stage funnel showing work progression:

1. **Issues Created**: Initial work items
2. **In Review**: Under peer review
3. **Changes Requested**: Feedback received
4. **Approved**: Ready to merge
5. **Merged**: Completed work

Each stage displays:

- Count of items
- Visual bar height proportional to count
- Color gradient from red to blue
- Arrow connectors between stages

---

## Data Sources & API Integration

### Primary Data Endpoints

All dashboard tabs consume data from the unified API endpoint:

```
GET /api/maintainer/{username}
```

### Response Structure

```json
{
  "profile": { ... },           // Profile information
  "metrics": { ... },           // Overview metrics
  "sentiment": { ... },         // Sentiment analysis
  "burnout": { ... },          // Burnout indicators
  "repositoryHealth": [ ... ], // Repository data
  "communityMetrics": { ... }, // Community stats
  "analytics": { ... },        // Advanced analytics
  "alerts": [ ... ]            // System alerts
}
```

### Real-time Updates

- Data fetched via TanStack Query v5
- Automatic caching and revalidation
- Loading states for all components
- Error handling with user-friendly messages

---

## Color Coding System

### Risk Levels

- **Green**: Healthy, positive, low risk (0-29% or 70-100% depending on metric)
- **Yellow**: Needs attention, neutral, medium risk (30-49% or 50-69%)
- **Orange**: Warning, high risk (50-69%)
- **Red**: Critical, negative, very high risk (70-100%)

### Activity Types

- **Blue**: Code Reviews, Primary actions
- **Green**: Issue Triage, Success states
- **Purple**: Mentorship, Leadership
- **Orange/Amber**: Documentation
- **Pink**: Discussions, Community
- **Indigo**: Releases, Special events

### Impact Levels

- **High Impact**: Green badges
- **Medium Impact**: Yellow badges
- **Low Impact**: Gray badges

---

## Export & Sharing Features

### Available on All Pages

- **Export Button**: Generate PDF of current page
- Page-specific naming (e.g., "dashboard-overview.pdf")

### Profile-Specific Exports

- **PDF Download**: Professional CV format
- **LinkedIn Format**: Formatted text for posts
- **Shareable URL**: Public profile link
- **Social Sharing**: General share button

---

## Mobile Responsiveness

All dashboards are optimized for mobile devices with:

- Responsive grid layouts (1-6 columns based on screen size)
- Touch-friendly interactions
- Collapsible sidebars
- Mobile navigation header
- Optimized chart rendering

### Breakpoints

- Mobile: < 768px (1-2 columns)
- Tablet: 768px - 1024px (2-3 columns)
- Desktop: > 1024px (3-6 columns)

---

## Key Performance Indicators Summary

### Most Important Metrics to Monitor

1. **Burnout Risk Score**: Primary health indicator
2. **Sentiment Score**: Community health
3. **Invisible Labor Score**: Comprehensive contribution tracking
4. **Repository Health Scores**: Project vitality
5. **Response Time**: Maintainer responsiveness
6. **Community Engagement**: Active participation level

### Recommended Monitoring Frequency

- **Daily**: Burnout indicators, response time, alerts
- **Weekly**: Activity distribution, sentiment trends
- **Monthly**: Profile metrics, achievement progress, repository health
- **Quarterly**: Long-term trends, skill development, impact summary

---

## Additional Features

### Empty States

All pages handle missing data gracefully with:

- Informative messages
- Icon illustrations
- Guidance on what to do next

### Error States

Network or API errors show:

- Error icon
- Clear error message
- Retry guidance

### Loading States

- Skeleton screens (where implemented)
- Spinner animations
- Loading text with username

### Accessibility

- Keyboard navigation support
- Screen reader friendly
- ARIA labels on interactive elements
- Color contrast compliance (WCAG AA)
- Focus indicators

---

## Future Enhancements (Roadmap)

Based on TODO comments in code:

1. **Backend Implementation Needed**:

   - `sentiment.multiLineTrend` data
   - `burnout.trends` historical data
   - `analytics.contributorGrowth` detailed tracking
   - `analytics.issueResolutionFunnel` funnel data

2. **Coming Soon Features**:
   - LinkedIn direct sharing
   - Public profile URLs
   - Real-time collaboration network
   - Advanced filtering on timeline
   - Custom date ranges for all charts

---

## Technical Notes

### State Management

- React Context for username sharing
- TanStack Query for data fetching
- Local state for UI interactions

### Chart Library

- Recharts for most visualizations
- Custom SVG for radar charts
- CSS for progress bars and gauges

### Styling

- Tailwind CSS utility classes
- CSS custom properties for theming
- Gradient backgrounds for visual appeal
- Consistent spacing scale (4px base unit)

---

_This guide is current as of the application state and will be updated as features evolve._
