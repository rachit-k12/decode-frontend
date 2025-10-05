"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUsername } from "@/contexts/UsernameContext";
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
  ChevronLeft,
  Search,
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
  const [inputValue, setInputValue] = useState("");
  const pathname = usePathname();
  const { username, setUsername } = useUsername();

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setUsername(inputValue.trim());
    }
  };

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
          sidebarOpen
            ? "w-72"
            : "-translate-x-full w-72 lg:translate-x-0 lg:w-72",
          sidebarCollapsed && "lg:w-20"
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

        {/* Username Input Section */}
        {!sidebarCollapsed && (
          <div className="px-4 py-4 border-b border-gray-200 bg-gray-50">
            <form onSubmit={handleUsernameSubmit} className="space-y-2">
              <label
                htmlFor="username"
                className="text-xs font-medium text-gray-700"
              >
                GitHub Username
              </label>
              <div className="flex gap-2">
                <input
                  id="username"
                  type="text"
                  placeholder="Enter username..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {username && (
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Current: {username}</span>
                  <button
                    type="button"
                    onClick={() => setUsername("")}
                    className="text-red-600 hover:text-red-700"
                  >
                    Clear
                  </button>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navigation.map((item) => {
              // Exact match for /dashboard to avoid matching all sub-routes
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname === item.href ||
                    pathname?.startsWith(item.href + "/");
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
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header - Fixed */}
        <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-lg font-semibold">Maintainer Dashboard</h2>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 pt-16 lg:pt-0">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
