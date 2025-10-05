import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "@/lib/api";

// Main dashboard data interface matching the API response
export interface DashboardData {
  metrics: {
    invisibleLaborScore: number;
    reviewImpactScore: number;
    communityEngagement: number;
    burnoutRisk: number;
    sentimentScore: number;
    totalRepositories: number;
    responseTime: number;
    totalContributions: number;
    mentorshipHours: number;
    weeklyActivity: Array<{
      date: string;
      reviews: number;
      triage: number;
      mentorship: number;
      documentation: number;
      discussions: number;
      total: number;
    }>;
    sentimentTrend: Array<{
      date: string;
      value: number;
      label: string;
    }>;
    activityDistribution: Array<{
      category: string;
      value: number;
      percentage: number;
      color: string;
    }>;
  };
  burnout: {
    riskScore: number;
    riskLevel: string;
    indicators: {
      workload: number;
      responseTime: number;
      sentimentDrop: number;
      activitySpikes: number;
      weekendWork: number;
    };
    recommendations: string[];
    recoveryMetrics: {
      daysOff: number;
      delegatedTasks: number;
      reducedScope: number;
    };
    // TODO: Backend needs to add this field per OPENAPI_SPEC_COMPLETE.md
    trends?: {
      responseTime: Array<{ date: string; value: number }>;
      activityLevel: Array<{ date: string; value: number }>;
      sentiment: Array<{ date: string; value: number }>;
    };
  };
  sentiment: {
    score: number;
    trend: string;
    wordFrequency: Array<{
      word: string;
      count: number;
      sentiment: string;
    }>;
    feedbackDistribution: {
      constructive: number;
      appreciative: number;
      critical: number;
      neutral: number;
    };
    topPositiveFeedback: string[];
    concernAreas: string[];
    // TODO: Backend needs to add this field per OPENAPI_SPEC_COMPLETE.md
    multiLineTrend?: {
      overall: Array<{ date: string; value: number }>;
      reviews: Array<{ date: string; value: number }>;
      discussions: Array<{ date: string; value: number }>;
    };
  };
  communityMetrics: {
    thankYouMessages: number;
    helpedContributors: number;
    mentorshipSessions: number;
    conflictsResolved: number;
    documentationImproved: number;
    communityGrowth: number;
  };
  profile: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    joinedDate: string;
    achievements: any[];
    skills: Array<{
      skill: string;
      score: number;
      maxScore: number;
      category: string;
    }>;
    testimonials: any[];
    impactSummary: {
      totalReviews: number;
      issuesTriaged: number;
      contributorsHelped: number;
      documentationPages: number;
      communityImpact: number;
      timeInvested: number;
    };
    topRepositories: Array<{
      repository: string;
      role: string;
      contributions: number;
      impact: string;
      duration: string;
    }>;
    // TODO: Backend needs to add this field per OPENAPI_SPEC_COMPLETE.md
    skillsRadar?: Array<{
      skill: string;
      value: number;
      fullMark: number;
    }>;
  };
  // TODO: Backend needs to add this entire object per OPENAPI_SPEC_COMPLETE.md
  analytics?: {
    activityHeatmap: Array<{
      day: string;
      hour: number;
      intensity: number;
    }>;
    contributorGrowth: {
      total: Array<{ date: string; value: number }>;
      new: Array<{ date: string; value: number }>;
      returning: Array<{ date: string; value: number }>;
    };
    issueResolutionFunnel: Array<{
      stage: string;
      count: number;
      percentage: number;
    }>;
    impactTimeline: Array<{
      date: string;
      type: string;
      title: string;
      impact: number;
      responses: number;
      color: string;
    }>;
    cumulativeLabor: Array<{
      date: string;
      reviews: number;
      triage: number;
      mentorship: number;
      documentation: number;
      discussions: number;
    }>;
  };
  alerts: any[];
  recentActivity: Array<{
    id: string;
    timestamp: string;
    type: string;
    title: string;
    description: string;
    repository: string;
    impact: number;
    linkedPR: string | null;
    linkedIssue: string | null;
  }>;
  repositoryHealth: Array<{
    id: string;
    name: string;
    healthScore: number;
    contributors: number;
    activeContributors: number;
    issuesResolved: number;
    issuesOpen: number;
    prsMerged: number;
    prsOpen: number;
    lastActivity: string;
    responseTime: number;
    sentiment: string;
    stars: number;
    forks: number;
  }>;
}

// Main hook to fetch all dashboard data
export function useDashboardData(username: string) {
  return useQuery<DashboardData>({
    queryKey: ["dashboard", username],
    queryFn: () => fetchDashboardData(username),
    enabled: !!username, // Only fetch when username is provided
    staleTime: 30 * 1000, // 30 seconds
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

// Removed unused endpoints - only using /api/v1/dashboard/{username} from backend
