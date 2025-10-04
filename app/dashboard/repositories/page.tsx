"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { MultiLineChart } from "@/components/dashboard/ActivityChart";
import { mockRepositories } from "@/lib/mock-data";
import {
  FolderOpen,
  Star,
  GitFork,
  Users,
  GitPullRequest,
  AlertCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Filter,
} from "lucide-react";

// Generate contributor growth data
const generateContributorGrowth = () => {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  let total = 150;
  let newContribs = 5;
  let returning = 120;

  return dates.map((date) => {
    total = Math.max(100, total + Math.floor(Math.random() * 10 - 3));
    newContribs = Math.max(0, newContribs + Math.floor(Math.random() * 5 - 2));
    returning = Math.max(80, returning + Math.floor(Math.random() * 8 - 3));

    return {
      date,
      total,
      new: newContribs,
      returning,
    };
  });
};

const contributorGrowthData = generateContributorGrowth();

// Issue resolution funnel data
const issueResolutionData = [
  { stage: "Created", count: 234, percentage: 100 },
  { stage: "Triaged", count: 198, percentage: 85 },
  { stage: "Assigned", count: 156, percentage: 67 },
  { stage: "In Progress", count: 112, percentage: 48 },
  { stage: "Resolved", count: 98, percentage: 42 },
];

