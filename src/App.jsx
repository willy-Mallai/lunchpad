import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import TaskManagement from "./pages/TaskManagement";
import RoadMap from "./pages/RoadMap";
import EventManagement from "./pages/EventManagement";
import Setting from "./pages/Setting";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import { TaskProvider } from "./features/task/TaskProvider";
import { EventProvider } from "./features/events/EventProvider";
import { RoadmapProvider } from "./features/roadMap/RoadmapProvider";
import { StreakProvider } from "./features/setting/StreakProvider";
import { ProfileProvider } from "./features/setting/ProfileProvider";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <EventProvider>
          <RoadmapProvider>
            <StreakProvider>
              <ProfileProvider>
                <Routes>
                  <Route path="/" element={<Home />}>
                    <Route
                      index
                      element={<Navigate to="dashboard" replace />}
                    />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="task" element={<TaskManagement />} />
                    <Route path="roadMap" element={<RoadMap />} />
                    <Route path="event" element={<EventManagement />} />
                    <Route path="setting" element={<Setting />} />
                    <Route path="*" element={<PageNotFound />} />
                  </Route>
                </Routes>
              </ProfileProvider>
            </StreakProvider>
          </RoadmapProvider>
        </EventProvider>
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
