"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { mockTimelineEvents } from "@/lib/mock-data";
import {
  Clock,
  GitPullRequest,
  Users,
  BookOpen,
  MessageSquare,
  Shield,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

// Generate hourly activity data
const generateHourlyActivity = () => {
  const activities = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now);
    hour.setHours(hour.getHours() - i);

    activities.push({
      time: hour.toISOString(),
      hour: hour.getHours(),
      reviews: Math.floor(Math.random() * 5),
      triage: Math.floor(Math.random() * 8),
      mentorship: Math.floor(Math.random() * 3),
      documentation: Math.floor(Math.random() * 2),
      discussions: Math.floor(Math.random() * 4),
    });
  }

  return activities;
};

// Generate sprint data
const sprintData = [
  {
    name: "Sprint 42",
    start: "2024-03-01",
    end: "2024-03-14",
    status: "completed",
  },
  {
    name: "Sprint 43",
    start: "2024-03-15",
    end: "2024-03-28",
    status: "active",
  },
  {
    name: "Sprint 44",
    start: "2024-03-29",
    end: "2024-04-11",
    status: "planned",
  },
];

const activityTypeConfig: Record<
  string,
  { color: string; icon: any; label: string }
> = {
  review: { color: "bg-blue-600", icon: GitPullRequest, label: "Code Review" },
  triage: { color: "bg-green-600", icon: Shield, label: "Issue Triage" },
  mentorship: { color: "bg-purple-600", icon: Users, label: "Mentorship" },
  documentation: {
    color: "bg-orange-600",
    icon: BookOpen,
    label: "Documentation",
  },
  discussion: {
    color: "bg-pink-600",
    icon: MessageSquare,
    label: "Discussion",
  },
  release: { color: "bg-indigo-600", icon: Calendar, label: "Release" },
};

