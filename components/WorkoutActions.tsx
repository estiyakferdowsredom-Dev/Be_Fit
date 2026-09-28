"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  addWorkout,
  hasWorkout,
  subscribeToWorkoutCollections,
} from "@/lib/workout-collections";

function ActionIcon({ saved = false, added = false }: { saved?: boolean; added?: boolean }) {
  if (added) {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m4 10 4 4 8-8" />
      </svg>
    );
  }

  return saved ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M5 3.5h10v13l-5-3-5 3v-13Z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

export default function WorkoutActions({ workoutId }: { workoutId: number }) {
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInPlan = useSyncExternalStore(
    subscribeToWorkoutCollections,
    () => hasWorkout("todayPlan", workoutId),
    () => false,
  );

  function addToCollection(collection: "todayPlan" | "saved") {
    const result = addWorkout(collection, workoutId);
    const message =
      result === "limit"
        ? "Today's plan is full. Finish a lift to make room."
        : collection === "todayPlan"
          ? result === "exists"
            ? "Already in today's plan"
            : "Added to today's plan"
          : result === "exists"
            ? "Already saved for later"
            : "Saved for later";
    setToast(message);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => setToast(""), 3000);
  }
  const isSaved = useSyncExternalStore(
    subscribeToWorkoutCollections,
    () => hasWorkout("saved", workoutId),
    () => false,
  );

  return (
    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToCollection("todayPlan")}
        disabled={isInPlan}
        aria-pressed={isInPlan}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#ccff00] px-5 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#dcff66] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00] disabled:cursor-default disabled:bg-[#34400b] disabled:text-[#d9ff66]"
      >
        <ActionIcon added={isInPlan} />
        {isInPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>
      <button
        type="button"
        onClick={() => addToCollection("saved")}
        disabled={isSaved}
        aria-pressed={isSaved}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/15 bg-[#15171b] px-5 text-xs font-bold uppercase tracking-wide text-zinc-200 transition hover:border-[#ccff00]/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00] disabled:cursor-default disabled:border-[#ccff00]/30 disabled:text-[#d9ff66]"
      >
        <ActionIcon saved={!isSaved} added={isSaved} />
        {isSaved ? "Saved for later" : "Save for later"}
      </button>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-md border border-[#ccff00]/30 bg-[#171a14] px-4 py-3 text-sm font-medium text-zinc-100 shadow-xl"
        >
          <ActionIcon added />
          {toast}
        </div>
      )}
    </div>
  );
}