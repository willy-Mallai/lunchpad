import { useState } from "react";
import EventList from "./EventList";
import { useEvent } from "./useEvent";
import { CalendarDays, Filter } from "lucide-react";

function EventItem() {
  const { events, selectedDate, formatDate } = useEvent();
  const [filter, setFilter] = useState("all");
  const filteredEvents = (events || []).filter((event) => {
    if (filter === "month") {
      const today = new Date();
      const currentMonthStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
      ).padStart(2, "0")}`;
      return event.date?.startsWith(currentMonthStr);
    }
    if (filter === "selected") {
      const selectedStr = formatDate(selectedDate);
      return event.date === selectedStr;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-[#2E365A]/15">
        <div className="flex items-center gap-1.5 text-xs text-[#6B597F] font-bold uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#3F5B8D]" />
          <span>Filter:</span>
        </div>
        <div className="flex items-center gap-1 bg-[#F0F4FA] p-1 rounded-xl border border-[#2E365A]/15 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#3F5B8D] text-white shadow-xs"
                : "text-[#6B597F] hover:text-[#2E365A]"
            }`}
          >
            All ({events.length})
          </button>
          <button
            onClick={() => setFilter("month")}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              filter === "month"
                ? "bg-[#3F5B8D] text-white shadow-xs"
                : "text-[#6B597F] hover:text-[#2E365A]"
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setFilter("selected")}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              filter === "selected"
                ? "bg-[#3F5B8D] text-white shadow-xs"
                : "text-[#6B597F] hover:text-[#2E365A]"
            }`}
          >
            Selected Day
          </button>
        </div>
      </div>

      {/* Events List / Empty State */}
      {filteredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-[#2E365A]/20 rounded-xl">
          <div className="p-4 rounded-full bg-[#F0F4FA] text-[#6B597F] mb-3 border border-[#2E365A]/10">
            <CalendarDays className="w-8 h-8" />
          </div>
          <p className="text-[#2E365A] font-bold text-sm">No events found</p>
          <p className="text-xs text-[#6B597F] mt-1 font-medium">
            {filter === "month"
              ? "There are no events scheduled for this month."
              : filter === "selected"
                ? "There are no events scheduled for the selected day."
                : "Add an event above to get started!"}
          </p>
        </div>
      ) : (
        <ul className="space-y-3.5">
          {filteredEvents.map((event) => (
            <EventList event={event} key={event._id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventItem;
