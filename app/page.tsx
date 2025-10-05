import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Heart,
  Shield,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { FooziLogo } from "@/components/FooziLogo";

const features = [
  {
    icon: Eye,
    title: "Make Invisible Work Visible",
    description:
      "Track code reviews, issue triage, mentorship, and documentation.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Heart,
    title: "Sentiment Analysis",
    description: "Monitor community health and feedback patterns.",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: Shield,
    title: "Burnout Prevention",
    description: "AI-powered risk assessment with actionable recommendations.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    icon: TrendingUp,
    title: "Impact Metrics",
    description: "Quantify your contributions with comprehensive analytics.",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
];

const stats = [
  { value: "67%", label: "Work is invisible" },
  { value: "58%", label: "Consider quitting" },
  { value: "2.3x", label: "Time on non-code" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FooziLogo />
              <span className="text-2xl font-semibold text-gray-900">
                Foozi
              </span>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 px-6 text-base text-white transition-all hover:from-indigo-700 hover:to-indigo-800 hover:shadow-lg shadow-indigo-500/30 active:scale-95"
            >
              View Live Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/50 px-4 py-1.5 text-sm text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Track Your Invisible Work
            </div>

            <h1 className="mb-8 text-4xl tracking-tight text-gray-900 lg:text-6xl">
              Your Invisible Labor,{" "}
              <span className="text-indigo-600">Finally Visible</span>
            </h1>

            <p className="mb-12 text-md text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Track code reviews, issue triage, mentorship, and community
              building. Transform invisible contributions into measurable
              impact.
            </p>

            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 px-8 text-lg text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-700 hover:to-indigo-800 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              View Live Demo
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-28 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
              >
                <div className="text-3xl text-indigo-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-10 text-center">
            <h2 className="text-5xl text-gray-900">Everything You Need</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:shadow-md hover:border-gray-300"
              >
                <div
                  className={`mb-3 inline-flex rounded-lg p-2.5 ${feature.bgColor} transition-transform group-hover:scale-110`}
                >
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <h3 className="mb-2 text-lg text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 flex justify-center">
          <div className="max-w-4xl w-full rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-12 text-center shadow-xl border border-gray-700">
            <h2 className="mb-4 text-3xl text-white">
              Start Making Your Work Visible
            </h2>
            <p className="mb-8 text-base text-gray-300 leading-relaxed">
              Join thousands of maintainers tracking their impact
            </p>

            <Link
              href="/dashboard"
              className="group inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 text-base text-gray-900 shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center space-x-3">
              <FooziLogo />
              <span className="text-xl font-semibold text-gray-900">Foozi</span>
            </div>
            <p className="text-sm text-gray-600 text-center max-w-md">
              Building a sustainable open source ecosystem for maintainers
              worldwide
            </p>
            <div className="text-sm text-gray-500">
              © 2025 Foozi. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
