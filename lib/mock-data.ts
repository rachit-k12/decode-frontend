// Mock Data for Maintainer Dashboard
import type {
  MaintainerMetrics,
  RepositoryHealth,
  CommunityMetric,
  BurnoutIndicator,
  ContributionProfile,
  TimelineEvent,
  SentimentAnalysis,
  ActivityData,
  TrendData,
  CategoryData,
} from "@/types/dashboard";

// Generate dates for the last 30 days
const generateDates = (days: number): string[] => {
  const dates = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

// Weekly Activity Data
const generateWeeklyActivity = (): ActivityData[] => {
  const dates = generateDates(7);
  return dates
    .map((date) => ({
      date,
      reviews: Math.floor(Math.random() * 15) + 5,
      triage: Math.floor(Math.random() * 20) + 8,
      mentorship: Math.floor(Math.random() * 10) + 2,
      documentation: Math.floor(Math.random() * 8) + 1,
      discussions: Math.floor(Math.random() * 12) + 3,
      total: 0,
    }))
    .map((item) => ({
      ...item,
      total:
        item.reviews +
        item.triage +
        item.mentorship +
        item.documentation +
        item.discussions,
    }));
};

// Sentiment Trend Data
const generateSentimentTrend = (): TrendData[] => {
  const dates = generateDates(30);
  let value = 65;
  return dates.map((date) => {
    value = Math.max(40, Math.min(90, value + (Math.random() - 0.45) * 5));
    return {
      date,
      value: Math.round(value),
      label: value > 70 ? "Positive" : value > 50 ? "Neutral" : "Concerning",
    };
  });
};

// Activity Distribution Data
const activityDistribution: CategoryData[] = [
  { category: "Code Reviews", value: 35, percentage: 35, color: "#6366f1" },
  { category: "Issue Triage", value: 28, percentage: 28, color: "#10b981" },
  { category: "Mentorship", value: 18, percentage: 18, color: "#f59e0b" },
  { category: "Documentation", value: 12, percentage: 12, color: "#8b5cf6" },
  { category: "Discussions", value: 7, percentage: 7, color: "#ec4899" },
];

// Main Maintainer Metrics
export const mockMaintainerMetrics: MaintainerMetrics = {
  invisibleLaborScore: 847,
  reviewImpactScore: 92,
  communityEngagement: 78,
  burnoutRisk: 42,
  sentimentScore: 73,
  totalRepositories: 8,
  weeklyActivity: generateWeeklyActivity(),
  sentimentTrend: generateSentimentTrend(),
  activityDistribution,
  responseTime: 4.2,
  totalContributions: 1247,
  mentorshipHours: 156,
};

// Repository Health Data
export const mockRepositories: RepositoryHealth[] = [
  {
    id: "1",
    name: "awesome-project",
    healthScore: 85,
    contributors: 234,
    activeContributors: 42,
    issuesResolved: 156,
    issuesOpen: 23,
    prsMerged: 89,
    prsOpen: 12,
    lastActivity: "2 hours ago",
    responseTime: 3.5,
    sentiment: "positive",
    stars: 3420,
    forks: 567,
  },
  {
    id: "2",
    name: "ui-component-lib",
    healthScore: 72,
    contributors: 156,
    activeContributors: 28,
    issuesResolved: 98,
    issuesOpen: 45,
    prsMerged: 67,
    prsOpen: 18,
    lastActivity: "5 hours ago",
    responseTime: 6.2,
    sentiment: "neutral",
    stars: 1890,
    forks: 234,
  },
  {
    id: "3",
    name: "data-pipeline",
    healthScore: 68,
    contributors: 89,
    activeContributors: 15,
    issuesResolved: 67,
    issuesOpen: 34,
    prsMerged: 45,
    prsOpen: 8,
    lastActivity: "1 day ago",
    responseTime: 8.7,
    sentiment: "neutral",
    stars: 890,
    forks: 123,
  },
  {
    id: "4",
    name: "cli-toolkit",
    healthScore: 91,
    contributors: 312,
    activeContributors: 67,
    issuesResolved: 234,
    issuesOpen: 12,
    prsMerged: 145,
    prsOpen: 5,
    lastActivity: "30 minutes ago",
    responseTime: 2.1,
    sentiment: "positive",
    stars: 5670,
    forks: 890,
  },
];

// Community Metrics
export const mockCommunityMetrics: CommunityMetric = {
  thankYouMessages: 234,
  helpedContributors: 156,
  mentorshipSessions: 42,
  conflictsResolved: 8,
  documentationImproved: 23,
  communityGrowth: 28,
};

// Burnout Indicators
export const mockBurnoutIndicator: BurnoutIndicator = {
  riskScore: 42,
  riskLevel: "medium",
  indicators: {
    workload: 65,
    responseTime: 45,
    sentimentDrop: 30,
    activitySpikes: 55,
    weekendWork: 40,
  },
  recommendations: [
    "Consider delegating code review responsibilities for 1-2 repositories",
    'Set specific "no-code" hours to maintain work-life balance',
    "Take a 2-day break from non-critical issues",
    "Enable auto-response for weekends",
    "Schedule regular breaks between intense review sessions",
  ],
  recoveryMetrics: {
    daysOff: 3,
    delegatedTasks: 12,
    reducedScope: 20,
  },
};

// Contribution Profile
export const mockContributionProfile: ContributionProfile = {
  name: "Alex Chen",
  username: "alexchen",
  avatar: "/api/placeholder/150/150",
  bio: "Open source maintainer passionate about building sustainable communities and empowering developers.",
  joinedDate: "2019-03-15",
  achievements: [
    {
      id: "1",
      title: "Community Guardian",
      description: "Resolved 10+ community conflicts with positive outcomes",
      icon: "shield",
      level: "gold",
      earnedDate: "2024-01-15",
      category: "community",
    },
    {
      id: "2",
      title: "Review Master",
      description: "Reviewed 1000+ pull requests with constructive feedback",
      icon: "star",
      level: "platinum",
      earnedDate: "2024-03-20",
      category: "reviews",
    },
    {
      id: "3",
      title: "Mentor",
      description: "Helped 50+ new contributors make their first contribution",
      icon: "users",
      level: "gold",
      earnedDate: "2023-12-10",
      category: "mentorship",
    },
    {
      id: "4",
      title: "Documentation Hero",
      description: "Improved documentation for 20+ projects",
      icon: "book",
      level: "silver",
      earnedDate: "2024-02-28",
      category: "documentation",
    },
  ],
  skills: [
    { skill: "Code Review", score: 95, maxScore: 100, category: "technical" },
    { skill: "Issue Triage", score: 88, maxScore: 100, category: "technical" },
    { skill: "Mentorship", score: 92, maxScore: 100, category: "soft" },
    { skill: "Documentation", score: 78, maxScore: 100, category: "technical" },
    {
      skill: "Conflict Resolution",
      score: 85,
      maxScore: 100,
      category: "soft",
    },
    {
      skill: "Community Building",
      score: 90,
      maxScore: 100,
      category: "leadership",
    },
    {
      skill: "Technical Leadership",
      score: 87,
      maxScore: 100,
      category: "leadership",
    },
    { skill: "Communication", score: 94, maxScore: 100, category: "soft" },
  ],
  testimonials: [
    {
      id: "1",
      author: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      content:
        "Alex's thorough reviews helped me become a better developer. Always patient and constructive!",
      date: "2024-03-15",
      repository: "awesome-project",
    },
    {
      id: "2",
      author: "Mike Wilson",
      avatar: "/api/placeholder/40/40",
      content:
        "The best maintainer I've worked with. Goes above and beyond to help contributors.",
      date: "2024-03-10",
      repository: "cli-toolkit",
    },
    {
      id: "3",
      author: "Emily Davis",
      avatar: "/api/placeholder/40/40",
      content:
        "Transformed our chaotic repo into a well-organized, contributor-friendly project.",
      date: "2024-02-28",
      repository: "ui-component-lib",
    },
  ],
  impactSummary: {
    totalReviews: 1247,
    issuesTriaged: 892,
    contributorsHelped: 156,
    documentationPages: 45,
    communityImpact: 94,
    timeInvested: 1560,
  },
  topRepositories: [
    {
      repository: "awesome-project",
      role: "Core Maintainer",
      contributions: 456,
      impact: "high",
      duration: "3 years",
    },
    {
      repository: "cli-toolkit",
      role: "Lead Maintainer",
      contributions: 324,
      impact: "high",
      duration: "2 years",
    },
    {
      repository: "ui-component-lib",
      role: "Maintainer",
      contributions: 198,
      impact: "medium",
      duration: "1 year",
    },
  ],
};

// Timeline Events
export const mockTimelineEvents: TimelineEvent[] = [
  {
    id: "1",
    timestamp: "2024-03-25T14:30:00Z",
    type: "review",
    title: "Reviewed critical security fix",
    description:
      "Identified and helped fix a security vulnerability in authentication flow",
    repository: "awesome-project",
    impact: 95,
    linkedPR: "#1234",
  },
  {
    id: "2",
    timestamp: "2024-03-25T11:15:00Z",
    type: "mentorship",
    title: "Guided new contributor",
    description:
      "Helped first-time contributor submit their first PR successfully",
    repository: "cli-toolkit",
    impact: 75,
  },
  {
    id: "3",
    timestamp: "2024-03-25T09:00:00Z",
    type: "triage",
    title: "Triaged 15 issues",
    description:
      "Organized and prioritized incoming issues for sprint planning",
    repository: "ui-component-lib",
    impact: 60,
  },
  {
    id: "4",
    timestamp: "2024-03-24T16:45:00Z",
    type: "documentation",
    title: "Updated API documentation",
    description: "Rewrote getting started guide for better clarity",
    repository: "data-pipeline",
    impact: 70,
  },
  {
    id: "5",
    timestamp: "2024-03-24T13:20:00Z",
    type: "discussion",
    title: "Resolved architecture debate",
    description: "Facilitated consensus on new microservices architecture",
    repository: "awesome-project",
    impact: 85,
    linkedIssue: "#567",
  },
];

// Sentiment Analysis
export const mockSentimentAnalysis: SentimentAnalysis = {
  score: 73,
  trend: "improving",
  wordFrequency: [
    { word: "helpful", count: 45, sentiment: "positive" },
    { word: "thorough", count: 38, sentiment: "positive" },
    { word: "patient", count: 32, sentiment: "positive" },
    { word: "slow", count: 12, sentiment: "negative" },
    { word: "detailed", count: 28, sentiment: "positive" },
    { word: "responsive", count: 25, sentiment: "positive" },
    { word: "complex", count: 15, sentiment: "neutral" },
    { word: "excellent", count: 22, sentiment: "positive" },
  ],
  feedbackDistribution: {
    constructive: 45,
    appreciative: 38,
    critical: 12,
    neutral: 5,
  },
  topPositiveFeedback: [
    "Your reviews are always thorough and educational",
    "Thank you for taking the time to explain the concepts",
    "Best maintainer experience I've had",
    "Really appreciate your patience with newcomers",
  ],
  concernAreas: [
    "Response times during weekends",
    "Some PRs take longer to review",
    "Documentation could be more detailed",
  ],
};
