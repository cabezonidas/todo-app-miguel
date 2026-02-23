"use client";

import { useState, useEffect } from "react";
import Summary from "@/components/Summary";
import AddTask from "@/components/AddTask";
import TaskList from "@/components/TaskList";
import { useTasksList } from "@/app/hooks/useTasks";

export default function Home() {
  const { data: apiTasks = [], isLoading, error } = useTasksList(10);
  const [tasks, setTasks] = useState(apiTasks);

  // Update tasks when API data changes
  useEffect(() => {
    if (apiTasks.length > 0) {
      setTasks(apiTasks);
    }
  }, [apiTasks]);

  const handleToggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
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
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg bg-opacity-90">
      <Summary
        totalTasks={tasks.length}
        completedTasks={tasks.filter((task) => task.completed).length}
        pendingTasks={tasks.filter((task) => !task.completed).length}
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

      {!isLoading && tasks.length > 0 && (
        <div className="space-y-3">
          <TaskList tasks={tasks} onToggle={handleToggleTask} />
        </div>
      )}

      {tasks.length === 0 && !isLoading && !error && (
        <div className="text-center py-8">
          <p className="text-gray-600">No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
}
