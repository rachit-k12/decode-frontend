// Dashboard Types for Invisible Labor Tracking

export interface MaintainerMetrics {
  invisibleLaborScore: number;
  reviewImpactScore: number;
  communityEngagement: number;
  burnoutRisk: number;
  sentimentScore: number;
  totalRepositories: number;
  weeklyActivity: ActivityData[];
  sentimentTrend: TrendData[];
  activityDistribution: CategoryData[];
  responseTime: number;
  totalContributions: number;
  mentorshipHours: number;
}

export interface ActivityData {
  date: string;
  reviews: number;
  triage: number;
  mentorship: number;
  documentation: number;
  discussions: number;
  total: number;
}

export interface TrendData {
  date: string;
  value: number;
  label?: string;
}

export interface CategoryData {
  category: string;
  value: number;
  percentage: number;
  color: string;
}

export interface RepositoryHealth {
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
  sentiment: "positive" | "neutral" | "negative";
  stars: number;
  forks: number;
}

export interface CommunityMetric {
  thankYouMessages: number;
  helpedContributors: number;
  mentorshipSessions: number;
  conflictsResolved: number;
  documentationImproved: number;
  communityGrowth: number;
}

export interface BurnoutIndicator {
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
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
}

export interface ContributionProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  achievements: Achievement[];
  skills: SkillMetric[];
  testimonials: Testimonial[];
  impactSummary: ImpactSummary;
  topRepositories: RepositoryContribution[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: "bronze" | "silver" | "gold" | "platinum";
  earnedDate: string;
  category: string;
}

export interface SkillMetric {
  skill: string;
  score: number;
  maxScore: number;
  category: "technical" | "soft" | "leadership";
}

export interface Testimonial {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  repository: string;
}

export interface ImpactSummary {
  totalReviews: number;
  issuesTriaged: number;
  contributorsHelped: number;
  documentationPages: number;
  communityImpact: number;
  timeInvested: number;
}

export interface RepositoryContribution {
  repository: string;
  role: string;
  contributions: number;
  impact: "high" | "medium" | "low";
  duration: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type:
    | "review"
    | "triage"
    | "mentorship"
    | "documentation"
    | "discussion"
    | "release";
  title: string;
  description: string;
  repository: string;
  impact: number;
  linkedPR?: string;
  linkedIssue?: string;
}

export interface SentimentAnalysis {
  score: number;
  trend: "improving" | "stable" | "declining";
  wordFrequency: Array<{
    word: string;
    count: number;
    sentiment: "positive" | "negative" | "neutral";
  }>;
  feedbackDistribution: {
    constructive: number;
    appreciative: number;
    critical: number;
    neutral: number;
  };
  topPositiveFeedback: string[];
  concernAreas: string[];
}
