"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Eye,
  Heart,
  AlertTriangle,
  Clock,
  FolderOpen,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Main dashboard metrics",
  },
  {
    name: "Invisible Labor",
    href: "/dashboard/invisible-labor",
    icon: Eye,
    description: "Track hidden contributions",
  },
  {
    name: "Sentiment Analysis",
    href: "/dashboard/sentiment",
    icon: Heart,
    description: "Community health metrics",
  },
  {
    name: "Burnout Assessment",
    href: "/dashboard/burnout",
    icon: AlertTriangle,
    description: "Monitor risk indicators",
  },
  {
    name: "Activity Timeline",
    href: "/dashboard/timeline",
    icon: Clock,
    description: "Contribution history",
  },
  {
    name: "Repository Health",
    href: "/dashboard/repositories",
    icon: FolderOpen,
    description: "Project metrics",
  },
  {
    name: "Contribution Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Your achievements",
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 lg:relative lg:z-auto",
          sidebarOpen ? "w-72" : "w-0 lg:w-72",
          sidebarCollapsed && "lg:w-20",
          !sidebarOpen && "lg:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <div
            className={cn(
              "flex items-center space-x-3",
              sidebarCollapsed && "lg:justify-center"
            )}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">M</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-lg font-semibold">Maintainer</h2>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden rounded-lg p-1 hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:block rounded-lg p-1 hover:bg-accent"
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform",
                sidebarCollapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100",
                      sidebarCollapsed && "lg:justify-center lg:px-2"
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon
                      className={cn("h-5 w-5", !sidebarCollapsed && "mr-3")}
                    />
                    {!sidebarCollapsed && (
                      <div className="flex-1">
                        <div>{item.name}</div>
                        {!isActive && (
                          <div className="text-xs text-gray-500">
                            {item.description}
                          </div>
                        )}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-200 p-4">
          <div
            className={cn(
              "space-y-2",
              sidebarCollapsed && "lg:flex lg:flex-col lg:items-center"
            )}
          >
            <button
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
                sidebarCollapsed && "lg:w-auto lg:px-2"
              )}
            >
              <Settings
                className={cn("h-5 w-5", !sidebarCollapsed && "mr-3")}
              />
              {!sidebarCollapsed && "Settings"}
            </button>
            <button
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent text-red-600",
                sidebarCollapsed && "lg:w-auto lg:px-2"
              )}
            >
              <LogOut className={cn("h-5 w-5", !sidebarCollapsed && "mr-3")} />
              {!sidebarCollapsed && "Sign out"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-accent lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Last sync: 5 minutes ago
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium">Alex Chen</div>
                <div className="text-xs text-muted-foreground">@alexchen</div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
