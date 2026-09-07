import { useTask } from "../task/useTask";
import { useEvent } from "../events/useEvent";
import { useRoadmap } from "../roadMap/useRoadmap";
import { ListTodo, Calendar, Milestone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

function DashboardMetrics() {
  const { state: tasksState } = useTask();
  const { events } = useEvent();
  const { state: roadmapState } = useRoadmap();

  const pendingTasks = (tasksState || []).filter((t) => !t.completed).length;
  const totalEvents = (events || []).length;
  const roadmapCount = (roadmapState || []).length;

  const metrics = [
    {
      title: "Pending Tasks",
      value: pendingTasks,
      to: "/task",
      icon: ListTodo,
      iconBg: "bg-[#3F5B8D]/10 text-[#3F5B8D] border-[#3F5B8D]/20",
      description: "Tasks awaiting action",
    },
    {
      title: "Upcoming Events",
      value: totalEvents,
      to: "/event",
      icon: Calendar,
      iconBg: "bg-[#BD6C73]/10 text-[#BD6C73] border-[#BD6C73]/20",
      description: "Scheduled calendar items",
    },
    {
      title: "Active Milestones",
      value: roadmapCount,
      to: "/roadMap",
      icon: Milestone,
      iconBg: "bg-[#6B597F]/10 text-[#6B597F] border-[#6B597F]/20",
      description: "Learning roadmap topics",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <Link
            key={m.title}
            to={m.to}
            className="group relative p-5 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm hover:border-[#3F5B8D]/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl border ${m.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="p-1 rounded-lg text-[#6B597F] opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            <div className="mt-4 space-y-1">
              <div className="text-3xl font-extrabold text-[#2E365A]">
                {m.value}
              </div>
              <div className="text-sm font-bold text-[#2E365A]">{m.title}</div>
              <p className="text-xs text-[#6B597F] font-medium">{m.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default DashboardMetrics;
