"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { useDashboardData } from "@/hooks/queries/useMaintainerData";
import { useUsername } from "@/contexts/UsernameContext";
import {
  Award,
  Download,
  Share2,
  Linkedin,
  FileText,
  Link,
  Trophy,
  Star,
  Users,
  BookOpen,
  MessageSquare,
  GitPullRequest,
  Shield,
  Target,
  Clock,
  CheckCircle,
  Info,
  Calendar,
  TrendingUp,
  Heart,
  Code,
  GitBranch,
} from "lucide-react";

const iconMap: Record<string, any> = {
  shield: Shield,
  star: Star,
  users: Users,
  book: BookOpen,
};

const categoryColors: Record<string, string> = {
  technical: "bg-blue-50 text-blue-700 border-blue-200",
  soft: "bg-green-50 text-green-700 border-green-200",
  leadership: "bg-purple-50 text-purple-700 border-purple-200",
};

const levelColors: Record<string, string> = {
  bronze: "from-orange-500 to-orange-600",
  silver: "from-gray-400 to-gray-500",
  gold: "from-yellow-500 to-yellow-600",
  platinum: "from-purple-500 to-purple-600",
};

// Unsplash avatar images for fallback
const fallbackAvatars = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
];

// Testimonial avatars from Unsplash
const testimonialAvatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
];

