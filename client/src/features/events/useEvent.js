import { useContext } from "react";
import { EventContext } from "./EventProvider";

export function useEvent() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error("useEvent must be used inside EventProvider");
  return ctx;
}
