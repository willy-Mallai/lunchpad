import { useContext } from "react";
import { Link } from "react-router";
import { EventContext } from "../events/EventProvider";
import { Calendar, ArrowRight, Clock, PlusCircle } from "lucide-react";

function CurrentEventsWidget() {
  const { events, formatTime } = useContext(EventContext);
  const eventList = events || [];

  const getPriorityClass = (priority) => {
    const p = priority?.toLowerCase();
    if (p === "high" || p === "hard") {
      return "bg-[#BD6C73]/15 text-[#BD6C73] border-[#BD6C73]/30";
    }
    if (p === "medium") {
      return "bg-[#6B597F]/15 text-[#6B597F] border-[#6B597F]/30";
    }
    return "bg-[#3F5B8D]/15 text-[#3F5B8D] border-[#3F5B8D]/30";
  };

  return (
    <div className="p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#2E365A]/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#6B597F]/10 text-[#6B597F] border border-[#6B597F]/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#2E365A] tracking-tight">
              Current Events
            </h3>
            <p className="text-xs text-[#6B597F]">
              {eventList.length} scheduled event{eventList.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>
        <Link
          to="/event"
          className="p-2 rounded-xl bg-[#F0F4FA] hover:bg-[#3F5B8D] text-[#2E365A] hover:text-white border border-[#2E365A]/15 transition-all"
          title="Go to Event Management"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {eventList.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[#2E365A]/20 rounded-xl">
          <Calendar className="w-10 h-10 text-[#6B597F] mx-auto mb-2" />
          <p className="text-sm font-medium text-[#6B597F]">No events scheduled</p>
          <Link
            to="/event"
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B597F] bg-[#6B597F]/10 rounded-lg hover:bg-[#6B597F]/20 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add Event
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {eventList.slice(0, 4).map((ev) => (
            <div
              key={ev.id}
              className="p-3.5 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 hover:border-[#3F5B8D]/40 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-bold text-[#2E365A] truncate">
                  {ev.title}
                </h4>
                {ev.priority && (
                  <span
                    className={`px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded-md border ${getPriorityClass(
                      ev.priority
                    )}`}
                  >
                    {ev.priority}
                  </span>
                )}
              </div>

              {ev.description && (
                <p className="text-xs text-[#6B597F] line-clamp-2">
                  {ev.description}
                </p>
              )}

              <div className="flex items-center gap-3 text-[11px] text-[#6B597F] font-medium pt-1 border-t border-[#2E365A]/10">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#6B597F]" />
                  {ev.date}
                </span>
                {ev.time && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#3F5B8D]" />
                    {formatTime ? formatTime(ev.time) : ev.time}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CurrentEventsWidget;


