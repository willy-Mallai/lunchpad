import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/roadmap";

export const getRoadmap = async () => {
  try {
    const res = await axios.get(`${API_URL}/get-roadmap`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const saveRoadmap = async (folders) => {
  try {
    const res = await axios.put(
      `${API_URL}/save-roadmap`,
      { folders },
      { withCredentials: true },
    );
    return res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};
