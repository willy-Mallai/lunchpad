import { useContext, useState } from "react";
import TaskList from "./TaskList";
import { TaskContext } from "./TaskProvider";
import { Inbox } from "lucide-react";

function TaskItem() {
  const { state } = useContext(TaskContext);
  const [isEditingId, setIsEditingId] = useState(null);

  if (!state || state.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-[#2E365A]/20 rounded-xl">
        <div className="p-4 rounded-full bg-[#F0F4FA] text-[#6B597F] mb-3 border border-[#2E365A]/10">
          <Inbox className="w-8 h-8" />
        </div>
        <p className="text-[#2E365A] font-bold text-sm">No tasks found</p>
        <p className="text-xs text-[#6B597F] mt-1 font-medium">Add a task above to get started!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {state.map((task) => (
        <TaskList
          task={task}
          key={task.id}
          isEditingId={isEditingId}
          setIsEditingId={setIsEditingId}
        />
      ))}
    </ul>
  );
}

export default TaskItem;