export default function ContributionProfile() {
  // Use the real API data with username from context
  const { username } = useUsername();
  const { data, isLoading, error } = useDashboardData(username);
  const [exportFormat, setExportFormat] = useState<"pdf" | "linkedin" | "url">(
    "pdf"
  );

  // Show message if no username is entered
  if (!username) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
            <Info className="h-10 w-10 text-gray-400" />
          </div>
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Username Selected
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Please enter a GitHub username in the sidebar to view profile data
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
        <div className="space-y-6">
          {/* Header skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex gap-3">
              <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Profile header skeleton */}
          <div className="rounded-xl border bg-white p-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="h-24 w-24 bg-gray-200 rounded-xl animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full max-w-lg bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Cards skeleton */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl border bg-white p-6">
                <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse mb-4" />
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Handle error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center">
            <Info className="h-10 w-10 text-red-400" />
          </div>
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Error Loading Profile
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Unable to load profile data for "{username}". Please try again or
              check your connection.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const profile = data?.profile || {
    name: "",
    username: "",
    avatar: "",
    bio: "",
    joinedDate: "",
    achievements: [],
    skills: [],
    testimonials: [],
    impactSummary: {
      totalReviews: 0,
      issuesTriaged: 0,
      contributorsHelped: 0,
      documentationPages: 0,
      communityImpact: 0,
      timeInvested: 0,
    },
    topRepositories: [],
  };

  // Get a consistent avatar based on username
  const getAvatarUrl = (username: string, avatarUrl?: string) => {
    if (avatarUrl) return avatarUrl;
    const index = username.length % fallbackAvatars.length;
    return fallbackAvatars[index];
  };

  // Get testimonial avatar
  const getTestimonialAvatar = (index: number) => {
    return testimonialAvatars[index % testimonialAvatars.length];
  };

  const handleExport = async () => {
    if (exportFormat === "pdf") {
      try {
        const currentUrl = window.location.href;
        const response = await fetch("/api/export-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: currentUrl,
            filename: "maintainer-profile",
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "maintainer-profile.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          alert("Failed to generate PDF. Please try again.");
        }
      } catch (error) {
        console.error("Export error:", error);
        alert("An error occurred during export.");
      }
    } else if (exportFormat === "linkedin") {
      const { exportToLinkedIn, copyToClipboard } = await import(
        "@/utils/pdf-export"
      );
      const linkedInText = exportToLinkedIn(profile);
      const copied = await copyToClipboard(linkedInText);
      if (copied) {
        alert("LinkedIn format copied to clipboard!");
      }
    } else if (exportFormat === "url") {
      const { generateShareableURL, copyToClipboard } = await import(
        "@/utils/pdf-export"
      );
      const url = generateShareableURL(profile.username);
      const copied = await copyToClipboard(url);
      if (copied) {
        alert(`Shareable link copied: ${url}`);
      }
    }
  };

  return (
    <DashboardLayout>
      <div id="contribution-profile-content" className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Contribution Profile
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Showcase your open source impact and achievements
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as any)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="pdf">Export as PDF</option>
              <option value="linkedin">LinkedIn Format</option>
              <option value="url">Shareable Link</option>
            </select>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <img
                src={getAvatarUrl(profile.username, profile.avatar)}
                alt={profile.name || profile.username}
                className="h-24 w-24 rounded-xl object-cover shadow-lg ring-4 ring-white"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  if (parent) {
                    target.style.display = "none";
                    const fallbackDiv = document.createElement("div");
                    fallbackDiv.className =
                      "h-24 w-24 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center";
                    fallbackDiv.innerHTML = `<span class="text-white text-2xl font-bold">${(
                      profile.name?.[0] ||
                      profile.username?.[0] ||
                      "U"
                    ).toUpperCase()}</span>`;
                    parent.appendChild(fallbackDiv);
                  }
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-gray-900">
                {profile.name || "Anonymous User"}
              </h2>
              <p className="text-gray-600 font-medium mt-1">
                @{profile.username}
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {profile.bio || "Open source maintainer and contributor"}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Joined{" "}
                  {profile.joinedDate
                    ? new Date(profile.joinedDate).toLocaleDateString("en", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Recently"}
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  {profile.impactSummary.contributorsHelped} contributors helped
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <GitPullRequest className="h-4 w-4" />
                  {profile.impactSummary.totalReviews.toLocaleString()} reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <GitPullRequest className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {profile.impactSummary.totalReviews.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Code Reviews</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {profile.impactSummary.issuesTriaged.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Issues Triaged</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {profile.impactSummary.contributorsHelped}
                </p>
                <p className="text-sm text-gray-600">Contributors Helped</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">
                  {profile.impactSummary.documentationPages}
                </p>
                <p className="text-sm text-gray-600">Docs Improved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Achievements */}
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Achievements
              </h3>
            </div>
            <div className="space-y-4">
              {profile.achievements.length > 0 ? (
                profile.achievements.slice(0, 3).map((achievement) => {
                  const IconComponent = iconMap[achievement.icon] || Trophy;
                  const gradientClass = levelColors[achievement.level];

                  return (
                    <div
                      key={achievement.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div
                        className={`rounded-lg bg-gradient-to-br ${gradientClass} p-2 shadow-sm`}
                      >
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {achievement.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-block rounded px-2 py-1 text-xs font-medium capitalize bg-gray-200 text-gray-700">
                            {achievement.level}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              achievement.earnedDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No achievements yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            </div>
            <div className="space-y-4">
              {profile.skills.length > 0 ? (
                profile.skills.slice(0, 4).map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-gray-900">
                          {skill.skill}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-[11px] font-medium border ${categoryColors[skill.category]}`}
                        >
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {skill.score}/{skill.maxScore}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{
                          width: `${(skill.score / skill.maxScore) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No skills data available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Repositories */}
        <div className="rounded-xl border bg-white p-6">
          <div className="flex items-center gap-3 mb-6">
            <GitBranch className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Top Repositories
            </h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {profile.topRepositories.length > 0 ? (
              profile.topRepositories.slice(0, 4).map((repo, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">
                        {repo.repository}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">{repo.role}</p>
                    </div>
                    <span
                      className={`flex-shrink-0 rounded px-2 py-1 text-xs font-medium ${
                        repo.impact === "high"
                          ? "bg-green-100 text-green-700"
                          : repo.impact === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {repo.impact}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>{repo.contributions} contributions</span>
                    <span>•</span>
                    <span>{repo.duration}</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, (repo.contributions / 500) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                <GitBranch className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No repository data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Testimonials */}
        {profile.testimonials.length > 0 && (
          <div className="rounded-xl border bg-white p-6">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Community Testimonials
              </h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {profile.testimonials.slice(0, 2).map((testimonial, index) => (
                <div key={testimonial.id} className="p-4 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-700 italic mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={getTestimonialAvatar(index)}
                      alt={testimonial.author}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                      onError={(e) => {
                        // Fallback to gradient if image fails to load
                        const target = e.target as HTMLImageElement;
                        const parent = target.parentElement;
                        if (parent) {
                          target.style.display = "none";
                          const initials = testimonial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase();
                          const fallbackDiv = document.createElement("div");
                          fallbackDiv.className =
                            "h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center";
                          fallbackDiv.innerHTML = `<span class="text-white text-xs font-bold">${initials}</span>`;
                          parent.appendChild(fallbackDiv);
                        }
                      }}
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-gray-600">
                        {testimonial.repository}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
