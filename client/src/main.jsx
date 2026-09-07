import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If the backend says 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // PREVENT INFINITE LOOP: Only redirect if they are NOT already on the login or register page!
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        console.log("Session expired! Kicking back to login...");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
