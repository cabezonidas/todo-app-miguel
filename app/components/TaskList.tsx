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
      className={`flex items-center gap-4 p-4 rounded-xl border-2 hover:shadow-md transition-all duration-200 cursor-pointer ${
        task.completed
          ? "border-gray-100 bg-green-50"
          : "border-gray-100 bg-white"
      }`}
    >
      <input
        onChange={() => onToggle(task.id)}
        type="checkbox"
        checked={task.completed}
        aria-label={task.title}
        className={`w-6 h-6 rounded-lg border-2 border-gray-300 cursor-pointer`}
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
  tasks = [],
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
