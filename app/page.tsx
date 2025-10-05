import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Heart,
  Shield,
  TrendingUp,
  Users,
  Award,
  BarChart3,
  GitPullRequest,
} from "lucide-react";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/forms/button";

const features = [
  {
    icon: Eye,
    title: "Make Invisible Work Visible",
    description:
      "Track code reviews, issue triage, mentorship, and documentation - not just commits.",
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-950/30",
  },
  {
    icon: Heart,
    title: "Sentiment Analysis",
    description:
      "Monitor community health and feedback patterns to maintain positive environments.",
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-950/30",
  },
  {
    icon: Shield,
    title: "Burnout Prevention",
    description:
      "AI-powered risk assessment with actionable recommendations for sustainable maintenance.",
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-950/30",
  },
  {
    icon: TrendingUp,
    title: "Impact Metrics",
    description:
      "Quantify your true contribution beyond lines of code with comprehensive analytics.",
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-950/30",
  },
  {
    icon: Award,
    title: "Achievement Recognition",
    description:
      "Earn badges and build a professional profile showcasing your maintainer expertise.",
    color: "text-pink-600",
    bgColor: "bg-pink-100 dark:bg-pink-950/30",
  },
  {
    icon: Users,
    title: "Community Insights",
    description:
      "Understand contributor patterns and optimize your project for collaboration.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-100 dark:bg-indigo-950/30",
  },
];

const stats = [
  { value: "67%", label: "of maintainer work is invisible" },
  { value: "58%", label: "have considered quitting" },
  { value: "2.3x", label: "more time on non-code tasks" },
  { value: "94%", label: "report increased stress" },
];

const testimonials = [
  {
    quote:
      "Finally, a tool that recognizes the hours I spend reviewing PRs and helping new contributors. This dashboard transformed how I communicate my value.",
    author: "Sarah Chen",
    role: "Vue.js Core Team",
    avatar: "/api/placeholder/48/48",
  },
  {
    quote:
      "The burnout prevention features saved my career. I could see the warning signs and take action before hitting the wall.",
    author: "Marcus Johnson",
    role: "React Native Maintainer",
    avatar: "/api/placeholder/48/48",
  },
  {
    quote:
      "My employer finally understands what maintaining open source actually means. The PDF export feature is brilliant for performance reviews.",
    author: "Elena Rodriguez",
    role: "Kubernetes Contributor",
    avatar: "/api/placeholder/48/48",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">M</span>
              </div>
              <span className="text-xl font-semibold">
                Maintainer Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-lg border px-8 font-medium transition-colors hover:bg-accent"
              >
                View Live Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-semibold tracking-tight lg:text-6xl leading-tight">
              Your Invisible Labor,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Finally Visible
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground lg:text-xl leading-relaxed max-w-2xl mx-auto">
              Two-thirds of maintainer work goes unrecognized. Track code
              reviews, issue triage, mentorship, and community building.
              Transform invisible contributions into measurable impact.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-lg border px-8 font-medium transition-colors hover:bg-accent"
              >
                View Live Demo
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-card/50 border"
              >
                <div className="text-4xl font-semibold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="border-t py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-3xl font-semibold">
              The Crisis No One Talks About
            </h2>
            <p className="mb-8 text-center text-lg text-muted-foreground leading-relaxed">
              Open source runs the world, but the people maintaining it are
              burning out at alarming rates.
            </p>
            <div className="rounded-lg border bg-card p-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-950/30">
                    <GitPullRequest className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Invisible by Default
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Traditional metrics only show commits, ignoring 67% of
                      actual maintainer work like reviews, triage, and
                      mentorship.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-950/30">
                    <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      No Recognition System
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Maintainers can't demonstrate their value to employers or
                      communities, leading to undervaluation and lack of
                      support.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-950/30">
                    <BarChart3 className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">
                      Burnout Epidemic
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      58% of maintainers have quit or considered quitting.
                      Without visibility into workload and impact, burnout
                      becomes inevitable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold">
              Everything You Need to Thrive
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Comprehensive tools designed specifically for the unique
              challenges of open source maintenance
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20"
              >
                <div
                  className={`mb-4 inline-flex rounded-lg p-3 ${feature.bgColor}`}
                >
                  <feature.icon
                    className={`h-6 w-6 ${feature.color} dark:opacity-90`}
                  />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold">
              Loved by Maintainers Worldwide
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join thousands of maintainers who've transformed their open source
              journey
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-6 hover:border-primary/20 transition-colors"
              >
                <p className="mb-6 text-sm leading-relaxed text-foreground/90">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-12 text-center text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-semibold">
              Start Making Your Work Visible
            </h2>
            <p className="mb-8 text-lg opacity-95 leading-relaxed max-w-2xl mx-auto">
              Join the movement to create a sustainable open source ecosystem
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/signin"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 font-medium text-gray-900 transition-all hover:bg-gray-100"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-8 font-medium backdrop-blur transition-all hover:bg-white/20"
              >
                Explore Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">M</span>
              </div>
              <span className="text-lg font-semibold">
                Maintainer Dashboard
              </span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/docs"
                className="hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/blog"
                className="hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © 2025 Maintainer Dashboard. Building a sustainable open source
            ecosystem.
          </div>
        </div>
      </footer>
    </div>
  );
}
