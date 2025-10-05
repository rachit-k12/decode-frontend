"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUsername } from "@/contexts/UsernameContext";
import { FooziLogo } from "@/components/FooziLogo";
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
  Github,
  CheckCircle,
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
  const pathname = usePathname();
  const { username, setUsername } = useUsername();
  const [inputValue, setInputValue] = useState(username || "");

  // Sync inputValue with username from context
  useEffect(() => {
    setInputValue(username || "");
  }, [username]);

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
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-xl transition-all duration-300 lg:relative lg:z-auto lg:shadow-none",
          sidebarOpen
            ? "w-80"
            : "-translate-x-full w-80 lg:translate-x-0 lg:w-80",
          sidebarCollapsed && "lg:w-20"
        )}
      >
        {/* Sidebar Header */}
        <div
          className={cn(
            "flex items-center border-b border-gray-100",
            sidebarCollapsed
              ? "h-16 justify-center px-2"
              : "h-16 justify-between px-6"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              sidebarCollapsed && "lg:justify-center"
            )}
          >
            <FooziLogo className="h-8 w-8" />
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Foozi</h2>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden rounded-xl p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block rounded-xl p-2 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft
                  className={cn(
                    "h-6 w-6 text-gray-500 transition-transform",
                    sidebarCollapsed && "rotate-180"
                  )}
                />
              </button>
            </>
          )}
        </div>

        {/* Collapsed state expand button */}
        {sidebarCollapsed && (
          <div className="hidden lg:flex justify-center py-2 border-b border-gray-100">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
              aria-label="Expand sidebar"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500 rotate-180" />
            </button>
          </div>
        )}

        {/* Username Input Section */}
        {!sidebarCollapsed && (
          <div className="px-4 py-6 border-b border-gray-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/30">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-gray-600" />
                <label
                  htmlFor="username"
                  className="text-sm font-semibold text-gray-900"
                >
                  GitHub Username
                </label>
              </div>

              <form onSubmit={handleUsernameSubmit} className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter GitHub username..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleUsernameSubmit(e);
                      }
                    }}
                    className="w-full rounded-xl border-2 border-gray-200 pl-10 pr-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm hover:border-gray-300"
                  />
                </div>

                <p className="text-[13px] text-gray-500 flex items-center gap-1">
                  Try "sarah_maintainer", "riley_contrib", "jamie_oss",
                  "morgan_code", or "alex_dev" for sample data
                </p>
              </form>

              {/* Current Username Display */}
              {username && (
                <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">
                      {username}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUsername("");
                      setInputValue("");
                    }}
                    className="text-xs text-red-600 hover:text-red-700 px-1 py-0.5 rounded hover:bg-red-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Quick Actions */}
              {!username && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (inputValue.trim()) {
                        setUsername(inputValue.trim());
                      } else {
                        setInputValue("sarah_maintainer");
                        setUsername("sarah_maintainer");
                      }
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors border border-blue-200"
                  >
                    Try Demo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setInputValue("");
                      setUsername("");
                    }}
                    className="text-sm text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors border border-gray-200"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto py-4",
            sidebarCollapsed ? "px-2" : "px-3"
          )}
        >
          <ul className="space-y-1">
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
                      "group flex items-center rounded-xl text-base font-medium transition-all duration-200 relative",
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-700 hover:bg-gray-100 active:scale-95",
                      sidebarCollapsed ? "justify-center p-3 mx-1" : "px-4 py-2"
                    )}
                    onClick={() => setSidebarOpen(false)}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-all",
                        isActive
                          ? "text-white"
                          : "text-gray-600 group-hover:text-blue-600",
                        !sidebarCollapsed && "mr-3"
                      )}
                    >
                      <item.icon className="h-6 w-6" />
                    </div>
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div
                          className={cn(
                            "font-medium truncate",
                            isActive ? "text-white" : "text-gray-900"
                          )}
                        >
                          {item.name}
                        </div>
                        <div
                          className={cn(
                            "text-xs font-light truncate mt-0.5",
                            isActive ? "text-blue-100" : "text-gray-500/80"
                          )}
                        >
                          {item.description}
                        </div>
                      </div>
                    )}
                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-300 mt-0.5">
                          {item.description}
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
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
            <Menu className="h-7 w-7" />
          </button>
          <div className="flex-1 flex items-center justify-center gap-2">
            <FooziLogo className="h-6 w-6" />
            <h2 className="text-lg font-semibold">Foozi</h2>
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
