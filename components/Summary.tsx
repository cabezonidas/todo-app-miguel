interface SummaryProps {
  totalTasks?: number;
  completedTasks?: number;
  pendingTasks?: number;
}

export default function Summary({
  totalTasks = 8,
  completedTasks = 5,
  pendingTasks = 3,
}: Readonly<SummaryProps>) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <SummaryItem value={totalTasks} label="Total Tasks" color="bg-gray-500" />
      <SummaryItem
        value={completedTasks}
        label="Completed"
        color="bg-green-800"
      />
      <SummaryItem value={pendingTasks} label="Pending" color="bg-red-800" />
    </div>
  );
}

interface SummaryItemProps {
  value: number;
  label: string;
  color: string;
}

export function SummaryItem({
  value,
  label,
  color,
}: Readonly<SummaryItemProps>) {
  return (
    <div
      className={`${color} rounded-xl p-4 text-white text-center animate-slide-in`}
      style={{ animationDelay: `0.1s` }}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  );
}
