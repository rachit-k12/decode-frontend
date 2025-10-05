"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendDirection?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  color?: "blue" | "green" | "orange" | "red" | "purple";
  className?: string;
}

const colorClasses = {
  blue: "bg-blue-50 border-blue-200",
  green: "bg-green-50 border-green-200",
  orange: "bg-orange-50 border-orange-200",
  red: "bg-red-50 border-red-200",
  purple: "bg-purple-50 border-purple-200",
};

const iconColorClasses = {
  blue: "text-blue-600",
  green: "text-green-600",
  orange: "text-orange-600",
  red: "text-red-600",
  purple: "text-purple-600",
};

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendDirection = "neutral",
  icon,
  color = "blue",
  className,
}: MetricCardProps) {
  const TrendIcon =
    trendDirection === "up"
      ? TrendingUp
      : trendDirection === "down"
        ? TrendingDown
        : Minus;
  const trendColor =
    trendDirection === "up"
      ? "text-green-600"
      : trendDirection === "down"
        ? "text-red-600"
        : "text-gray-600";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border p-3 transition-all hover:shadow-lg",
        colorClasses[color],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-semibold tracking-tight">
              {value}
            </span>
            {trend !== undefined && (
              <span className={cn("flex items-center text-xs", trendColor)}>
                <TrendIcon className="mr-1 h-3 w-3" />
                {Math.abs(trend)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={cn("rounded-lg p-2", iconColorClasses[color])}>
            {icon}
          </div>
        )}
      </div>
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/30" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/30" />
    </div>
  );
}
