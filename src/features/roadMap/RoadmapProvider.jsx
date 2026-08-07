import { createContext, useReducer } from "react";
import { initialFolders, RoadMapReducer } from "./RoadmapReducer";
const RoadmapContext = createContext();

function RoadmapProvider({ children }) {
  const [state, dispatch] = useReducer(RoadMapReducer, initialFolders);
  return (
    <RoadmapContext.Provider value={{ state, dispatch }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export { RoadmapProvider, RoadmapContext };
