"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import {
  SentimentLineChart,
  MultiLineChart,
  DistributionPieChart,
} from "@/components/dashboard/ActivityChart";
import { FeedbackWordCloud } from "@/components/dashboard/FeedbackWordCloud";
import { useDashboardData } from "@/hooks/queries/useMaintainerData";
import { useUsername } from "@/contexts/UsernameContext";
import {
  Heart,
  TrendingUp,
  MessageSquare,
  Award,
  AlertCircle,
  Smile,
  Info,
} from "lucide-react";

// TODO: TEMPORARY FALLBACK - Backend needs to add sentiment.multiLineTrend field
// Once backend implements this per OPENAPI_SPEC_COMPLETE.md, remove this function
// and use data.sentiment.multiLineTrend from API

export default function SentimentAnalysis() {
  // Use the real API data with username from context
  const { username } = useUsername();
  const { data, isLoading, error } = useDashboardData(username);

  // Show message if no username is entered
  if (!username) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <Info className="h-16 w-16 text-gray-400" />
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-900 mb-2">
              No Username Selected
            </h2>
            <p className="text-gray-600">
              Please enter a GitHub username in the sidebar to view sentiment
              data
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-pulse text-muted-foreground">
            Loading sentiment data for {username}...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Handle error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96 space-y-4">
          <div className="text-red-500 text-center">
            <p className="text-sm">
              Error loading sentiment data for "{username}". Please try again.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const sentiment = data?.sentiment || {
    score: 0,
    trend: "stable",
    wordFrequency: [],
    feedbackDistribution: {
      constructive: 0,
      appreciative: 0,
      critical: 0,
      neutral: 0,
    },
    topPositiveFeedback: [],
    concernAreas: [],
  };

  const communityMetrics = data?.communityMetrics || {
    thankYouMessages: 0,
    helpedContributors: 0,
    mentorshipSessions: 0,
    conflictsResolved: 0,
    documentationImproved: 0,
    communityGrowth: 0,
  };

  // TODO: Once backend adds sentiment.multiLineTrend field, use it instead of generated data
  // Transform API data if available, otherwise use fallback
  const multiLineSentimentData = sentiment.multiLineTrend
    ? [
        ...sentiment.multiLineTrend.overall.map((item, idx) => ({
          date: item.date,
          overall: item.value,
          reviews: sentiment.multiLineTrend!.reviews[idx]?.value || 0,
          discussions: sentiment.multiLineTrend!.discussions[idx]?.value || 0,
        })),
      ]
    : [];

  // Prepare distribution data for pie chart
  const distributionData = [
    {
      category: "Constructive",
      value: sentiment.feedbackDistribution.constructive,
      percentage: sentiment.feedbackDistribution.constructive,
      color: "#059669",
    },
    {
      category: "Appreciative",
      value: sentiment.feedbackDistribution.appreciative,
      percentage: sentiment.feedbackDistribution.appreciative,
      color: "#2563EB",
    },
    {
      category: "Critical",
      value: sentiment.feedbackDistribution.critical,
      percentage: sentiment.feedbackDistribution.critical,
      color: "#DC2626",
    },
    {
      category: "Neutral",
      value: sentiment.feedbackDistribution.neutral,
      percentage: sentiment.feedbackDistribution.neutral,
      color: "#64748B",
    },
  ];

  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getSentimentLabel = (score: number) => {
    if (score >= 70) return "Positive";
    if (score >= 50) return "Neutral";
    return "Concerning";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">
              Sentiment Analysis & Community Health
            </h1>
          </div>
          <ExportButton pageName="sentiment-analysis" />
        </div>

        {/* Sentiment Gauge and Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Current Sentiment Gauge */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-sm text-muted-foreground">
              Current Sentiment Score
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-gray-200 dark:text-gray-800"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${sentiment.score * 2.51} 251`}
                    className={getSentimentColor(sentiment.score)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className={`text-3xl font-semibold ${getSentimentColor(sentiment.score)}`}
                  >
                    {sentiment.score}
                  </span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className={`text-sm ${getSentimentColor(sentiment.score)}`}>
                  {getSentimentLabel(sentiment.score)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Trend:{" "}
                  {sentiment.trend === "improving"
                    ? "↑ Improving"
                    : sentiment.trend === "declining"
                      ? "↓ Declining"
                      : "→ Stable"}
                </p>
              </div>
            </div>
          </div>

          {/* Community Response Metrics */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Thank You Messages
                  </p>
                  <p className="text-2xl font-semibold">
                    {communityMetrics.thankYouMessages}
                  </p>
                </div>
                <Heart className="h-8 w-8 text-rose-400/60" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                From community interactions
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Appreciation Rate
                  </p>
                  <p className="text-2xl font-semibold">
                    {sentiment.feedbackDistribution.appreciative}%
                  </p>
                </div>
                <Award className="h-8 w-8 text-amber-400/60" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Above average
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Community Growth
                  </p>
                  <p className="text-2xl font-semibold">
                    {communityMetrics.communityGrowth}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400/60" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                New community members
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Sentiment Score
                  </p>
                  <p className="text-2xl font-semibold">{sentiment.score}%</p>
                </div>
                <Smile className="h-8 w-8 text-emerald-400/60" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Highly constructive
              </p>
            </div>
          </div>
        </div>

        {/* Word Cloud */}
        <ChartContainer
          title="Feedback Word Cloud"
          subtitle="Most frequently mentioned terms in community feedback"
        >
          <FeedbackWordCloud words={sentiment.wordFrequency} />
        </ChartContainer>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Multi-line Trend Chart */}
          <ChartContainer
            title="Sentiment Trend"
            subtitle="Sentiment evolution over time"
          >
            {data?.metrics?.sentimentTrend &&
            data.metrics.sentimentTrend.length > 0 ? (
              <SentimentLineChart data={data.metrics.sentimentTrend} />
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                No sentiment trend data available
              </div>
            )}
          </ChartContainer>

          {/* Feedback Distribution */}
          <ChartContainer
            title="Feedback Distribution"
            subtitle="Breakdown of feedback types received"
          >
            <DistributionPieChart data={distributionData} />
          </ChartContainer>
        </div>

        {/* Positive Feedback Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartContainer
            title="Top Positive Feedback"
            subtitle="Recent appreciative messages from the community"
          >
            <div className="space-y-3 p-4">
              {sentiment.topPositiveFeedback.map((feedback, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-emerald-50 p-3 border border-emerald-200"
                >
                  <Heart className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <p className="text-xs text-emerald-900">{feedback}</p>
                </div>
              ))}
            </div>
          </ChartContainer>

          <ChartContainer
            title="Areas of Concern"
            subtitle="Feedback areas that may need attention"
          >
            <div className="space-y-3 p-4">
              {sentiment.concernAreas.map((concern, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-orange-50 p-3 border border-orange-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 text-orange-600" />
                  <p className="text-xs text-orange-900">{concern}</p>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

        {/* Community Health Indicators */}
        <ChartContainer
          title="Community Health Indicators"
          subtitle="Key metrics for maintaining a healthy project environment"
        >
          <div className="grid gap-4 p-4 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Community Engagement
                </span>
                <span className="text-sm">
                  {data?.metrics?.communityEngagement || 0}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width: `${data?.metrics?.communityEngagement || 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Review Impact Score
                </span>
                <span className="text-sm">
                  {data?.metrics?.reviewImpactScore || 0}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${data?.metrics?.reviewImpactScore || 0}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Sentiment Score
                </span>
                <span className="text-sm">{sentiment.score}%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-amber-500"
                  style={{ width: `${sentiment.score}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Documentation Improved
                </span>
                <span className="text-sm">
                  {communityMetrics.documentationImproved} pages
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-purple-500"
                  style={{
                    width: `${Math.min(100, communityMetrics.documentationImproved * 10)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>
    </DashboardLayout>
  );
}
