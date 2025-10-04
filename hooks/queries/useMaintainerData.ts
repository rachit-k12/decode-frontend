import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS, type ActivityFilters } from "@/shared/query-keys";
import { api, buildUrl } from "@/lib/api";
import type { Maintainer, Activity, SentimentData } from "@/shared/types";

export function useMaintainerProfile(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.maintainer.detail(id),
    queryFn: () => api.get<Maintainer>(`/api/maintainer/${id}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMaintainerActivity(id: string, filters?: ActivityFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.maintainer.activity(id, filters),
    queryFn: () => {
      const url = buildUrl(
        `/api/maintainer/${id}/activity`,
        filters as Record<string, string>
      );
      return api.get<Activity[]>(url);
    },
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useMaintainerSentiment(id: string, timeRange?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.maintainer.sentiment(id, timeRange),
    queryFn: () => {
      const url = buildUrl(`/api/maintainer/${id}/sentiment`, { timeRange });
      return api.get<SentimentData[]>(url);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMaintainerCV(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.maintainer.cv(id),
    queryFn: () =>
      api.get<{
        maintainer: Maintainer;
        activities: Activity[];
        stats: {
          totalContributions: number;
          repositoriesContributedTo: number;
          yearsActive: number;
        };
      }>(`/api/maintainer/${id}/cv`),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
