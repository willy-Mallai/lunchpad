import { createContext, useEffect, useReducer } from "react";
import { profileReducer, initialState } from "./profileReducer";

import { getUserProfile } from "./userService";
import { useAuth } from "../auth/useAuth";

const ProfileContext = createContext();
function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) return;
    async function fetchUserProfile() {
      try {
        const data = await getUserProfile();

        dispatch({ type: "UPDATE_FIELD", field: "name", value: data.name });
        dispatch({ type: "UPDATE_FIELD", field: "email", value: data.email });
        dispatch({ type: "UPDATE_FIELD", field: "bio", value: data.bio });
        dispatch({
          type: "UPDATE_FIELD",
          field: "username",
          value: data.username,
        });
        // (Do this for username and bio too!)
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchUserProfile();
  }, [isAuthenticated]);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
}

export { ProfileProvider, ProfileContext };
