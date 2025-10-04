import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api";

interface ActivityFilters {
  type?: string;
  dateRange?: string;
}

export function useMaintainerProfile(id: string) {
  return useQuery({
    queryKey: ["maintainer", id],
    queryFn: () => fetchAPI<any>(`/api/maintainer/${id}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMaintainerActivity(id: string, filters?: ActivityFilters) {
  return useQuery({
    queryKey: ["maintainer", id, "activity", filters],
    queryFn: () => {
      const params = new URLSearchParams(filters as Record<string, string>);
      const url = `/api/maintainer/${id}/activity?${params}`;
      return fetchAPI<any[]>(url);
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useMaintainerSentiment(id: string, timeRange?: string) {
  return useQuery({
    queryKey: ["maintainer", id, "sentiment", timeRange],
    queryFn: () => {
      const params = new URLSearchParams({ timeRange: timeRange || "" });
      const url = `/api/maintainer/${id}/sentiment?${params}`;
      return fetchAPI<any[]>(url);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMaintainerCV(id: string) {
  return useQuery({
    queryKey: ["maintainer", id, "cv"],
    queryFn: () =>
      fetchAPI<{
        maintainer: any;
        activities: any[];
        stats: {
          totalContributions: number;
          repositoriesContributedTo: number;
          yearsActive: number;
        };
      }>(`/api/maintainer/${id}/cv`),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
