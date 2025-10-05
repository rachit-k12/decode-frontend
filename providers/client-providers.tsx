"use client";

import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UsernameProvider } from "@/contexts/UsernameContext";
import { useState } from "react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a QueryClient instance for each client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Good defaults for data fetching
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
            retry: 3,
            refetchOnWindowFocus: false,
            enabled: true, // Will be controlled per-query based on username
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UsernameProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </UsernameProvider>
      {/* Add React Query Devtools in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
