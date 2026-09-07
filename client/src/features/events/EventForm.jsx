import { CirclePlus, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useEvent } from "./useEvent";
import { addEvent } from "./eventService";

function EventForm() {
  const { selectedDate, dispatch, formatDate } = useEvent();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("Low");
  const date = formatDate(selectedDate);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const data = await addEvent(title, description, time, priority, date);
      dispatch({
        type: "addEvent",
        payload: data,
      });
    } catch (err) {
      console.log(err.message);
    }

    setTitle("");
    setDescription("");
    setTime("");
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D] text-xs font-bold">
        <CalendarIcon className="w-3.5 h-3.5" />
        <span>{date}</span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-[#6B597F] uppercase tracking-wider mb-1">
            Event Title
          </label>
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#F0F4FA] border border-[#2E365A]/20 rounded-xl text-[#2E365A] font-medium placeholder-[#6B597F]/60 focus:outline-none focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15 transition-all text-sm"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#6B597F] uppercase tracking-wider mb-1">
            Description
          </label>
          <textarea
            placeholder="Add your events.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-[#F0F4FA] border border-[#2E365A]/20 rounded-xl text-[#2E365A] font-medium placeholder-[#6B597F]/60 focus:outline-none focus:border-[#3F5B8D] focus:ring-2 focus:ring-[#3F5B8D]/15 transition-all text-sm resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#6B597F] uppercase tracking-wider mb-1">
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F0F4FA] border border-[#2E365A]/20 rounded-xl text-[#2E365A] font-medium focus:outline-none focus:border-[#3F5B8D] transition-all text-sm cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6B597F] uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#F0F4FA] border border-[#2E365A]/20 rounded-xl text-[#2E365A] font-medium focus:outline-none focus:border-[#3F5B8D] transition-all text-sm cursor-pointer"
            >
              <option value="High" className="bg-white text-[#2E365A]">
                High
              </option>
              <option value="Medium" className="bg-white text-[#2E365A]">
                Medium
              </option>
              <option value="Low" className="bg-white text-[#2E365A]">
                Low
              </option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!title.trim()}
        className="w-full py-3 bg-[#3F5B8D] hover:bg-[#4E6EAA] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md shadow-[#3F5B8D]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
      >
        <CirclePlus className="w-5 h-5" />
        <span>Add Event</span>
      </button>
    </form>
  );
}

export default EventForm;
