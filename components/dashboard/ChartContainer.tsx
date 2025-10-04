"use client";

import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  options?: Array<{ label: string; onClick: () => void }>;
}

export function ChartContainer({
  title,
  subtitle,
  children,
  className,
  action,
  options,
}: ChartContainerProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-medium">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {action}
          {options && options.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-lg p-1 hover:bg-accent">
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {options.map((option, index) => (
                  <DropdownMenuItem key={index} onClick={option.onClick}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
