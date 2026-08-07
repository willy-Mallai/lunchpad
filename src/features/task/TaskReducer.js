const initialTask = [];

function taskReducer(state, action) {
  switch (action.type) {
    case "addTask": {
      const { title, priority } = action.payload;
      return [...state, { id: Date.now(), title, priority, completed: false }];
    }
    case "toggleComplete":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
    case "deleteTask":
      return state.filter((task) => task.id !== action.payload);
    case "editTask": {
      const { editTask, isEditingId } = action.payload;
      return state.map((task) =>
        task.id === isEditingId ? { ...task, title: editTask } : task,
      );
    }

    default:
      return state;
  }
}

export { taskReducer, initialTask };
