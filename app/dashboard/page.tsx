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
import { mockMaintainerMetrics } from "@/lib/mock-data";
import {
  Eye,
  TrendingUp,
  Users,
  AlertTriangle,
  Clock,
  GitPullRequest,
  MessageSquare,
  BookOpen,
} from "lucide-react";

export default function DashboardOverview() {
  const metrics = mockMaintainerMetrics;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground">
              Track your complete maintainer impact beyond just code commits
            </p>
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
            subtitle="Risk level: Medium"
            icon={<AlertTriangle className="h-5 w-5" />}
            color="orange"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
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
            <div className="flex items-start gap-3 rounded-lg bg-orange-50 p-4 border border-orange-200">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm text-orange-900">
                  Weekend activity increasing
                </p>
                <p className="mt-1 text-xs text-orange-700">
                  You've been active 3 weekends in a row. Consider taking a
                  break to prevent burnout.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 border border-blue-200">
              <TrendingUp className="mt-0.5 h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm text-blue-900">
                  Review velocity improved
                </p>
                <p className="mt-1 text-xs text-blue-700">
                  Your average review time decreased by 2.5 hours this week.
                  Great progress!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-4 border border-emerald-200">
              <Users className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div className="flex-1">
                <p className="text-sm text-emerald-900">
                  New contributor milestone
                </p>
                <p className="mt-1 text-xs text-emerald-700">
                  You've helped 150+ new contributors! Consider sharing your
                  mentorship experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Repository Status Summary */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-medium">Repository Summary</h3>
            <span className="text-sm text-muted-foreground">
              {metrics.totalRepositories} active repositories
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-emerald-500">4</p>
              <p className="text-xs text-muted-foreground">Healthy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-amber-500">3</p>
              <p className="text-xs text-muted-foreground">Needs Attention</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-red-500">1</p>
              <p className="text-xs text-muted-foreground">Critical</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-blue-500">234</p>
              <p className="text-xs text-muted-foreground">
                Total Contributors
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