export default function RepositoryHealth() {
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"health" | "activity" | "contributors">(
    "health"
  );

  const sortedRepos = [...mockRepositories].sort((a, b) => {
    switch (sortBy) {
      case "health":
        return b.healthScore - a.healthScore;
      case "activity":
        return (
          new Date(a.lastActivity).getTime() -
          new Date(b.lastActivity).getTime()
        );
      case "contributors":
        return b.contributors - a.contributors;
      default:
        return 0;
    }
  });

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthBadge = (score: number) => {
    if (score >= 80)
      return {
        label: "Healthy",
        color: "bg-emerald-100 text-emerald-700 border border-emerald-200",
      };
    if (score >= 60)
      return {
        label: "Needs Attention",
        color: "bg-amber-100 text-amber-700 border border-amber-200",
      };
    return {
      label: "Critical",
      color: "bg-rose-100 text-rose-700 border border-rose-200",
    };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              Repository Health Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor health metrics and contributor patterns across all
              maintained repositories
            </p>
          </div>
          <ExportButton pageName="repository-health" />
        </div>

        {/* Repository Overview Cards */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Repository Overview</h3>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border bg-background px-3 py-1 text-sm"
            >
              <option value="health">Sort by Health Score</option>
              <option value="activity">Sort by Activity</option>
              <option value="contributors">Sort by Contributors</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {sortedRepos.map((repo) => {
            const healthBadge = getHealthBadge(repo.healthScore);
            return (
              <div
                key={repo.id}
                className={`rounded-lg border border-gray-200 bg-white p-6 cursor-pointer transition-all hover:shadow-md hover:border-blue-300 ${
                  selectedRepo === repo.id
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : ""
                }`}
                onClick={() => setSelectedRepo(repo.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      {repo.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Last activity: {repo.lastActivity}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${healthBadge.color}`}
                  >
                    {healthBadge.label}
                  </span>
                </div>

                {/* Health Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">
                      Health Score
                    </span>
                    <span
                      className={`text-2xl font-semibold ${getHealthColor(repo.healthScore)}`}
                    >
                      {repo.healthScore}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full ${
                        repo.healthScore >= 80
                          ? "bg-green-600"
                          : repo.healthScore >= 60
                            ? "bg-yellow-600"
                            : "bg-red-600"
                      }`}
                      style={{ width: `${repo.healthScore}%` }}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-yellow-50 rounded">
                      <Star className="h-3.5 w-3.5 text-yellow-600" />
                    </div>
                    <span className="font-medium">
                      {repo.stars.toLocaleString()} stars
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-50 rounded">
                      <GitFork className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <span className="font-medium">
                      {repo.forks.toLocaleString()} forks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-50 rounded">
                      <Users className="h-3.5 w-3.5 text-purple-600" />
                    </div>
                    <span className="font-medium">
                      {repo.contributors} contributors
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-gray-100 rounded">
                      <Clock className="h-3.5 w-3.5 text-gray-600" />
                    </div>
                    <span className="font-medium">
                      {repo.responseTime}h response
                    </span>
                  </div>
                </div>

                {/* Issues and PRs */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-orange-200 bg-orange-50/50 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-orange-700">
                        Issues
                      </span>
                      <AlertCircle className="h-3.5 w-3.5 text-orange-600" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-orange-900">
                        {repo.issuesOpen}
                      </span>
                      <span className="text-xs text-emerald-600 font-medium">
                        {repo.issuesResolved} resolved
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-blue-700">
                        Pull Requests
                      </span>
                      <GitPullRequest className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-blue-900">
                        {repo.prsOpen}
                      </span>
                      <span className="text-xs text-emerald-600 font-medium">
                        {repo.prsMerged} merged
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sentiment Indicator */}
                <div className="mt-4 flex items-center justify-between rounded-lg border p-3 bg-gradient-to-r from-gray-50 to-transparent">
                  <span className="text-sm font-medium text-gray-700">
                    Community Sentiment
                  </span>
                  <div className="flex items-center gap-2">
                    {repo.sentiment === "positive" && (
                      <>
                        <div className="p-1 bg-emerald-100 rounded-full">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
                        <span className="text-sm font-semibold text-emerald-700">
                          Positive
                        </span>
                      </>
                    )}
                    {repo.sentiment === "neutral" && (
                      <>
                        <div className="p-1 bg-amber-100 rounded-full">
                          <Activity className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="text-sm font-semibold text-amber-700">
                          Neutral
                        </span>
                      </>
                    )}
                    {repo.sentiment === "negative" && (
                      <>
                        <div className="p-1 bg-rose-100 rounded-full">
                          <XCircle className="h-4 w-4 text-rose-600" />
                        </div>
                        <span className="text-sm font-semibold text-rose-700">
                          Negative
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Health Score Matrix */}
        <ChartContainer
          title="Repository Health Matrix"
          subtitle="Multi-dimensional assessment of repository health"
        >
          <div className="p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {sortedRepos.map((repo) => (
                <div key={repo.id} className="space-y-3">
                  <h4 className="font-medium text-sm">{repo.name}</h4>
                  {[
                    { metric: "Activity", value: 85 },
                    { metric: "Community", value: repo.healthScore },
                    {
                      metric: "Issues",
                      value: Math.round(
                        (repo.issuesResolved /
                          (repo.issuesResolved + repo.issuesOpen)) *
                          100
                      ),
                    },
                    {
                      metric: "Response",
                      value: Math.round(
                        Math.max(0, 100 - repo.responseTime * 5)
                      ),
                    },
                  ].map((item) => (
                    <div key={item.metric} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          {item.metric}
                        </span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full ${
                            item.value >= 80
                              ? "bg-green-600"
                              : item.value >= 60
                                ? "bg-yellow-600"
                                : "bg-red-600"
                          }`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>

        {/* Contributor Growth and Issue Resolution */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contributor Growth Chart */}
          <ChartContainer
            title="Contributor Growth Trends"
            subtitle="New vs returning contributors over time"
          >
            <MultiLineChart
              data={contributorGrowthData}
              lines={[
                {
                  dataKey: "total",
                  color: "#2563EB",
                  name: "Total Contributors",
                },
                { dataKey: "new", color: "#059669", name: "New Contributors" },
                {
                  dataKey: "returning",
                  color: "#7C3AED",
                  name: "Returning Contributors",
                },
              ]}
            />
          </ChartContainer>

          {/* Issue Resolution Funnel */}
          <ChartContainer
            title="Issue Resolution Funnel"
            subtitle="Track issue progress from creation to resolution"
          >
            <div className="p-6">
              {issueResolutionData.map((stage, index) => (
                <div key={index} className="relative mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">
                      {stage.count} ({stage.percentage}%)
                    </span>
                  </div>
                  <div className="h-8 bg-gray-200 rounded">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                  {index < issueResolutionData.length - 1 && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

        {/* Release Cycle Analysis */}
        <ChartContainer
          title="Release Cycle Analysis"
          subtitle="Time patterns and frequency of releases"
        >
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">14</span>
                </div>
                <p className="mt-2 font-medium">Days</p>
                <p className="text-sm text-muted-foreground">
                  Average Release Cycle
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">92%</span>
                </div>
                <p className="mt-2 font-medium">On-Time</p>
                <p className="text-sm text-muted-foreground">
                  Release Success Rate
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">3.2</span>
                </div>
                <p className="mt-2 font-medium">Hotfixes</p>
                <p className="text-sm text-muted-foreground">
                  Per Release (Average)
                </p>
              </div>
            </div>

            {/* Release Timeline */}
            <div className="mt-8">
              <h4 className="mb-4 text-sm font-medium">Recent Releases</h4>
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700" />
                {[
                  {
                    version: "v2.3.0",
                    date: "2024-03-20",
                    type: "major",
                    status: "stable",
                  },
                  {
                    version: "v2.2.5",
                    date: "2024-03-06",
                    type: "patch",
                    status: "stable",
                  },
                  {
                    version: "v2.2.4",
                    date: "2024-02-21",
                    type: "patch",
                    status: "deprecated",
                  },
                  {
                    version: "v2.2.0",
                    date: "2024-02-07",
                    type: "minor",
                    status: "deprecated",
                  },
                ].map((release, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-4 pb-6"
                  >
                    <div
                      className={`h-4 w-4 rounded-full border-2 border-white dark:border-gray-950 ${
                        release.type === "major"
                          ? "bg-blue-600"
                          : release.type === "minor"
                            ? "bg-green-600"
                            : "bg-gray-600"
                      }`}
                    />
                    <div className="flex-1 rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{release.version}</span>
                          <span
                            className={`ml-2 inline-block px-2 py-0.5 rounded text-xs ${
                              release.status === "stable"
                                ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                            }`}
                          >
                            {release.status}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {release.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>
    </DashboardLayout>
  );
}
