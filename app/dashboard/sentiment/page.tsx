"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import {
  SentimentLineChart,
  MultiLineChart,
  DistributionPieChart,
} from "@/components/dashboard/ActivityChart";
import { mockSentimentAnalysis } from "@/lib/mock-data";
import {
  Heart,
  TrendingUp,
  MessageSquare,
  Award,
  AlertCircle,
  Smile,
} from "lucide-react";

// Generate multi-line sentiment data
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

export default function SentimentAnalysis() {
  const sentiment = mockSentimentAnalysis;

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
            <h1 className="text-3xl font-medium tracking-tight">
              Sentiment Analysis & Community Health
            </h1>
            <p className="text-muted-foreground">
              Monitor community feedback patterns and maintain positive project
              environments
            </p>
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
                  <p className="text-2xl font-semibold">234</p>
                </div>
                <Heart className="h-8 w-8 text-rose-400/60" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                +12% from last month
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Appreciation Rate
                  </p>
                  <p className="text-2xl font-semibold">78%</p>
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
                    Active Discussions
                  </p>
                  <p className="text-2xl font-semibold">42</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400/60" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                8 require response
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Response Quality
                  </p>
                  <p className="text-2xl font-semibold">92%</p>
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
          <div className="flex flex-wrap gap-2 p-6">
            {sentiment.wordFrequency.map((word) => {
              const size = Math.max(0.75, Math.min(2, word.count / 20));
              const color =
                word.sentiment === "positive"
                  ? "text-emerald-500"
                  : word.sentiment === "negative"
                    ? "text-rose-500"
                    : "text-slate-500";

              return (
                <span
                  key={word.word}
                  className={`inline-block px-2 py-1 ${color} font-normal`}
                  style={{ fontSize: `${size}rem` }}
                >
                  {word.word}
                </span>
              );
            })}
          </div>
        </ChartContainer>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Multi-line Trend Chart */}
          <ChartContainer
            title="90-Day Sentiment Evolution"
            subtitle="Sentiment trends across different interaction types"
          >
            <MultiLineChart
              data={multiLineSentimentData}
              lines={[
                { dataKey: "overall", color: "#3B82F6", name: "Overall" },
                { dataKey: "reviews", color: "#10B981", name: "Code Reviews" },
                {
                  dataKey: "discussions",
                  color: "#F59E0B",
                  name: "Discussions",
                },
              ]}
            />
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
                  New Contributor Retention
                </span>
                <span className="text-sm">72%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div className="h-full w-[72%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Issue Resolution Satisfaction
                </span>
                <span className="text-sm">85%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div className="h-full w-[85%] rounded-full bg-blue-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Code Review Positivity
                </span>
                <span className="text-sm">68%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div className="h-full w-[68%] rounded-full bg-amber-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Conflict Resolution Rate
                </span>
                <span className="text-sm">94%</span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div className="h-full w-[94%] rounded-full bg-purple-500" />
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>
    </DashboardLayout>
  );
}
