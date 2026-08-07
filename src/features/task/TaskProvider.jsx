import { createContext, useReducer } from "react";
import { taskReducer, initialTask } from "./TaskReducer";
const TaskContext = createContext();

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialTask);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider };
