import { TaskProvider } from "./features/task/TaskProvider";
import { EventProvider } from "./features/events/EventProvider";
import { RoadmapProvider } from "./features/roadMap/RoadmapProvider";
import { StreakProvider } from "./features/setting/StreakProvider";
import { ProfileProvider } from "./features/setting/ProfileProvider";
import { AuthProvider } from "./features/auth/AuthProvider";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <TaskProvider>
      <EventProvider>
        <RoadmapProvider>
          <StreakProvider>
            <ProfileProvider>
              {children}
            </ProfileProvider>
          </StreakProvider>
        </RoadmapProvider>
      </EventProvider>
    </TaskProvider>
    </AuthProvider>
  );
}

export default AppProviders;
