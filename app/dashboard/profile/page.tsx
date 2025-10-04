"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { mockContributionProfile } from "@/lib/mock-data";
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
} from "lucide-react";

const iconMap: Record<string, any> = {
  shield: Shield,
  star: Star,
  users: Users,
  book: BookOpen,
};

const categoryColors: Record<string, string> = {
  technical: "bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-400",
  soft: "bg-green-100 text-green-800 ",
  leadership:
    "bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-400",
};

const levelColors: Record<string, string> = {
  bronze: "from-orange-600 to-orange-700",
  silver: "from-gray-400 to-gray-500",
  gold: "from-yellow-500 to-yellow-600",
  platinum: "from-purple-600 to-purple-700",
};

export default function ContributionProfile() {
  const profile = mockContributionProfile;
  const [exportFormat, setExportFormat] = useState<"pdf" | "linkedin" | "url">(
    "pdf"
  );

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
        {/* Page Header with Export Options */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">
              Contribution Profile
            </h1>
            <p className="text-muted-foreground">
              Your comprehensive maintainer CV with achievements and impact
              metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as any)}
              className="rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="pdf">Export as PDF</option>
              <option value="linkedin">LinkedIn Format</option>
              <option value="url">Shareable Link</option>
            </select>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="rounded-lg border px-3 py-2 hover:bg-accent">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-muted-foreground">@{profile.username}</p>
              <p className="mt-2 max-w-2xl">{profile.bio}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  Joined{" "}
                  {new Date(profile.joinedDate).toLocaleDateString("en", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {profile.impactSummary.contributorsHelped} contributors helped
                </span>
                <span className="flex items-center gap-1">
                  <GitPullRequest className="h-4 w-4" />
                  {profile.impactSummary.totalReviews.toLocaleString()} reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <GitPullRequest className="mx-auto h-6 w-6 text-blue-600" />
            <p className="mt-2 text-2xl font-semibold">
              {profile.impactSummary.totalReviews.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Code Reviews</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <Shield className="mx-auto h-6 w-6 text-green-600" />
            <p className="mt-2 text-2xl font-semibold">
              {profile.impactSummary.issuesTriaged.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Issues Triaged</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <Users className="mx-auto h-6 w-6 text-purple-600" />
            <p className="mt-2 text-2xl font-semibold">
              {profile.impactSummary.contributorsHelped}
            </p>
            <p className="text-xs text-muted-foreground">Contributors Helped</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <BookOpen className="mx-auto h-6 w-6 text-orange-600" />
            <p className="mt-2 text-2xl font-semibold">
              {profile.impactSummary.documentationPages}
            </p>
            <p className="text-xs text-muted-foreground">Docs Improved</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <Target className="mx-auto h-6 w-6 text-pink-600" />
            <p className="mt-2 text-2xl font-semibold">
              {profile.impactSummary.communityImpact}%
            </p>
            <p className="text-xs text-muted-foreground">Community Impact</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
            <Clock className="mx-auto h-6 w-6 text-indigo-600" />
            <p className="mt-2 text-2xl font-semibold">
              {profile.impactSummary.timeInvested}
            </p>
            <p className="text-xs text-muted-foreground">Hours Invested</p>
          </div>
        </div>

        {/* Achievement Badges */}
        <ChartContainer
          title="Achievements & Recognition"
          subtitle="Earned badges demonstrating expertise and impact"
        >
          <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
            {profile.achievements.map((achievement) => {
              const IconComponent = iconMap[achievement.icon] || Trophy;
              const gradientClass = levelColors[achievement.level];

              return (
                <div
                  key={achievement.id}
                  className="group relative rounded-lg border p-4 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`rounded-lg bg-gradient-to-br ${gradientClass} p-3`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-block rounded px-2 py-0.5 text-xs font-medium capitalize bg-gray-100">
                          {achievement.level}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(
                            achievement.earnedDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ChartContainer>

        {/* Skills Spider Chart */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartContainer
            title="Skill Assessment"
            subtitle="Multi-dimensional evaluation of maintainer capabilities"
          >
            <div className="p-6">
              <div className="space-y-5">
                {profile.skills.map((skill) => (
                  <div key={skill.skill} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-base text-gray-900">
                          {skill.skill}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[skill.category]}`}
                        >
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {skill.score}
                        <span className="text-sm text-gray-400">
                          /{skill.maxScore}
                        </span>
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-100 overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-sm transition-all duration-500"
                        style={{
                          width: `${(skill.score / skill.maxScore) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Skill Summary */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
                  <p className="text-3xl font-bold text-blue-600 mb-1">88</p>
                  <p className="text-xs font-medium text-blue-700">Technical</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200">
                  <p className="text-3xl font-bold text-emerald-600 mb-1">90</p>
                  <p className="text-xs font-medium text-emerald-700">
                    Soft Skills
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200">
                  <p className="text-3xl font-bold text-purple-600 mb-1">87</p>
                  <p className="text-xs font-medium text-purple-700">
                    Leadership
                  </p>
                </div>
              </div>
            </div>
          </ChartContainer>

          {/* Top Repositories */}
          <ChartContainer
            title="Key Repository Contributions"
            subtitle="Primary projects where you've made significant impact"
          >
            <div className="space-y-4 p-6">
              {profile.topRepositories.map((repo, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{repo.repository}</h4>
                      <p className="text-sm text-muted-foreground">
                        {repo.role}
                      </p>
                    </div>
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        repo.impact === "high"
                          ? "bg-green-100 text-green-800 "
                          : repo.impact === "medium"
                            ? "bg-yellow-100 text-yellow-800 "
                            : "bg-gray-100 text-gray-800 "
                      }`}
                    >
                      {repo.impact} impact
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{repo.contributions} contributions</span>
                    <span>{repo.duration}</span>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                      style={{
                        width: `${Math.min(100, (repo.contributions / 500) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

        {/* Testimonials */}
        <ChartContainer
          title="Community Testimonials"
          subtitle="Feedback from contributors and maintainers you've worked with"
        >
          <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
            {profile.testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <p className="text-sm italic">"{testimonial.content}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                  <div>
                    <p className="font-medium text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.repository} •{" "}
                      {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        {/* Timeline Highlights */}
        <ChartContainer
          title="Career Timeline"
          subtitle="Major milestones and achievements in your maintainer journey"
        >
          <div className="relative p-6 pl-8">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full" />
            {[
              {
                date: "2024-03",
                event: "Reached 1000+ code reviews",
                type: "milestone",
                icon: "🏆",
              },
              {
                date: "2024-01",
                event: "Became Core Maintainer of awesome-project",
                type: "achievement",
                icon: "⭐",
              },
              {
                date: "2023-11",
                event: "Mentored 100th new contributor",
                type: "milestone",
                icon: "👥",
              },
              {
                date: "2023-08",
                event: "Led major v2.0 release coordination",
                type: "achievement",
                icon: "🚀",
              },
              {
                date: "2023-05",
                event: "Started contributing to open source",
                type: "start",
                icon: "🌟",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative flex items-start gap-6 pb-8 last:pb-0"
              >
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`h-12 w-12 rounded-full border-4 border-white flex items-center justify-center shadow-lg text-xl ${
                      item.type === "milestone"
                        ? "bg-gradient-to-br from-blue-500 to-blue-600"
                        : item.type === "achievement"
                          ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                          : "bg-gradient-to-br from-purple-500 to-purple-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <div className="rounded-xl border-2 border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-semibold text-base text-gray-900">
                        {item.event}
                      </p>
                      <span className="flex-shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {new Date(`${item.date}-01`).toLocaleDateString("en", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        {/* Export Actions */}
        <div className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Share Your Profile
          </h3>
          <p className="mb-6 text-sm text-gray-600">
            Your profile showcases verified contributions from GitHub. Share it
            with employers, communities, or include it in your professional
            portfolio.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <ExportButton pageName="contributor-profile" className="flex-1" />
            <button
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white py-3 px-4 font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              title="Coming soon"
            >
              <Linkedin className="h-5 w-5" />
              <span>Share on LinkedIn</span>
            </button>
            <button
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white py-3 px-4 font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              title="Coming soon"
            >
              <Link className="h-5 w-5" />
              <span>Copy Public URL</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
