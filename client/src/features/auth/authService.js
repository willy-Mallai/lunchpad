import axios from "axios"; // Assuming you'll use axios, but fetch() is fine too!
const API_URL = (import.meta.env.VITE_API_URL || "") + "/auth";

export const registerUser = async (name, email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/register`,
      {
        name,
        email,
        password,
      },
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong during registration",
      { cause: error },
    );
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      `${API_URL}/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );

    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Something went wrong during login",
      { cause: err },
    );
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/logout`,

      { withCredentials: true },
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message, { cause: err });
  }
  // 1. Make a POST request to `${API_URL}/logout`
  // 2. REMEMBER: pass withCredentials: true so the backend knows WHICH cookie to delete
  // 3. Return the response data
};

export const checkAuthSession = async () => {
  try {
    const res = await axios.get(`${API_URL}/authenticated`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const sendVerifyOtp = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/send-otp`,
      {},
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to send OTP", {
      cause: err,
    });
  }
};

export const verifyEmail = async (email, otp) => {
  try {
    const res = await axios.post(
      `${API_URL}/verify-email`,
      { email, otp },
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to verify email", {
      cause: err,
    });
  }
};

export const sendResetOtp = async (email) => {
  try {
    const res = await axios.post(
      `${API_URL}/send-reset-otp`,
      { email },
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to send reset OTP", {
      cause: err,
    });
  }
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const res = await axios.post(
      `${API_URL}/reset-password`,
      { email, otp, newPassword },
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to reset password", {
      cause: err,
    });
  }
};
