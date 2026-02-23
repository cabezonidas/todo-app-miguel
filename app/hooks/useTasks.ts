import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getTasks, getTaskById } from "@/app/lib/fetcher";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function useTasksList(
  limit: number = 1000,
): UseQueryResult<Task[], Error> {
  return useQuery({
    queryKey: ["tasks", limit],
    queryFn: () => getTasks(limit),
  });
}

/**
 * Hook to fetch a single task by ID using React Query
 * @param id - Task ID
 * @returns UseQueryResult with task data
 */
export function useTask(id: number): UseQueryResult<Task | null, Error> {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
    enabled: !!id, // Only run query if id is provided
  });
}
