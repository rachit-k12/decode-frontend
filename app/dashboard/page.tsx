"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import {
  ActivityBarChart,
  DistributionPieChart,
  SentimentLineChart,
} from "@/components/dashboard/ActivityChart";
import { useDashboardData } from "@/hooks/queries/useMaintainerData";
import { useUsername } from "@/contexts/UsernameContext";
import {
  Eye,
  TrendingUp,
  Users,
  AlertTriangle,
  Clock,
  GitPullRequest,
  MessageSquare,
  BookOpen,
  Info,
} from "lucide-react";

export default function DashboardOverview() {
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
              Welcome to Maintainer Dashboard
            </h2>
            <p className="text-gray-600">
              Please enter a GitHub username in the sidebar to view maintainer
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
            Loading dashboard data for {username}...
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
            <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Error loading dashboard data
            </h3>
            <p className="text-sm">
              Unable to load data for user "{username}". Please check the
              username and try again.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Use the fetched data, fallback to empty object if no data
  const metrics = data?.metrics || {
    invisibleLaborScore: 0,
    reviewImpactScore: 0,
    communityEngagement: 0,
    burnoutRisk: 0,
    responseTime: 0,
    totalContributions: 0,
    mentorshipHours: 0,
    weeklyActivity: [],
    activityDistribution: [],
    sentimentTrend: [],
  };

  const alerts = data?.alerts || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">
              Dashboard Overview
            </h1>
          </div>
          <ExportButton pageName="dashboard-overview" />
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Invisible Labor Score"
            value={metrics.invisibleLaborScore}
            trend={12}
            trendDirection="up"
            subtitle="Last 30 days"
            icon={<Eye className="h-5 w-5" />}
            color="blue"
          />
          <MetricCard
            title="Review Impact"
            value={`${metrics.reviewImpactScore}%`}
            trend={8}
            trendDirection="up"
            subtitle="Quality score"
            icon={<GitPullRequest className="h-5 w-5" />}
            color="green"
          />
          <MetricCard
            title="Community Engagement"
            value={`${metrics.communityEngagement}%`}
            trend={5}
            trendDirection="up"
            subtitle="Active participation"
            icon={<Users className="h-5 w-5" />}
            color="purple"
          />
          <MetricCard
            title="Burnout Risk"
            value={`${metrics.burnoutRisk}%`}
            trend={3}
            trendDirection="down"
            subtitle={`Risk level: ${data?.burnout?.riskLevel || "Unknown"}`}
            icon={<AlertTriangle className="h-5 w-5" />}
            color="orange"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-2 px-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-2xl font-semibold">
                  {metrics.responseTime} hrs
                </p>
                <p className="text-xs text-muted-foreground">
                  Avg. first response
                </p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground/40" />
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Contributions
                </p>
                <p className="text-2xl font-semibold">
                  {metrics.totalContributions.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">All time</p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground/40" />
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Mentorship Hours
                </p>
                <p className="text-2xl font-semibold">
                  {metrics.mentorshipHours}
                </p>
                <p className="text-xs text-muted-foreground">This quarter</p>
              </div>
              <BookOpen className="h-8 w-8 text-muted-foreground/40" />
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartContainer
            title="Weekly Activity Breakdown"
            subtitle="Distribution of maintainer activities over the past week"
          >
            <ActivityBarChart data={metrics.weeklyActivity} />
          </ChartContainer>

          <ChartContainer
            title="Activity Distribution"
            subtitle="How your time is spent across different activities"
          >
            <DistributionPieChart data={metrics.activityDistribution} />
          </ChartContainer>
        </div>

        {/* Sentiment Trend Chart */}
        <ChartContainer
          title="30-Day Sentiment Trend"
          subtitle="Community sentiment analysis based on feedback and interactions"
        >
          <SentimentLineChart data={metrics.sentimentTrend} />
        </ChartContainer>

        {/* Quick Alerts Panel */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-base font-medium">
            Quick Alerts & Notifications
          </h3>
          <div className="space-y-3">
            {alerts.length > 0 ? (
              // Show real alerts from API
              alerts.map((alert: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg bg-orange-50 p-4 border border-orange-200"
                >
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-orange-600" />
                  <div className="flex-1">
                    <p className="text-sm text-orange-900">
                      {alert.title || "Alert"}
                    </p>
                    <p className="mt-1 text-xs text-orange-700">
                      {alert.message ||
                        alert.description ||
                        "Please review your activity"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              // Show default alerts when no alerts from API
              <>
                {data?.burnout?.riskLevel === "high" && (
                  <div className="flex items-start gap-3 rounded-lg bg-orange-50 p-4 border border-orange-200">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm text-orange-900">
                        High burnout risk detected
                      </p>
                      <p className="mt-1 text-xs text-orange-700">
                        Your burnout risk is at {data?.burnout?.riskScore}%.
                        Consider following the recommendations in the Burnout
                        tab.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 border border-blue-200">
                  <TrendingUp className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-900">
                      Review impact score: {metrics.reviewImpactScore}%
                    </p>
                    <p className="mt-1 text-xs text-blue-700">
                      Your code reviews are making a strong impact on the
                      project quality.
                    </p>
                  </div>
                </div>

                {metrics.communityEngagement >= 90 && (
                  <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-4 border border-emerald-200">
                    <Users className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div className="flex-1">
                      <p className="text-sm text-emerald-900">
                        Excellent community engagement!
                      </p>
                      <p className="mt-1 text-xs text-emerald-700">
                        Your {metrics.communityEngagement}% engagement score
                        shows strong community leadership.
                      </p>
                    </div>
                  </div>
                )}

                {alerts.length === 0 &&
                  data?.burnout?.riskLevel !== "high" &&
                  metrics.communityEngagement < 90 && (
                    <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 border border-gray-200">
                      <Info className="mt-0.5 h-5 w-5 text-gray-600" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          No alerts at this time
                        </p>
                        <p className="mt-1 text-xs text-gray-700">
                          Keep up the great work maintaining your projects!
                        </p>
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
