import axios from "axios";
const API_URL = (import.meta.env.VITE_API_URL || "") + "/event";

export const getEvent = async () => {
  try {
    const res = await axios.get(`${API_URL}/get-event`, {
      withCredentials: true,
    });

    return res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const addEvent = async (title, description, time, priority, date) => {
  try {
    const res = await axios.post(
      `${API_URL}/add-event`,
      { title, description, time, priority, date },
      {
        withCredentials: true,
      },
    );

    return res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const res = await axios.delete(`${API_URL}/delete-event/${eventId}`, {
      withCredentials: true,
    });
    
    return res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};
