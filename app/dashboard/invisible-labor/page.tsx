"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import {
  StackedAreaChart,
  ActivityBarChart,
} from "@/components/dashboard/ActivityChart";
import { mockMaintainerMetrics } from "@/lib/mock-data";
import {
  Eye,
  GitPullRequest,
  Users,
  BookOpen,
  MessageSquare,
  Shield,
} from "lucide-react";

// Generate heat map data
const generateHeatMapData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const data = [];

  for (const day of days) {
    for (const hour of hours) {
      const intensity = Math.random() * 100;
      data.push({
        day,
        hour: hour.toString().padStart(2, "0") + ":00",
        intensity: Math.round(intensity),
      });
    }
  }

  return data;
};

// Radar chart data for skills
const radarData = [
  { skill: "Code Review", value: 95, fullMark: 100 },
  { skill: "Issue Triage", value: 88, fullMark: 100 },
  { skill: "Mentorship", value: 92, fullMark: 100 },
  { skill: "Documentation", value: 78, fullMark: 100 },
  { skill: "Conflict Resolution", value: 85, fullMark: 100 },
  { skill: "Community Building", value: 90, fullMark: 100 },
];

// Comparison data
const comparisonData = [
  { metric: "Reviews/Week", you: 35, repoAvg: 18, topPerformer: 42 },
  { metric: "Response Time (hrs)", you: 4.2, repoAvg: 12.5, topPerformer: 2.8 },
  { metric: "Issues Triaged", you: 67, repoAvg: 23, topPerformer: 89 },
  { metric: "Mentorship Sessions", you: 12, repoAvg: 3, topPerformer: 18 },
  { metric: "Docs Updated", you: 8, repoAvg: 2, topPerformer: 15 },
];

export default function InvisibleLaborAnalytics() {
  const metrics = mockMaintainerMetrics;

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
            <p className="mt-2 text-2xl font-semibold">1,247</p>
            <p className="text-xs text-muted-foreground">Total reviewed</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span className="text-sm">Triage</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">892</p>
            <p className="text-xs text-muted-foreground">Issues organized</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span className="text-sm">Mentorship</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">156</p>
            <p className="text-xs text-muted-foreground">Contributors helped</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              <span className="text-sm">Documentation</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">45</p>
            <p className="text-xs text-muted-foreground">Pages improved</p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-pink-500" />
              <span className="text-sm">Discussions</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">523</p>
            <p className="text-xs text-muted-foreground">
              Threads participated
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-indigo-500" />
              <span className="text-sm">Impact Score</span>
            </div>
            <p className="mt-2 text-2xl font-semibold">847</p>
            <p className="text-xs text-muted-foreground">Overall rating</p>
          </div>
        </div>

        {/* Activity Heat Map */}
        <ChartContainer
          title="Weekly Activity Heat Map"
          subtitle="Intensity of maintainer activities across time periods"
        >
          <div className="overflow-x-auto p-4">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="flex gap-1 mb-1">
                <div className="w-12"></div>
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 text-center text-[10px] text-muted-foreground"
                  >
                    {i}
                  </div>
                ))}
              </div>

              {/* Heat Map Rows */}
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="flex gap-1 mb-1">
                  <div className="w-12 flex items-center justify-end pr-2 text-[10px] text-muted-foreground">
                    {day}
                  </div>
                  {Array.from({ length: 24 }, (_, hour) => {
                    const intensity = Math.random() * 100;
                    const opacity = Math.max(0.2, intensity / 100);
                    return (
                      <div
                        key={`${day}-${hour}`}
                        className="flex-1 h-8 rounded cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                        style={{
                          backgroundColor: `rgba(59, 130, 246, ${opacity})`,
                        }}
                        title={`${day} ${hour}:00 - Intensity: ${Math.round(intensity)}%`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

        {/* Stacked Area Chart */}
        <ChartContainer
          title="Cumulative Labor Over Time"
          subtitle="30-day trend of different contribution types"
        >
          <StackedAreaChart data={metrics.weeklyActivity} />
        </ChartContainer>

        {/* Skills Radar Chart */}
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

          {/* Comparison Chart */}
          <ChartContainer
            title="Performance Comparison"
            subtitle="Your metrics vs repository averages and top performers"
          >
            <div className="space-y-4 p-4">
              {comparisonData.map((item) => (
                <div key={item.metric} className="space-y-2">
                  <div className="text-sm font-medium">{item.metric}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-xs text-muted-foreground">
                        You
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                        <div
                          className="absolute inset-y-0 left-0 bg-blue-600 rounded-full flex items-center justify-end pr-2"
                          style={{
                            width: `${(item.you / item.topPerformer) * 100}%`,
                          }}
                        >
                          <span className="text-xs text-white">{item.you}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-xs text-muted-foreground">
                        Repo Avg
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                        <div
                          className="absolute inset-y-0 left-0 bg-gray-500 rounded-full flex items-center justify-end pr-2"
                          style={{
                            width: `${(item.repoAvg / item.topPerformer) * 100}%`,
                          }}
                        >
                          <span className="text-xs text-white">
                            {item.repoAvg}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-20 text-xs text-muted-foreground">
                        Top
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                        <div
                          className="absolute inset-y-0 left-0 bg-green-600 rounded-full flex items-center justify-end pr-2"
                          style={{ width: "100%" }}
                        >
                          <span className="text-xs text-white">
                            {item.topPerformer}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

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
    </DashboardLayout>
  );
}
