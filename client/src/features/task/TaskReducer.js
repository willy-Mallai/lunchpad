const initialTask = [];

function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD_TASKS":
      return action.payload;
    case "addTask": {
      return [...state, action.payload];
    }

    case "deleteTask":
      return state.filter((task) => task._id !== action.payload);
    case "editTask": {
      return state.map((task) =>
        task._id === action.payload._id ? action.payload : task,
      );
    }

    default:
      return state;
  }
}

export { taskReducer, initialTask };
