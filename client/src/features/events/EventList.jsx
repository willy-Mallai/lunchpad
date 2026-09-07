import { Trash2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useEvent } from "./useEvent";
import { deleteEvent } from "./eventService";

function EventList({ event }) {
  const { formatTime, dispatch } = useEvent();

  const priorityStyles = {
    High: "bg-[#BD6C73]/15 text-[#BD6C73] border-[#BD6C73]/30",
    Medium: "bg-[#6B597F]/15 text-[#6B597F] border-[#6B597F]/30",
    Low: "bg-[#3F5B8D]/15 text-[#3F5B8D] border-[#3F5B8D]/30",
  };

  async function handledelete(eventId) {
    try {
      const event = await deleteEvent(eventId)
      dispatch({ type: "deleteEvent", payload: event});
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <li className="group p-4 rounded-xl bg-[#F0F4FA] border border-[#2E365A]/15 hover:border-[#3F5B8D]/40 transition-all duration-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white text-[#2E365A] text-xs font-semibold border border-[#2E365A]/15">
            <CalendarIcon className="w-3 h-3 text-[#6B597F]" />
            {event.date}
          </span>
          {event.time && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white text-[#2E365A] text-xs font-semibold border border-[#2E365A]/15">
              <Clock className="w-3 h-3 text-[#3F5B8D]" />
              {formatTime(event.time)}
            </span>
          )}
          <span
            className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${
              priorityStyles[event.priority] || priorityStyles.Low
            }`}
          >
            {event.priority}
          </span>
        </div>

        <h3 className="text-base font-bold text-[#2E365A] tracking-tight truncate">
          {event.title}
        </h3>

        {event.description && (
          <p className="text-xs text-[#6B597F] font-medium line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-end shrink-0">
        <button
          onClick={() => handledelete(event._id)}
          title="Delete Event"
          className="p-2 rounded-lg text-[#6B597F] hover:text-[#BD6C73] hover:bg-[#BD6C73]/10 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}

export default EventList;


