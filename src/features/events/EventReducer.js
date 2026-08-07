const initialEvents = [
  {
    id: 1,
    title: "React Interview",
    description: "Frontend technical interview with ABC Technologies.",
    date: "2026-07-25",
    time: "10:00",
    priority: "High",
  },
  {
    id: 2,
    title: "Team Meeting",
    description: "Weekly sprint planning with the development team.",
    date: "2026-07-25",
    time: "14:00",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Project Submission",
    description: "Submit LaunchPad milestone to GitHub.",
    date: "2026-07-26",
    time: "18:00",
    priority: "High",
  },
  {
    id: 4,
    title: "Gym Session",
    description: "Leg day workout.",
    date: "2026-07-27",
    time: "07:00",
    priority: "Low",
  },
];

function eventReducer(state, action) {
  switch (action.type) {
    case "addEvent": {
      const { title, description, time, priority, date } = action.payload;
      return [
        ...state,
        { id: Date.now(), title, description, time, date, priority },
      ];
    }
    case "deleteEvent":
      return state.filter((event) => event.id !== action.payload);

    default:
      return;
  }
}

export { eventReducer, initialEvents };
