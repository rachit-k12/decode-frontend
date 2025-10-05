"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import {
  StackedAreaChart,
  ActivityBarChart,
} from "@/components/dashboard/ActivityChart";
import { useDashboardData } from "@/hooks/queries/useMaintainerData";
import { useUsername } from "@/contexts/UsernameContext";
import {
  Eye,
  GitPullRequest,
  Users,
  BookOpen,
  MessageSquare,
  Shield,
  Info,
} from "lucide-react";
import { useMemo } from "react";

// Comparison da
export default function InvisibleLaborAnalytics() {
  // Use the real API data with username from context
  const { username } = useUsername();
  const { data, isLoading, error } = useDashboardData(username);

  // Extract data before any conditional returns to avoid hook order violations
  const metrics = data?.metrics || {
    invisibleLaborScore: 0,
    reviewImpactScore: 0,
    activityDistribution: [],
    weeklyActivity: [],
  };

  const communityMetrics = data?.communityMetrics || {
    thankYouMessages: 0,
    helpedContributors: 0,
    mentorshipSessions: 0,
    conflictsResolved: 0,
    documentationImproved: 0,
  };

  const profile = data?.profile;
  const analytics = data?.analytics;

  // Transform profile.skills to radar chart format if available
  const radarData = profile?.skillsRadar
    ? profile.skillsRadar
    : profile?.skills && profile.skills.length > 0
      ? profile.skills.map((skill) => ({
          skill: skill.skill,
          value: skill.score,
          fullMark: skill.maxScore,
        }))
      : [];

  // Transform activityHeatmap data into heatmap format
  // This hook must be called before any conditional returns
  const heatMapData = useMemo(() => {
    if (!analytics?.activityHeatmap || analytics.activityHeatmap.length === 0) {
      return [];
    }

    return analytics.activityHeatmap.map((activity) => {
      const date = new Date(activity.date);
      // Map level (1-4) to opacity (0.2-1.0)
      const opacity = Math.max(0.2, Math.min(1.0, activity.level * 0.25));

      return {
        date: activity.date,
        dayOfWeek: activity.day,
        dayOfMonth: date.getDate(),
        week: activity.week,
        intensity: activity.level * 25, // Convert level to percentage
        opacity,
        total: activity.count,
        level: activity.level,
      };
    });
  }, [analytics?.activityHeatmap]);

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
              Please enter a GitHub username in the sidebar to view invisible
              labor data
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
            Loading invisible labor data for {username}...
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
              Error loading invisible labor data for "{username}". Please try
              again.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              Invisible Labor Analytics
            </h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your non-code contributions and their
              impact
            </p>
          </div>
          <ExportButton pageName="invisible-labor-analytics" />
        </div>

        {/* Key Invisible Work Metrics */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <GitPullRequest className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Reviews</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {profile?.impactSummary?.totalReviews || 0}
            </p>
            <p className="text-xs text-muted-foreground">Total reviewed</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span className="text-sm">Triage</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {profile?.impactSummary?.issuesTriaged || 0}
            </p>
            <p className="text-xs text-muted-foreground">Issues organized</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span className="text-sm">Mentorship</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {communityMetrics.mentorshipSessions}
            </p>
            <p className="text-xs text-muted-foreground">Contributors helped</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              <span className="text-sm">Documentation</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {communityMetrics.documentationImproved}
            </p>
            <p className="text-xs text-muted-foreground">Pages improved</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-pink-500" />
              <span className="text-sm">Discussions</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {communityMetrics.thankYouMessages}
            </p>
            <p className="text-xs text-muted-foreground">Thank you messages</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-indigo-500" />
              <span className="text-sm">Impact Score</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">
              {metrics.invisibleLaborScore}
            </p>
            <p className="text-xs text-muted-foreground">Overall rating</p>
          </div>
        </div>

        {/* Activity Heat Map */}
        <ChartContainer
          title="Daily Activity Heat Map"
          subtitle="Activity intensity from available data"
        >
          <div className="p-4">
            {heatMapData.length > 0 ? (
              <div className="flex flex-col gap-3">
                {/* Legend */}
                <div className="flex items-center justify-end gap-2">
                  <span className="text-xs text-muted-foreground">Less</span>
                  <div className="flex gap-1">
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((opacity, i) => (
                      <div
                        key={i}
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${opacity})`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">More</span>
                </div>

                {/* Grid based on available data */}
                <div className="grid grid-cols-7 gap-1.5">
                  {heatMapData.map((dayData) => (
                    <div key={dayData.date} className="relative group">
                      <div
                        className="w-full h-16 rounded cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all flex flex-col items-center justify-center gap-0.5"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${dayData.opacity})`,
                        }}
                      >
                        <div className="text-[10px] font-medium text-black drop-shadow-md">
                          {dayData.dayOfMonth}
                        </div>
                        <div className="text-[7px] text-black/70 drop-shadow">
                          {dayData.dayOfWeek}
                        </div>
                        <div className="text-[10px] font-semibold text-black drop-shadow-md">
                          {dayData.total}
                        </div>
                      </div>

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        <div>{dayData.date}</div>
                        <div>Total: {dayData.total} activities</div>
                        <div className="text-[10px] mt-1">
                          Activity Level: {dayData.level}/4
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                No activity data available
              </div>
            )}
          </div>
        </ChartContainer>

        {/* Stacked Area Chart */}
        <ChartContainer
          title="Cumulative Labor Over Time"
          subtitle="30-day trend of different contribution types"
        >
          <StackedAreaChart data={metrics?.weeklyActivity || []} />
        </ChartContainer>

        {/* Skills Radar Chart & Impact Timeline */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartContainer
            title="Multi-dimensional Skills Assessment"
            subtitle="Your expertise across different maintainer activities"
          >
            <div className="flex items-center justify-center p-8">
              <div className="relative h-64 w-64">
                {/* Simplified radar visualization */}
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  {/* Background circles */}
                  {[20, 40, 60, 80, 100].map((radius) => (
                    <circle
                      key={radius}
                      cx="100"
                      cy="100"
                      r={radius}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-muted-foreground/20"
                    />
                  ))}

                  {/* Axes */}
                  {radarData.map((_, index) => {
                    const angle = (index * 360) / radarData.length - 90;
                    const x = 100 + 100 * Math.cos((angle * Math.PI) / 180);
                    const y = 100 + 100 * Math.sin((angle * Math.PI) / 180);
                    return (
                      <line
                        key={index}
                        x1="100"
                        y1="100"
                        x2={x}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-muted-foreground/20"
                      />
                    );
                  })}

                  {/* Data polygon */}
                  <polygon
                    points={radarData
                      .map((item, index) => {
                        const angle = (index * 360) / radarData.length - 90;
                        const radius = item.value;
                        const x =
                          100 + radius * Math.cos((angle * Math.PI) / 180);
                        const y =
                          100 + radius * Math.sin((angle * Math.PI) / 180);
                        return `${x},${y}`;
                      })
                      .join(" ")}
                    fill="rgba(59, 130, 246, 0.3)"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth="2"
                  />
                </svg>

                {/* Labels */}
                {radarData.map((item, index) => {
                  const angle = (index * 360) / radarData.length - 90;
                  const x = 50 + 60 * Math.cos((angle * Math.PI) / 180);
                  const y = 50 + 60 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <div
                      key={item.skill}
                      className="absolute text-xs font-medium"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div>{item.skill}</div>
                      <div className="text-muted-foreground">{item.value}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ChartContainer>

          {/* Impact Timeline */}
          <ChartContainer
            title="Major Contribution Timeline"
            subtitle="Significant invisible labor contributions and their community response"
          >
            <div className="space-y-4 p-4">
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
                {
                  date: "2024-03-15",
                  type: "triage",
                  title: "Organized 50+ Issues for v2.0",
                  impact: 78,
                  responses: 5,
                  color: "emerald-500",
                },
                {
                  date: "2024-03-10",
                  type: "documentation",
                  title: "Rewrote API Documentation",
                  impact: 72,
                  responses: 15,
                  color: "amber-500",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg border p-4 hover:shadow-md transition-shadow"
                >
                  <div className={`h-2 w-2 rounded-full bg-${event.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{event.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {event.date}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Impact Score: {event.impact}</span>
                      <span>{event.responses} community responses</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-emerald-500">
                      +{event.impact} pts
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
