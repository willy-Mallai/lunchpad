import { useContext } from "react";
import { StreakContext } from "./StreakProvider";

export function useStreak() {
  const ctx = useContext(StreakContext);
  if (!ctx) throw new Error("useStreak must be used inside StreakProvider");
  return ctx;
}
