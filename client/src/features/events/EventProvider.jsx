import { createContext, useEffect, useReducer, useState } from "react";
import { eventReducer, initialEvents } from "./EventReducer";

import { useAuth } from "../auth/useAuth";
import { getEvent } from "./eventService";
const EventContext = createContext();

function EventProvider({ children }) {
  const [events, dispatch] = useReducer(eventReducer, initialEvents);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) return;
    async function fetchEvent() {
      try {
        const events = await getEvent();
        dispatch({ type: "LOAD_EVENTS", payload: events });
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchEvent();
  }, [isAuthenticated]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatTime(time) {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return (
    <EventContext.Provider
      value={{
        events,
        dispatch,
        formatDate,
        formatTime,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export { EventContext, EventProvider };
