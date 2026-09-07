import axios from "axios";

// Notice this is pointing to `/user` instead of `/auth`!
const API_URL = import.meta.env.VITE_API_URL + "/user";

// Fetch the user's profile data
// Fetch the user's profile data
export const getUserProfile = async () => {
  try {
    const res = await axios.get(`${API_URL}/profile`, {
      withCredentials: true,
    });

    // Return the data so ProfileProvider can use it!
    // (Note: Adjust 'res.data.data' to just 'res.data' if your backend doesn't nest it)
    return res.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message, { cause: error });
  }
};

// Update the user's profile data
export const updateUserProfile = async (username, bio) => {
  try {
    const res = await axios.put(
      `${API_URL}/profile`,
      { username, bio },
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to update profile", {
      cause: err,
    });
  }
};

export const getStreak = async () => {
  try {
    const res = await axios.get(`${API_URL}/streak`, { withCredentials: true });

    return res.data.data;
  } catch (err) {
    console.log(err.messagee);
  }
};

export const updateStreak = async () => {
  try {
    const res = await axios.put(
      `${API_URL}/streak`,
      {},
      { withCredentials: true },
    );
    return res.data.data;
  } catch (err) {
    console.log(err.messagee);
  }
};
