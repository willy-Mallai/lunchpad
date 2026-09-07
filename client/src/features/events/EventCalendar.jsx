import Calendar from "react-calendar";
import "../../styles/calendar.css";
import { useEvent } from "./useEvent";

function EventCalendar() {
  const { setSelectedDate, selectedDate, events, formatDate } = useEvent();
  return (
    <div>
      <Calendar
        className="rounded-xl border bg-white p-4 shadow"
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          const currentDate = formatDate(date);

          const hasEvent = events.some((event) => event.date === currentDate);

          return hasEvent ? <div className="event-dot" /> : null;
        }}
      />
    </div>
  );
}

export default EventCalendar;
