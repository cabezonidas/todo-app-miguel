import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getTasks, getTaskById } from "@/app/lib/fetcher";
import { useEffect, useState } from "react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const queryKeyFn = (limit: number) => ["tasks", limit];
export function useTasksList(
  limit: number = 1000,
): UseQueryResult<Task[], Error> {
  return useQuery({
    queryKey: queryKeyFn(limit),
    queryFn: () => getTasks(limit),
  });
}
useTasksList.queryKey = queryKeyFn;

/**
 * Hook to fetch a single task by ID using React Query
 * @param id - Task ID
 * @returns UseQueryResult with task data
 */
export function useTask(id: number): UseQueryResult<Task | null, Error> {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => getTaskById(id),
  });
}

export const useGetTasksCustom = () => {
  const [data, setQueryData] = useState<Task[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    getTasks(10)
      .then(setQueryData)
      .catch((e) => setError(e as Error))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error, setQueryData };
};
