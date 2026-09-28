"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  getCompletedIdsSnapshot,
  getWorkoutIdsSnapshot,
  markWorkoutDone,
  removeWorkout,
  subscribeToWorkoutCollections,
} from "@/lib/workout-collections";
import type { Workout } from "@/lib/workouts";

type PlanTab = "todayPlan" | "saved";
type SortKey = "duration" | "caloriesBurned" | "rating";

export default function MyPlanContent({ workouts }: { workouts: Workout[] }) {
  const [activeTab, setActiveTab] = useState<PlanTab>("todayPlan");
  const [sortKey, setSortKey] = useState<SortKey>("duration");
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const planIdsSnapshot = useSyncExternalStore(
    subscribeToWorkoutCollections,
    () => getWorkoutIdsSnapshot("todayPlan"),
    () => "[]",
  );
  const savedIdsSnapshot = useSyncExternalStore(
    subscribeToWorkoutCollections,
    () => getWorkoutIdsSnapshot("saved"),
    () => "[]",
  );
  const completedIdsSnapshot = useSyncExternalStore(
    subscribeToWorkoutCollections,
    getCompletedIdsSnapshot,
    () => "[]",
  );
  const planIds = JSON.parse(planIdsSnapshot) as number[];
  const savedIds = JSON.parse(savedIdsSnapshot) as number[];
  const completedIds = JSON.parse(completedIdsSnapshot) as number[];
  const workoutIds = activeTab === "todayPlan" ? planIds : savedIds;
  const selectedWorkouts = workoutIds
    .map((id) => workouts.find((workout) => workout.id === id))
    .filter((workout): workout is Workout => workout !== undefined)
    .toSorted((left, right) => left[sortKey] - right[sortKey]);

  const plannedWorkouts = planIds
    .map((id) => workouts.find((workout) => workout.id === id))
    .filter((workout): workout is Workout => workout !== undefined);
  const totalMinutes = plannedWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );
  const totalCalories = plannedWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }
    toastTimer.current = setTimeout(() => setToast(""), 3000);
  }

  useEffect(
    () => () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    },
    [],
  );

  return (
    <section className="mx-auto w-full max-w-[936px] flex-1 px-5 py-8 sm:px-6 sm:py-10 md:px-0">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-(family-name:--font-oswald) text-2xl leading-none font-bold uppercase text-white sm:text-3xl">
            My Plan
          </h1>
          <p className="mt-2 text-xs text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
      </div>

      <div className="mt-5 grid min-h-20 grid-cols-3 divide-x divide-white/8 rounded-lg border border-white/8 bg-[#1b1d22] px-2 py-3 sm:mt-6 sm:min-h-24 sm:px-5 sm:py-4">
        {[
          ["Exercises", planIds.length],
          ["Minutes", totalMinutes],
          ["Calories", totalCalories],
        ].map(([label, value], index) => (
          <div key={label} className="flex flex-col justify-center px-2 sm:px-5">
            <p className="text-[9px] text-zinc-400 sm:text-[10px]">{label}</p>
            <p className={`mt-1 font-(family-name:--font-oswald) text-2xl leading-none font-bold sm:text-3xl ${index === 0 ? "text-[#ccff00]" : "text-white"}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 sm:mt-6">
        <div
          role="tablist"
          aria-label="Workout collections"
          className="inline-flex rounded-md border border-white/[0.07] bg-[#1b1d22] p-1"
        >
          {([
            ["todayPlan", "Today's Plan", planIds.length],
            ["saved", "Saved", savedIds.length],
          ] as const).map(([tab, label, count]) => (
            <button
              key={tab}
              id={`${tab}-tab`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls="workout-collection-panel"
              onClick={() => setActiveTab(tab)}
              className={`inline-flex min-h-8 items-center gap-2 rounded px-3 text-[10px] font-semibold transition-colors sm:text-xs ${
                activeTab === tab
                  ? "bg-[#272a30] text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {label}
              <span className="text-[10px] text-zinc-500">{count}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[10px] text-zinc-500">
          Sort By
          <span className="relative">
            <select
              aria-label="Sort workouts"
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
              className="h-8 appearance-none rounded-md border border-white/[0.08] bg-[#1b1d22] py-1 pl-2 pr-7 text-[10px] text-zinc-200 outline-none focus:border-[#ccff00]/50"
            >
              <option value="duration">Duration</option>
              <option value="caloriesBurned">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="pointer-events-none absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </span>
        </label>
      </div>

      <div
        id="workout-collection-panel"
        role="tabpanel"
        aria-labelledby={`${activeTab}-tab`}
        className="pt-4"
      >
        {selectedWorkouts.length ? (
          <div className="space-y-2.5">
            {selectedWorkouts.map((workout) => (
              <article
                key={workout.id}
                className="grid grid-cols-[76px_minmax(0,1fr)] gap-x-3 gap-y-3 rounded-lg border border-white/[0.07] bg-[#1b1d22] p-3 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:px-3 sm:py-2.5"
              >
                <div className="relative h-[60px] w-[76px] overflow-hidden rounded-md bg-[#202328] sm:h-[70px] sm:w-28">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 self-center">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate font-(family-name:--font-oswald) text-base font-bold uppercase leading-tight text-white">
                      {workout.name}
                    </h2>
                    {activeTab === "todayPlan" && completedIds.includes(workout.id) && (
                      <span className="shrink-0 rounded-sm border border-[#ccff00]/25 bg-[#ccff00]/10 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-[#d9ff66]">
                        Done
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[10px] text-zinc-400">
                    {workout.equipment}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] text-zinc-300 sm:text-[10px]">
                    <span className="inline-flex items-center gap-1">
                      <span aria-hidden="true" className="text-zinc-400">◷</span>
                      {workout.duration} min
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span aria-hidden="true" className="text-[#ccff00]">♨</span>
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span aria-hidden="true" className="text-[#ccff00]">★</span>
                      {workout.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 flex flex-wrap items-center gap-2 sm:col-span-1 sm:justify-end">
                    <Link
                      href={`/Workouts/${workout.id}`}
                      className="inline-flex min-h-8 items-center rounded-md border border-white/[0.12] px-3 text-[9px] font-medium text-zinc-200 transition hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]"
                    >
                      View Details
                    </Link>
                    {activeTab === "todayPlan" && (
                      <button
                        type="button"
                        onClick={() => {
                          markWorkoutDone(workout.id);
                          showToast(`${workout.name} marked as done`);
                        }}
                        disabled={completedIds.includes(workout.id)}
                        className="inline-flex min-h-8 items-center gap-1.5 rounded-md bg-[#ccff00] px-3 text-[9px] font-bold text-black transition hover:bg-[#dcff66] disabled:cursor-default disabled:bg-[#34400b] disabled:text-[#d9ff66]"
                      >
                        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m3 8 3.2 3.2L13 4.5" />
                        </svg>
                        {completedIds.includes(workout.id) ? "Completed" : "Mark as Done"}
                      </button>
                    )}
                    <button
                      type="button"
                      aria-label={`Remove ${workout.name} from ${activeTab === "todayPlan" ? "today's plan" : "saved workouts"}`}
                      onClick={() => {
                        removeWorkout(activeTab, workout.id);
                        showToast(
                          `${workout.name} removed from ${activeTab === "todayPlan" ? "today's plan" : "saved workouts"}`,
                        );
                      }}
                      className="inline-flex min-h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm text-zinc-500 transition hover:text-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                    >
                      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                        <path d="m4 4 8 8M12 4l-8 8" />
                      </svg>
                    </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center border border-dashed border-white/[0.1] bg-[#17191d] px-5 py-10 text-center sm:min-h-[230px]">
            <p className="font-(family-name:--font-oswald) text-lg font-bold uppercase text-white">
              Nothing here yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex min-h-9 items-center rounded-full bg-[#ccff00] px-4 text-[10px] font-bold text-black transition hover:bg-[#dcff66]"
            >
              Go to workouts
            </Link>
          </div>
        )}
      </div>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 bottom-5 z-50 rounded-md border border-[#ccff00]/30 bg-[#171a14] px-4 py-3 text-sm font-medium text-zinc-100 shadow-xl"
        >
          {toast}
        </div>
      )}
    </section>
  );
}