import { createContext, useEffect, useReducer, useRef } from "react";
import { initialFolders, RoadMapReducer } from "./RoadmapReducer";
import { getRoadmap, saveRoadmap } from "./roadmapService";
import { useAuth } from "../auth/useAuth";

const RoadmapContext = createContext();

function RoadmapProvider({ children }) {
  const [state, dispatch] = useReducer(RoadMapReducer, initialFolders);
  const { isAuthenticated } = useAuth();

  // Track if the initial load is done so we don't save on first fetch!
  const isLoaded = useRef(false);

  // Step 1: Load from database on login
  useEffect(() => {
    if (!isAuthenticated) return;
    async function fetchRoadmap() {
      try {
        const roadmap = await getRoadmap();
        dispatch({ type: "LOAD_ROADMAP", payload: roadmap.folders });
      } catch (err) {
        console.log(err.message);
      } finally {
        isLoaded.current = true;
      }
    }
    fetchRoadmap();
  }, [isAuthenticated]);

  // Step 2: Auto-save whenever state changes (but NOT on the first load!)
  useEffect(() => {
    if (!isLoaded.current) return;
    saveRoadmap(state);
  }, [state]);

  return (
    <RoadmapContext.Provider value={{ state, dispatch }}>
      {children}
    </RoadmapContext.Provider>
  );
}

export { RoadmapProvider, RoadmapContext };
