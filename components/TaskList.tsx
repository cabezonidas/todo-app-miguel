interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

function TaskItem({ task, onToggle }: Readonly<TaskItemProps>) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border-2 hover:shadow-md transition-all duration-200 ${
        task.completed
          ? "border-gray-100 bg-green-50"
          : "border-gray-100 bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-lg border-2 border-gray-300 ${
          task.completed
            ? "text-green-600 focus:ring-2 focus:ring-green-500"
            : "text-purple-600 focus:ring-2 focus:ring-purple-500"
        } cursor-pointer`}
      />
      <span
        className={`flex-1 font-medium ${
          task.completed ? "text-gray-500 line-through" : "text-gray-700"
        }`}
      >
        {task.title}
      </span>
    </div>
  );
}

interface TaskListProps {
  tasks?: Task[];
  onToggle?: (id: string) => void;
}

export default function TaskList({
  tasks = [
    {
      id: "1",
      title: "Complete project documentation",
      completed: false,
    },
    {
      id: "2",
      title: "Review pull requests",
      completed: true,
    },
    {
      id: "3",
      title: "Fix critical bug in production",
      completed: false,
    },
    { id: "4", title: "Update dependencies", completed: true },
    {
      id: "5",
      title: "Design new landing page",
      completed: false,
    },
    { id: "6", title: "Attend team meeting", completed: true },
    { id: "7", title: "Prepare presentation slides", completed: true },
    { id: "8", title: "Send weekly report", completed: true },
  ],
  onToggle = () => {},
}: Readonly<TaskListProps>) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
}
