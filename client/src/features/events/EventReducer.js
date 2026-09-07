const initialEvents = [];

function eventReducer(state, action) {
  switch (action.type) {
    case "LOAD_EVENTS":
      return action.payload;
    case "addEvent":
      return [...state, action.payload];

    case "deleteEvent":
      return state.filter((event) => event._id !== action.payload);

    default:
      return state;
  }
}

export { eventReducer, initialEvents };
