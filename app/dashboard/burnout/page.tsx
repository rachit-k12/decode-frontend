"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { MultiLineChart } from "@/components/dashboard/ActivityChart";
import { mockBurnoutIndicator } from "@/lib/mock-data";
import {
  AlertTriangle,
  TrendingUp,
  Clock,
  Activity,
  Calendar,
  Shield,
  Coffee,
  Target,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Generate burnout trend data
const generateBurnoutTrends = () => {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split("T")[0];
  });

  let responseTime = 4.2;
  let activityLevel = 65;
  let sentiment = 73;

  return dates.map((date) => {
    responseTime = Math.max(
      2,
      Math.min(12, responseTime + (Math.random() - 0.48) * 0.5)
    );
    activityLevel = Math.max(
      40,
      Math.min(100, activityLevel + (Math.random() - 0.45) * 8)
    );
    sentiment = Math.max(
      40,
      Math.min(90, sentiment + (Math.random() - 0.47) * 5)
    );

    return {
      date,
      responseTime: Math.round(responseTime * 10) / 10,
      activityLevel: Math.round(activityLevel),
      sentiment: Math.round(sentiment),
    };
  });
};

const burnoutTrends = generateBurnoutTrends();

export default function BurnoutAssessment() {
  const burnout = mockBurnoutIndicator;

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-600";
    if (score < 50) return "text-yellow-600";
    if (score < 70) return "text-orange-600";
    return "text-red-600";
  };

  const getRiskBgColor = (score: number) => {
    if (score < 30) return "bg-green-50 dark:bg-green-950/20";
    if (score < 50) return "bg-yellow-50 dark:bg-yellow-950/20";
    if (score < 70) return "bg-orange-50 dark:bg-orange-950/20";
    return "bg-red-50 dark:bg-red-950/20";
  };

  const getRiskLabel = (level: string) => {
    const labels: Record<string, string> = {
      low: "Low Risk",
      medium: "Medium Risk",
      high: "High Risk",
      critical: "Critical Risk",
    };
    return labels[level] || "Unknown";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              Burnout Risk Assessment
            </h1>
            <p className="text-muted-foreground">
              Monitor workload patterns and receive personalized recommendations
              for sustainable maintenance
            </p>
          </div>
          <ExportButton pageName="burnout-assessment" />
        </div>

        {/* Risk Score Gauge and Primary Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Risk Score Gauge */}
          <div
            className={`rounded-lg border p-6 ${getRiskBgColor(burnout.riskScore)}`}
          >
            <h3 className="mb-4 text-sm font-medium">Overall Burnout Risk</h3>
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
                    strokeDasharray={`${burnout.riskScore * 2.51} 251`}
                    className={getRiskColor(burnout.riskScore)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <AlertTriangle
                    className={`h-6 w-6 ${getRiskColor(burnout.riskScore)}`}
                  />
                  <span
                    className={`mt-1 text-2xl font-semibold ${getRiskColor(burnout.riskScore)}`}
                  >
                    {burnout.riskScore}%
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className={`font-medium ${getRiskColor(burnout.riskScore)}`}>
                  {getRiskLabel(burnout.riskLevel)}
                </p>
                <p className="text-sm text-muted-foreground">Monitor closely</p>
              </div>
            </div>
          </div>

          {/* Risk Indicators */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Risk Indicators
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4" />
                  Workload
                </span>
                <span
                  className={`text-sm font-medium ${getRiskColor(burnout.indicators.workload)}`}
                >
                  {burnout.indicators.workload}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${
                    burnout.indicators.workload < 50
                      ? "bg-green-600"
                      : burnout.indicators.workload < 70
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                  style={{ width: `${burnout.indicators.workload}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  Response Time
                </span>
                <span
                  className={`text-sm font-medium ${getRiskColor(burnout.indicators.responseTime)}`}
                >
                  {burnout.indicators.responseTime}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${
                    burnout.indicators.responseTime < 50
                      ? "bg-green-600"
                      : burnout.indicators.responseTime < 70
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                  style={{ width: `${burnout.indicators.responseTime}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Activity Spikes
                </span>
                <span
                  className={`text-sm font-medium ${getRiskColor(burnout.indicators.activitySpikes)}`}
                >
                  {burnout.indicators.activitySpikes}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${
                    burnout.indicators.activitySpikes < 50
                      ? "bg-green-600"
                      : burnout.indicators.activitySpikes < 70
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                  style={{ width: `${burnout.indicators.activitySpikes}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  Weekend Work
                </span>
                <span
                  className={`text-sm font-medium ${getRiskColor(burnout.indicators.weekendWork)}`}
                >
                  {burnout.indicators.weekendWork}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full ${
                    burnout.indicators.weekendWork < 30
                      ? "bg-green-600"
                      : burnout.indicators.weekendWork < 50
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                  style={{ width: `${burnout.indicators.weekendWork}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recovery Metrics */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Recovery Progress
            </h3>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Days Off Taken</span>
                </div>
                <span className="font-medium">
                  {burnout.recoveryMetrics.daysOff}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Last 30 days</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Tasks Delegated</span>
                </div>
                <span className="font-medium">
                  {burnout.recoveryMetrics.delegatedTasks}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">This month</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Scope Reduced</span>
                </div>
                <span className="font-medium">
                  {burnout.recoveryMetrics.reducedScope}%
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                From peak load
              </p>
            </div>
          </div>
        </div>

        {/* Multi-line Trend Chart */}
        <ChartContainer
          title="30-Day Burnout Indicators"
          subtitle="Track changes in response time, activity levels, and sentiment"
        >
          <MultiLineChart
            data={burnoutTrends}
            lines={[
              {
                dataKey: "responseTime",
                color: "#DC2626",
                name: "Response Time (hrs)",
              },
              {
                dataKey: "activityLevel",
                color: "#D97706",
                name: "Activity Level (%)",
              },
              {
                dataKey: "sentiment",
                color: "#059669",
                name: "Sentiment Score",
              },
            ]}
          />
        </ChartContainer>

        {/* Comparison with Healthy Benchmarks */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartContainer
            title="Your Patterns vs Healthy Benchmarks"
            subtitle="Compare your metrics with recommended sustainable levels"
          >
            <div className="space-y-4 p-4">
              {[
                { metric: "Weekly Hours", yours: 52, healthy: 40, max: 60 },
                { metric: "Weekend Activity", yours: 8, healthy: 2, max: 10 },
                { metric: "Late Night Work", yours: 12, healthy: 5, max: 15 },
                { metric: "Break Frequency", yours: 2, healthy: 5, max: 8 },
                { metric: "Response Delay", yours: 4.2, healthy: 6, max: 12 },
              ].map((item) => (
                <div key={item.metric} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.metric}</span>
                    <span className="text-muted-foreground">
                      {item.yours} / {item.healthy} (recommended)
                    </span>
                  </div>
                  <div className="relative h-6 rounded-full bg-gray-200">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-blue-600"
                      style={{ width: `${(item.yours / item.max) * 100}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 h-full w-0.5 bg-green-600"
                      style={{ left: `${(item.healthy / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>

          {/* Recommendations */}
          <ChartContainer
            title="Personalized Recommendations"
            subtitle="Actionable steps to reduce burnout risk"
          >
            <div className="space-y-3 p-4">
              {burnout.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-lg border p-3 bg-emerald-50"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <p className="text-xs text-emerald-900">{recommendation}</p>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

        {/* Warning Signs */}
        <ChartContainer
          title="Early Warning Signs"
          subtitle="Indicators that require immediate attention"
        >
          <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                sign: "Increasing response times",
                status: "warning",
                description: "Average response time increased by 35% this week",
              },
              {
                sign: "Weekend activity spike",
                status: "alert",
                description: "Active 3 consecutive weekends",
              },
              {
                sign: "Sentiment decline",
                status: "ok",
                description: "Community feedback remains positive",
              },
              {
                sign: "Late night commits",
                status: "warning",
                description: "5 commits after midnight this week",
              },
              {
                sign: "Break frequency",
                status: "alert",
                description: "No breaks > 2 hours in 10 days",
              },
              {
                sign: "Issue backlog",
                status: "ok",
                description: "Backlog size stable",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 ${
                  item.status === "alert"
                    ? "border-rose-300 bg-rose-50"
                    : item.status === "warning"
                      ? "border-orange-300 bg-orange-50"
                      : "border-emerald-300 bg-emerald-50"
                }`}
              >
                <div className="flex items-start gap-2">
                  {item.status === "alert" ? (
                    <XCircle className="h-4 w-4 text-rose-600" />
                  ) : item.status === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  )}
                  <div>
                    <p className="text-sm">{item.sign}</p>
                    <p className="mt-1 text-xs text-gray-600">
                      {item.description}
                    </p>
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