export default function ActivityTimeline() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const hourlyActivity = generateHourlyActivity();

  const filteredEvents =
    selectedFilter === "all"
      ? mockTimelineEvents
      : mockTimelineEvents.filter((event) => event.type === selectedFilter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              Activity Timeline
            </h1>
            <p className="text-muted-foreground">
              Interactive timeline of your contributions with detailed activity
              breakdowns
            </p>
          </div>
          <ExportButton pageName="activity-timeline" />
        </div>

        {/* Timeline Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 hover:bg-accent">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 font-medium">{selectedDate}</span>
            <button className="rounded-lg p-2 hover:bg-accent">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
              className="rounded-lg p-2 hover:bg-accent"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
              className="rounded-lg p-2 hover:bg-accent"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button className="rounded-lg p-2 hover:bg-accent">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="rounded-lg border bg-background px-3 py-1 text-sm"
            >
              <option value="all">All Activities</option>
              <option value="review">Code Reviews</option>
              <option value="triage">Issue Triage</option>
              <option value="mentorship">Mentorship</option>
              <option value="documentation">Documentation</option>
              <option value="discussion">Discussions</option>
              <option value="release">Releases</option>
            </select>
          </div>
        </div>

        {/* Sprint/Milestone Markers */}
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-4 text-sm font-medium">Sprint Overview</h3>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-full">
              {sprintData.map((sprint, index) => (
                <div
                  key={index}
                  className={`absolute h-full rounded ${
                    sprint.status === "completed"
                      ? "bg-green-100 "
                      : sprint.status === "active"
                        ? "bg-blue-100 "
                        : "bg-gray-100 "
                  }`}
                  style={{
                    left: `${index * 33.33}%`,
                    width: "33.33%",
                  }}
                />
              ))}
            </div>
            <div className="relative flex justify-between py-2">
              {sprintData.map((sprint, index) => (
                <div key={index} className="flex-1 px-2">
                  <div className="font-medium text-sm">{sprint.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(sprint.start).toLocaleDateString()} -{" "}
                    {new Date(sprint.end).toLocaleDateString()}
                  </div>
                  <div
                    className={`mt-1 inline-block rounded px-2 py-0.5 text-xs ${
                      sprint.status === "completed"
                        ? "bg-green-600 text-white"
                        : sprint.status === "active"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-500 text-white"
                    }`}
                  >
                    {sprint.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Timeline */}
        <ChartContainer
          title="Interactive Activity Timeline"
          subtitle="Hover over events to see details"
        >
          <div className="relative h-96 p-4 overflow-hidden">
            {/* Timeline axis */}
            <div className="relative w-full h-full">
              {/* Hour markers */}
              <div className="flex w-full h-12 border-b border-gray-300">
                {Array.from({ length: 24 }, (_, i) => (
                  <div
                    key={i}
                    className="flex-1 border-l border-gray-200 flex items-center justify-center text-xs text-gray-500 font-medium"
                  >
                    {i}:00
                  </div>
                ))}
              </div>

              {/* Events Container with scrolling */}
              <div className="relative w-full h-[calc(100%-3rem)] overflow-y-auto">
                <div className="relative min-h-full">
                  {filteredEvents.slice(0, 10).map((event, index) => {
                    const eventHour = new Date(event.timestamp).getHours();
                    const eventMinute = new Date(event.timestamp).getMinutes();
                    const position =
                      ((eventHour * 60 + eventMinute) / 1440) * 100;
                    const config = activityTypeConfig[event.type];
                    const row = index % 5;

                    return (
                      <div
                        key={event.id}
                        className="absolute"
                        style={{
                          left: `${position}%`,
                          top: `${row * 60 + 20}px`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <div className="group relative z-10">
                          <div
                            className={`h-10 w-10 rounded-full ${config.color} flex items-center justify-center cursor-pointer hover:scale-110 transition-all shadow-lg hover:shadow-xl`}
                          >
                            <config.icon className="h-5 w-5 text-white" />
                          </div>

                          {/* Tooltip - positioned to avoid overflow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block z-50">
                            <div className="rounded-lg bg-white border border-gray-200 p-3 shadow-xl min-w-[250px] max-w-[300px]">
                              <div className="font-semibold text-sm text-gray-900">
                                {event.title}
                              </div>
                              <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                                {event.description}
                              </div>
                              <div className="mt-2 flex items-center justify-between text-xs">
                                <span className="text-gray-500">
                                  {new Date(event.timestamp).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </span>
                                <span className="font-semibold text-blue-600">
                                  Impact: {event.impact}
                                </span>
                              </div>
                              {event.linkedPR && (
                                <div className="mt-1 text-xs text-blue-600 font-medium">
                                  PR #{event.linkedPR}
                                </div>
                              )}
                              {event.linkedIssue && (
                                <div className="mt-1 text-xs text-emerald-600 font-medium">
                                  Issue #{event.linkedIssue}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Connection line to timeline */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 h-5 w-px bg-gray-300" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ChartContainer>

        {/* Daily Activity Breakdown */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartContainer
            title="24-Hour Activity Distribution"
            subtitle="Your activity patterns throughout the day"
          >
            <div className="p-4">
              <div className="space-y-3">
                {hourlyActivity.map((hour) => {
                  const total =
                    hour.reviews +
                    hour.triage +
                    hour.mentorship +
                    hour.documentation +
                    hour.discussions;
                  return (
                    <div key={hour.time} className="flex items-center gap-3">
                      <span className="w-12 text-xs text-muted-foreground">
                        {hour.hour}:00
                      </span>
                      <div className="flex flex-1 gap-0.5">
                        {hour.reviews > 0 && (
                          <div
                            className="h-6 bg-blue-500 rounded-sm"
                            style={{
                              width: `${(hour.reviews / total) * 100}%`,
                            }}
                            title={`Reviews: ${hour.reviews}`}
                          />
                        )}
                        {hour.triage > 0 && (
                          <div
                            className="h-6 bg-emerald-500 rounded-sm"
                            style={{ width: `${(hour.triage / total) * 100}%` }}
                            title={`Triage: ${hour.triage}`}
                          />
                        )}
                        {hour.mentorship > 0 && (
                          <div
                            className="h-6 bg-purple-500 rounded-sm"
                            style={{
                              width: `${(hour.mentorship / total) * 100}%`,
                            }}
                            title={`Mentorship: ${hour.mentorship}`}
                          />
                        )}
                        {hour.documentation > 0 && (
                          <div
                            className="h-6 bg-amber-500 rounded-sm"
                            style={{
                              width: `${(hour.documentation / total) * 100}%`,
                            }}
                            title={`Documentation: ${hour.documentation}`}
                          />
                        )}
                        {hour.discussions > 0 && (
                          <div
                            className="h-6 bg-pink-500 rounded-sm"
                            style={{
                              width: `${(hour.discussions / total) * 100}%`,
                            }}
                            title={`Discussions: ${hour.discussions}`}
                          />
                        )}
                        {total === 0 && (
                          <div className="h-6 flex-1 bg-gray-200" />
                        )}
                      </div>
                      <span className="w-8 text-xs text-muted-foreground text-right">
                        {total}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded bg-blue-500" />
                  <span>Reviews</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded bg-emerald-500" />
                  <span>Triage</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded bg-purple-500" />
                  <span>Mentorship</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded bg-amber-500" />
                  <span>Documentation</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded bg-pink-500" />
                  <span>Discussions</span>
                </div>
              </div>
            </div>
          </ChartContainer>

          {/* Collaboration Network */}
          <ChartContainer
            title="Collaboration Network"
            subtitle="Your interaction patterns with other contributors"
          >
            <div className="flex items-center justify-center p-8">
              <div className="relative h-64 w-64">
                {/* Central node (you) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-medium">
                    You
                  </div>
                </div>

                {/* Connected contributors */}
                {[
                  { name: "Sarah", x: 30, y: 20, interactions: 45 },
                  { name: "Mike", x: 70, y: 15, interactions: 32 },
                  { name: "Emily", x: 80, y: 50, interactions: 28 },
                  { name: "John", x: 65, y: 80, interactions: 35 },
                  { name: "Lisa", x: 35, y: 85, interactions: 22 },
                  { name: "Tom", x: 15, y: 60, interactions: 18 },
                  { name: "Anna", x: 20, y: 35, interactions: 25 },
                ].map((person) => (
                  <div key={person.name}>
                    {/* Connection line */}
                    <svg className="absolute inset-0 h-full w-full">
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`${person.x}%`}
                        y2={`${person.y}%`}
                        stroke="currentColor"
                        strokeWidth={Math.max(1, person.interactions / 15)}
                        strokeOpacity={0.2}
                        className="text-gray-600"
                      />
                    </svg>

                    {/* Person node */}
                    <div
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `${person.x}%`,
                        top: `${person.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <div className="h-8 w-8 rounded-full bg-gray-300" />
                      <span className="mt-1 text-xs">{person.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {person.interactions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Contribution Flow */}
        <ChartContainer
          title="Contribution Flow Analysis"
          subtitle="Visualize how your work progresses from issues to merges"
        >
          <div className="p-6">
            <div className="flex items-center justify-between gap-4">
              {[
                { stage: "Issues Created", count: 234, color: "bg-rose-500" },
                { stage: "In Review", count: 156, color: "bg-orange-500" },
                {
                  stage: "Changes Requested",
                  count: 89,
                  color: "bg-amber-500",
                },
                { stage: "Approved", count: 112, color: "bg-emerald-500" },
                { stage: "Merged", count: 98, color: "bg-blue-500" },
              ].map((stage, index) => (
                <div key={index} className="flex-1">
                  <div className="text-center">
                    <div
                      className={`mx-auto h-20 w-full ${stage.color} rounded-t-lg relative`}
                    >
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-2">
                        <span className="text-2xl font-semibold text-white">
                          {stage.count}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm font-medium">
                      {stage.stage}
                    </div>
                  </div>
                  {index < 4 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>
      </div>
    </DashboardLayout>
  );
}
