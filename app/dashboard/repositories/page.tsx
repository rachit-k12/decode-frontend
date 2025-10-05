"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { MultiLineChart } from "@/components/dashboard/ActivityChart";
import { useDashboardData } from "@/hooks/queries/useMaintainerData";
import { useUsername } from "@/contexts/UsernameContext";
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
  Info,
} from "lucide-react";

export default function RepositoryHealth() {
  // Use the real API data with username from context
  const { username } = useUsername();
  const { data, isLoading, error } = useDashboardData(username);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"health" | "activity" | "contributors">(
    "health"
  );

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
              Please enter a GitHub username in the sidebar to view repository
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
            Loading repository data for {username}...
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
              Error loading repository data for "{username}". Please try again.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const repositoryHealth = data?.repositoryHealth || [];
  const analytics = data?.analytics;

  // Use API data if available, otherwise show empty
  const contributorGrowthData = analytics?.contributorGrowth
    ? [
        ...analytics.contributorGrowth.total.map((item, idx) => ({
          date: item.date,
          total: item.value,
          new: analytics.contributorGrowth!.new[idx]?.value || 0,
          returning: analytics.contributorGrowth!.returning[idx]?.value || 0,
        })),
      ]
    : [];

  // Use API data if available, otherwise show empty
  const issueResolutionData = analytics?.issueResolutionFunnel || [];

  const sortedRepos = [...repositoryHealth].sort((a, b) => {
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
            {contributorGrowthData.length > 0 ? (
              <MultiLineChart
                data={contributorGrowthData}
                lines={[
                  {
                    dataKey: "total",
                    color: "#2563EB",
                    name: "Total Contributors",
                  },
                  {
                    dataKey: "new",
                    color: "#059669",
                    name: "New Contributors",
                  },
                  {
                    dataKey: "returning",
                    color: "#7C3AED",
                    name: "Returning Contributors",
                  },
                ]}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <p>Contributor growth data not available</p>
                  <p className="text-sm mt-2">
                    Analytics will appear when backend provides this data
                  </p>
                </div>
              </div>
            )}
          </ChartContainer>

          {/* Issue Resolution Funnel */}
          <ChartContainer
            title="Issue Resolution Funnel"
            subtitle="Track issue progress from creation to resolution"
          >
            {issueResolutionData.length > 0 ? (
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
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <p>Issue resolution funnel data not available</p>
                  <p className="text-sm mt-2">
                    Analytics will appear when backend provides this data
                  </p>
                </div>
              </div>
            )}
          </ChartContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
