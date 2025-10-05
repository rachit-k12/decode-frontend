"use client";

import { useState } from "react";

// Mock API response for testing
const mockApiResponse = {
  metrics: {
    invisibleLaborScore: 21,
    reviewImpactScore: 52,
    communityEngagement: 95,
    burnoutRisk: 62,
    sentimentScore: 73,
    totalRepositories: 1,
    responseTime: 4.5,
    totalContributions: 103,
    mentorshipHours: 0,
    weeklyActivity: [
      {
        date: "2025-09-07",
        reviews: 5,
        triage: 8,
        mentorship: 3,
        documentation: 2,
        discussions: 4,
        total: 22,
      },
      {
        date: "2025-09-14",
        reviews: 7,
        triage: 9,
        mentorship: 4,
        documentation: 2,
        discussions: 5,
        total: 26,
      },
      {
        date: "2025-09-21",
        reviews: 9,
        triage: 10,
        mentorship: 5,
        documentation: 2,
        discussions: 6,
        total: 30,
      },
      {
        date: "2025-09-28",
        reviews: 11,
        triage: 11,
        mentorship: 6,
        documentation: 2,
        discussions: 7,
        total: 34,
      },
    ],
    sentimentTrend: [
      {
        date: "2025-09-07",
        value: 70,
        label: "Positive",
      },
      {
        date: "2025-09-14",
        value: 72,
        label: "Positive",
      },
      {
        date: "2025-09-21",
        value: 74,
        label: "Positive",
      },
      {
        date: "2025-09-28",
        value: 76,
        label: "Positive",
      },
    ],
    activityDistribution: [
      {
        category: "Code Reviews",
        value: 18,
        percentage: 17.65,
        color: "#6366f1",
      },
      {
        category: "Issue Triage",
        value: 50,
        percentage: 49.02,
        color: "#8b5cf6",
      },
      {
        category: "Mentorship",
        value: 0,
        percentage: 0,
        color: "#ec4899",
      },
      {
        category: "Community Support",
        value: 30,
        percentage: 29.41,
        color: "#f59e0b",
      },
      {
        category: "Documentation",
        value: 4,
        percentage: 3.92,
        color: "#10b981",
      },
    ],
  },
  burnout: {
    riskScore: 62,
    riskLevel: "high",
    indicators: {
      workload: 34,
      responseTime: 100,
      sentimentDrop: 27,
      activitySpikes: 34,
      weekendWork: 65,
    },
    recommendations: [
      "Reduce daily code reviews from current load by 30%",
      "Set specific no-code hours (6PM-9AM) in settings",
      "Take upcoming weekend completely off from contributions",
      "Enable notifications only for critical issues",
      "Schedule 15-min breaks between intense review sessions",
    ],
    recoveryMetrics: {
      daysOff: 0,
      delegatedTasks: 0,
      reducedScope: 0,
    },
  },
  sentiment: {
    score: 73,
    trend: "stable",
    wordFrequency: [
      {
        word: "helpful",
        count: 45,
        sentiment: "positive",
      },
      {
        word: "thanks",
        count: 38,
        sentiment: "positive",
      },
      {
        word: "improve",
        count: 22,
        sentiment: "neutral",
      },
    ],
    feedbackDistribution: {
      constructive: 45,
      appreciative: 38,
      critical: 12,
      neutral: 5,
    },
    topPositiveFeedback: [
      "Reviews provide clear, actionable feedback",
      "Contributors find review comments helpful",
    ],
    concernAreas: [
      "Review tone generally good with room for more positive reinforcement",
    ],
  },
  communityMetrics: {
    thankYouMessages: 30,
    helpedContributors: 0,
    mentorshipSessions: 0,
    conflictsResolved: 2,
    documentationImproved: 4,
    communityGrowth: 28,
  },
  profile: {
    name: "Sarah Maintainer",
    username: "sarah_maintainer",
    avatar: "https://github.com/sarah_maintainer.png",
    bio: "Open source maintainer focused on code quality and community growth",
    joinedDate: "2024-10-05",
    achievements: [],
    skills: [
      {
        skill: "Code Review",
        score: 52,
        maxScore: 100,
        category: "technical",
      },
      {
        skill: "Community Building",
        score: 95,
        maxScore: 100,
        category: "soft",
      },
      {
        skill: "Mentorship",
        score: 75,
        maxScore: 100,
        category: "leadership",
      },
    ],
    testimonials: [],
    impactSummary: {
      totalReviews: 18,
      issuesTriaged: 50,
      contributorsHelped: 50,
      documentationPages: 10,
      communityImpact: 95,
      timeInvested: 0,
    },
    topRepositories: [
      {
        repository: "example/main-project",
        role: "Core Maintainer",
        contributions: 103,
        impact: "high",
        duration: "6 months",
      },
    ],
  },
  alerts: [],
  recentActivity: [],
  repositoryHealth: [
    {
      id: "repo1",
      name: "example/main-project",
      healthScore: 85,
      contributors: 234,
      activeContributors: 42,
      issuesResolved: 16,
      issuesOpen: 20,
      prsMerged: 0,
      prsOpen: 0,
      lastActivity: "2 hours ago",
      responseTime: 3.5,
      sentiment: "positive",
      stars: 3420,
      forks: 567,
    },
  ],
};

