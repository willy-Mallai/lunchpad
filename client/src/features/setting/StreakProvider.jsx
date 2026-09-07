import { createContext, useEffect, useReducer } from "react";
import { initialState, streakReducer } from "./streakReducer";
import { getStreak } from "./userService";
import { useAuth } from "../auth/useAuth";
const StreakContext = createContext();
function StreakProvider({ children }) {
  const [state, dispatch] = useReducer(streakReducer, initialState);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) return;
    async function loadStreak() {
      try {
        const data = await getStreak();

        dispatch({ type: "SET_STREAK", payload: data });
      } catch (err) {
        console.log(err.message);
      }
    }
    loadStreak();
  }, [isAuthenticated]);

  return (
    <StreakContext.Provider value={{ state, dispatch }}>
      {children}
    </StreakContext.Provider>
  );
}

export { StreakProvider, StreakContext };
