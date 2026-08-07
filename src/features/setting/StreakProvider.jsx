import { createContext, useReducer } from "react";
import { initialState, streakReducer } from "./streakReducer";
const StreakContext = createContext();
function StreakProvider({ children }) {
  const [state, dispatch] = useReducer(streakReducer, initialState);
  return (
    <StreakContext.Provider value={{ state, dispatch }}>
      {children}
    </StreakContext.Provider>
  );
}

export { StreakProvider, StreakContext };