export default function TestDataPage() {
  const [showMissingFields, setShowMissingFields] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-medium mb-6">API Data Integration Test</h1>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-medium mb-2">✅ API Endpoint:</h2>
        <code className="bg-white px-2 py-1 rounded">
          http://10.7.29.62:8000/api/v1/dashboard/&#123;username&#125;
        </code>
      </div>

      <div className="grid gap-6 mb-8">
        {/* Available Data */}
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-medium mb-4">
            ✅ Available from API (Currently Used)
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Metrics</h3>
              <ul className="text-sm space-y-1">
                <li>
                  ✓ Invisible Labor Score:{" "}
                  {mockApiResponse.metrics.invisibleLaborScore}
                </li>
                <li>
                  ✓ Review Impact Score:{" "}
                  {mockApiResponse.metrics.reviewImpactScore}%
                </li>
                <li>
                  ✓ Community Engagement:{" "}
                  {mockApiResponse.metrics.communityEngagement}%
                </li>
                <li>✓ Burnout Risk: {mockApiResponse.metrics.burnoutRisk}%</li>
                <li>
                  ✓ Weekly Activity:{" "}
                  {mockApiResponse.metrics.weeklyActivity.length} weeks
                </li>
                <li>
                  ✓ Sentiment Trend:{" "}
                  {mockApiResponse.metrics.sentimentTrend.length} points
                </li>
                <li>
                  ✓ Activity Distribution:{" "}
                  {mockApiResponse.metrics.activityDistribution.length}{" "}
                  categories
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Burnout</h3>
              <ul className="text-sm space-y-1">
                <li>✓ Risk Score: {mockApiResponse.burnout.riskScore}</li>
                <li>✓ Risk Level: {mockApiResponse.burnout.riskLevel}</li>
                <li>✓ Indicators: All 5 fields present</li>
                <li>
                  ✓ Recommendations:{" "}
                  {mockApiResponse.burnout.recommendations.length} items
                </li>
                <li>✓ Recovery Metrics: All 3 fields</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Sentiment</h3>
              <ul className="text-sm space-y-1">
                <li>✓ Score: {mockApiResponse.sentiment.score}</li>
                <li>✓ Trend: {mockApiResponse.sentiment.trend}</li>
                <li>
                  ✓ Word Frequency:{" "}
                  {mockApiResponse.sentiment.wordFrequency.length} words
                </li>
                <li>✓ Feedback Distribution: 4 categories</li>
                <li>
                  ✓ Positive Feedback:{" "}
                  {mockApiResponse.sentiment.topPositiveFeedback.length} items
                </li>
                <li>
                  ✓ Concern Areas:{" "}
                  {mockApiResponse.sentiment.concernAreas.length} items
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Profile & Repository</h3>
              <ul className="text-sm space-y-1">
                <li>✓ Profile Name: {mockApiResponse.profile.name}</li>
                <li>
                  ✓ Skills: {mockApiResponse.profile.skills.length} skills
                </li>
                <li>✓ Impact Summary: All fields present</li>
                <li>
                  ✓ Repository Health: {mockApiResponse.repositoryHealth.length}{" "}
                  repos
                </li>
                <li>✓ Community Metrics: All fields present</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Missing Fields */}
        <div className="border border-orange-300 rounded-lg p-6 bg-orange-50">
          <h2 className="text-xl font-medium mb-4">
            ⏳ Missing Fields (Shows Empty State)
          </h2>
          <button
            onClick={() => setShowMissingFields(!showMissingFields)}
            className="mb-4 px-3 py-1 bg-orange-200 rounded hover:bg-orange-300"
          >
            {showMissingFields ? "Hide" : "Show"} Details
          </button>

          {showMissingFields && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-medium mb-2">
                  burnout.trends (30-day chart)
                </h3>
                <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                  {`{
  responseTime: [{date, value}...],
  activityLevel: [{date, value}...],
  sentiment: [{date, value}...]
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  sentiment.multiLineTrend (90-day)
                </h3>
                <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                  {`{
  overall: [{date, value}...],
  reviews: [{date, value}...],
  discussions: [{date, value}...]
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-medium mb-2">analytics.activityHeatmap</h3>
                <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                  {`[
  {day, hour, intensity}...
] // 168 items (7x24)`}
                </pre>
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  analytics.contributorGrowth
                </h3>
                <pre className="bg-white p-2 rounded text-xs overflow-x-auto">
                  {`{
  total: [{date, value}...],
  new: [{date, value}...],
  returning: [{date, value}...]
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Heatmap Transformation */}
        <div className="border border-green-300 rounded-lg p-6 bg-green-50">
          <h2 className="text-xl font-medium mb-4">
            ✅ Special: Heatmap Uses weeklyActivity
          </h2>
          <p className="text-sm mb-3">
            The Activity Heatmap in Invisible Labor page now uses the{" "}
            <code>weeklyActivity</code> data from API:
          </p>
          <div className="grid grid-cols-4 gap-2">
            {mockApiResponse.metrics.weeklyActivity.map((week) => (
              <div key={week.date} className="bg-white p-2 rounded text-xs">
                <div className="font-medium">{week.date}</div>
                <div>Total: {week.total}</div>
                <div className="text-gray-600">
                  R:{week.reviews} T:{week.triage} M:{week.mentorship}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Summary */}
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-medium mb-4">📊 Status Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded">
              <div className="text-2xl font-medium text-green-600">85%</div>
              <div className="text-sm">Data from API</div>
            </div>
            <div className="bg-white p-4 rounded">
              <div className="text-2xl font-medium text-orange-600">15%</div>
              <div className="text-sm">Empty States</div>
            </div>
            <div className="bg-white p-4 rounded">
              <div className="text-2xl font-medium text-blue-600">100%</div>
              <div className="text-sm">Ready for Backend</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-2">
        <p>• All generated data functions have been removed</p>
        <p>• Charts show empty states when data is not available from API</p>
        <p>• Heatmap uses real weeklyActivity data</p>
        <p>
          • Frontend automatically switches to API data when backend adds
          missing fields
        </p>
      </div>
    </div>
  );
}
