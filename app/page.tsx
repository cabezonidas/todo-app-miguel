"use client";

import Summary from "@/app/components/Summary";
import AddTask from "@/app/components/AddTask";
import TaskList from "@/app/components/TaskList";
import { Task, useTasksList } from "@/app/hooks/useTasks";
import { useQueryClient } from "@tanstack/react-query";

const limit = 10;
export default function Home() {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, error } = useTasksList(limit);

  const handleToggleTask = (id: string) => {
    queryClient.setQueryData<Task[]>(
      useTasksList.queryKey(limit),
      (prevTasks) =>
        prevTasks?.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task,
        ),
    );
  };

  const handleAddTask = (title: string) => {
    const newTask = {
      id: `local-${Date.now()}`,
      title: title,
      completed: false,
    };
    queryClient.setQueryData<Task[]>(
      useTasksList.queryKey(limit),
      (prevTasks = []) => [newTask, ...prevTasks],
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-90">
      <Summary
        totalTasks={tasks?.length}
        completedTasks={tasks?.filter((task) => task.completed).length}
        pendingTasks={tasks?.filter((task) => !task.completed).length}
      />

      <AddTask onAddTask={handleAddTask} />

      {isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-700 font-medium">Error loading tasks</p>
          <p className="text-red-600 text-sm">{error.message}</p>
        </div>
      )}

      {!isLoading && tasks?.length ? (
        <div className="space-y-3">
          <TaskList tasks={tasks} onToggle={handleToggleTask} />
        </div>
      ) : null}

      {tasks?.length && !isLoading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600">No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
}
