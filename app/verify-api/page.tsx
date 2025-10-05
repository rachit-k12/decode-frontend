"use client";

import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function VerifyAPIPage() {
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch directly from the API
    fetch("http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer")
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-medium mb-4">Loading API Data...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-medium mb-4 text-red-600">
          Error Loading API
        </h1>
        <p>{error}</p>
      </div>
    );
  }

  const verificationChecks = [
    {
      category: "Sentiment Page Metrics",
      checks: [
        {
          field: "Thank You Messages",
          expected: 30,
          actual: apiData?.communityMetrics?.thankYouMessages,
          path: "communityMetrics.thankYouMessages",
        },
        {
          field: "Appreciation Rate",
          expected: 38,
          actual: apiData?.sentiment?.feedbackDistribution?.appreciative,
          path: "sentiment.feedbackDistribution.appreciative",
        },
        {
          field: "Community Growth",
          expected: 28,
          actual: apiData?.communityMetrics?.communityGrowth,
          path: "communityMetrics.communityGrowth",
        },
        {
          field: "Sentiment Score",
          expected: 73,
          actual: apiData?.sentiment?.score,
          path: "sentiment.score",
        },
        {
          field: "Community Engagement",
          expected: 95,
          actual: apiData?.metrics?.communityEngagement,
          path: "metrics.communityEngagement",
        },
        {
          field: "Review Impact Score",
          expected: 52,
          actual: apiData?.metrics?.reviewImpactScore,
          path: "metrics.reviewImpactScore",
        },
      ],
    },
    {
      category: "Burnout Page Metrics",
      checks: [
        {
          field: "Burnout Risk Score",
          expected: 62,
          actual: apiData?.burnout?.riskScore,
          path: "burnout.riskScore",
        },
        {
          field: "Risk Level",
          expected: "high",
          actual: apiData?.burnout?.riskLevel,
          path: "burnout.riskLevel",
        },
        {
          field: "Workload Indicator",
          expected: 34,
          actual: apiData?.burnout?.indicators?.workload,
          path: "burnout.indicators.workload",
        },
        {
          field: "Recommendations Count",
          expected: 5,
          actual: apiData?.burnout?.recommendations?.length,
          path: "burnout.recommendations",
        },
      ],
    },
    {
      category: "Charts Data Availability",
      checks: [
        {
          field: "Weekly Activity Data",
          expected: 4,
          actual: apiData?.metrics?.weeklyActivity?.length,
          path: "metrics.weeklyActivity",
        },
        {
          field: "Sentiment Trend Data",
          expected: 4,
          actual: apiData?.metrics?.sentimentTrend?.length,
          path: "metrics.sentimentTrend",
        },
        {
          field: "Activity Distribution",
          expected: 5,
          actual: apiData?.metrics?.activityDistribution?.length,
          path: "metrics.activityDistribution",
        },
        {
          field: "Word Frequency",
          expected: 3,
          actual: apiData?.sentiment?.wordFrequency?.length,
          path: "sentiment.wordFrequency",
        },
        {
          field: "Skills Data",
          expected: 6,
          actual: apiData?.profile?.skills?.length,
          path: "profile.skills",
        },
      ],
    },
    {
      category: "Repository Health",
      checks: [
        {
          field: "Repository Count",
          expected: 1,
          actual: apiData?.repositoryHealth?.length,
          path: "repositoryHealth",
        },
        {
          field: "Health Score",
          expected: 85,
          actual: apiData?.repositoryHealth?.[0]?.healthScore,
          path: "repositoryHealth[0].healthScore",
        },
        {
          field: "Contributors",
          expected: 234,
          actual: apiData?.repositoryHealth?.[0]?.contributors,
          path: "repositoryHealth[0].contributors",
        },
      ],
    },
    {
      category: "Missing Fields (Backend TODO)",
      checks: [
        {
          field: "Burnout Trends",
          expected: "Should have data",
          actual: apiData?.burnout?.trends ? "Available" : "Not Available",
          path: "burnout.trends",
          isOptional: true,
        },
        {
          field: "Sentiment Multi-Line Trend",
          expected: "Should have data",
          actual: apiData?.sentiment?.multiLineTrend
            ? "Available"
            : "Not Available",
          path: "sentiment.multiLineTrend",
          isOptional: true,
        },
        {
          field: "Analytics Object",
          expected: "Should have data",
          actual: apiData?.analytics ? "Available" : "Not Available",
          path: "analytics",
          isOptional: true,
        },
      ],
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-medium mb-2">API Data Verification</h1>
      <p className="text-gray-600 mb-8">
        Verifying that data from API is correctly displayed in the UI
      </p>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h2 className="text-lg font-medium mb-2">API Endpoint:</h2>
        <code className="bg-white px-2 py-1 rounded">
          http://10.7.29.62:8000/api/v1/dashboard/sarah_maintainer
        </code>
      </div>

      {verificationChecks.map((category) => (
        <div key={category.category} className="mb-8">
          <h2 className="text-xl font-medium mb-4 pb-2 border-b">
            {category.category}
          </h2>
          <div className="space-y-2">
            {category.checks.map((check, idx) => {
              const isCorrect = check.actual === check.expected;
              const icon = check.isOptional ? (
                <AlertCircle className="h-5 w-5 text-orange-500" />
              ) : isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              );

              return (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    check.isOptional
                      ? "bg-orange-50"
                      : isCorrect
                        ? "bg-green-50"
                        : "bg-red-50"
                  }`}
                >
                  {icon}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{check.field}:</span>
                      <code className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                        {check.path}
                      </code>
                    </div>
                    <div className="text-sm mt-1">
                      <span className="text-gray-600">Expected: </span>
                      <span className="font-medium">
                        {JSON.stringify(check.expected)}
                      </span>
                      <span className="text-gray-600 mx-2">|</span>
                      <span className="text-gray-600">Actual: </span>
                      <span
                        className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}
                      >
                        {JSON.stringify(check.actual)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Summary</h3>
        <ul className="space-y-1 text-sm">
          <li>✅ All hardcoded values have been replaced with API data</li>
          <li>✅ Charts show "not available" message for missing data</li>
          <li>✅ Heatmap uses weeklyActivity data from API</li>
          <li>⚠️ Some charts waiting for backend to add missing fields</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium mb-2">How to Test</h3>
        <ol className="space-y-1 text-sm list-decimal list-inside">
          <li>Go to http://localhost:3005</li>
          <li>Enter username: sarah_maintainer</li>
          <li>
            Navigate through all pages (Dashboard, Burnout, Sentiment, etc.)
          </li>
          <li>
            Verify all values match what's shown in this verification page
          </li>
        </ol>
      </div>
    </div>
  );
}
