import { createContext, useEffect, useReducer } from "react";
import { taskReducer, initialTask } from "./TaskReducer";
import { getTask } from "./taskService";
import { useAuth } from "../auth/useAuth";
const TaskContext = createContext();

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialTask);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) return;
    async function fetchTasks() {
      try {
        const tasks = await getTask();

        dispatch({ type: "LOAD_TASKS", payload: tasks });
      } catch (err) {
        console.log(err.message);
      }
    }

    // 5. Run the function!
    fetchTasks();
  }, [isAuthenticated]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export { TaskContext, TaskProvider };
