import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL + "/task";
export const getTask = async () => {
  try {
    const res = await axios.get(`${API_URL}/get-task`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (err) {
    console.log(err);
  }
};

export const addTask = async (title, priority) => {
  try {
    const res = await axios.post(
      `${API_URL}/add-task`,
      { title, priority },
      { withCredentials: true },
    );
    return res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await axios.delete(`${API_URL}/delete-task/${taskId}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const updateTask = async (taskId, updateTask) => {
  try {
    const res = await axios.put(
      `${API_URL}/update-task/${taskId}`,
      updateTask,
      { withCredentials: true },
    );
    return res.data.data;
  } catch (err) {
    console.log(err.message);
  }
};
