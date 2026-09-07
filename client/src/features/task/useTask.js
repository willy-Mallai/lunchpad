import { useContext } from "react";
import { TaskContext } from "./TaskProvider";

export function useTask() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTask must be used inside TaskProvider");
  return ctx;
}
