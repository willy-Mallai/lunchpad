import EventCalendar from "./EventCalendar";
import EventForm from "./EventForm";
import { useState } from "react";
import EventItem from "./EventItem";
import { SquarePen, Calendar as CalendarIcon } from "lucide-react";

function EventManager() {
  const [showModal, setShowModal] = useState(false);
  function handleOpen() {
    setShowModal(!showModal);
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#3F5B8D]/10 border border-[#3F5B8D]/20 text-[#3F5B8D]">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#2E365A]">
              Event Management
            </h2>
            <p className="text-sm text-[#6B597F] font-medium">
              Schedule, track, and manage your upcoming events
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Calendar & Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-md shadow-sm flex justify-center">
            <EventCalendar />
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-md shadow-sm">
            {showModal ? (
              <button
                onClick={handleOpen}
                className="w-full py-3.5 bg-[#3F5B8D] hover:bg-[#4E6EAA] text-white font-bold rounded-xl transition-all shadow-md shadow-[#3F5B8D]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
              >
                <SquarePen className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2E365A]/15">
                  <h3 className="text-sm font-bold text-[#2E365A]">Create Event</h3>
                  <button
                    onClick={handleOpen}
                    className="text-xs text-[#6B597F] hover:text-[#2E365A] font-semibold transition-colors cursor-pointer"
                  >
                    Hide Form
                  </button>
                </div>
                <EventForm />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Up-Coming Events */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white border border-[#2E365A]/15 backdrop-blur-md shadow-sm">
          <div className="pb-4 mb-4 border-b border-[#2E365A]/15">
            <h2 className="text-xl font-bold text-[#2E365A] tracking-tight">
              Up-Coming Events
            </h2>
          </div>
          <EventItem />
        </div>
      </div>
    </div>
  );
}

export default EventManager;


