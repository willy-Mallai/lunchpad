import { createContext, useReducer } from "react";
import { profileReducer, initialState } from "./profileReducer";

const ProfileContext = createContext();
function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileProvider, ProfileContext };
