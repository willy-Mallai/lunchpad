import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import TaskManagement from "./pages/TaskManagement";
import RoadMap from "./pages/RoadMap";
import EventManagement from "./pages/EventManagement";
import Setting from "./pages/Setting";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AppProviders from "./AppProviders";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="task" element={<TaskManagement />} />
            <Route path="roadmap" element={<RoadMap />} />
            <Route path="event" element={<EventManagement />} />
            <Route path="setting" element={<Setting />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
