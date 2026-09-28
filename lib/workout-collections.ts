export type WorkoutCollection = "todayPlan" | "saved";
export type AddWorkoutResult = "added" | "exists" | "limit";

export const MAX_TODAY_PLAN_ITEMS = 5;

const collectionKeys: Record<WorkoutCollection, string> = {
  todayPlan: "fitlog:today-plan",
  saved: "fitlog:saved",
};
const completedKey = "fitlog:completed-today";

const updateEvent = "fitlog:workout-collections-updated";

export function getWorkoutIds(collection: WorkoutCollection): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(collectionKeys[collection]);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];
    return Array.isArray(parsedValue)
      ? parsedValue.filter((id): id is number => Number.isInteger(id))
      : [];
  } catch {
    return [];
  }
}

export function getWorkoutIdsSnapshot(collection: WorkoutCollection): string {
  return JSON.stringify(getWorkoutIds(collection));
}

export function getCompletedIdsSnapshot(): string {
  if (typeof window === "undefined") {
    return "[]";
  }

  try {
    const storedValue = window.localStorage.getItem(completedKey);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];
    return JSON.stringify(
      Array.isArray(parsedValue)
        ? parsedValue.filter((id): id is number => Number.isInteger(id))
        : [],
    );
  } catch {
    return "[]";
  }
}

export function hasWorkout(
  collection: WorkoutCollection,
  workoutId: number,
): boolean {
  return getWorkoutIds(collection).includes(workoutId);
}

export function addWorkout(
  collection: WorkoutCollection,
  workoutId: number,
): AddWorkoutResult {
  const workoutIds = getWorkoutIds(collection);
  if (workoutIds.includes(workoutId)) {
    return "exists";
  }

  if (collection === "todayPlan" && workoutIds.length >= MAX_TODAY_PLAN_ITEMS) {
    return "limit";
  }

  window.localStorage.setItem(
    collectionKeys[collection],
    JSON.stringify([...workoutIds, workoutId]),
  );
  window.dispatchEvent(new Event(updateEvent));
  return "added";
}

export function removeWorkout(
  collection: WorkoutCollection,
  workoutId: number,
): void {
  const workoutIds = getWorkoutIds(collection).filter((id) => id !== workoutId);
  window.localStorage.setItem(collectionKeys[collection], JSON.stringify(workoutIds));

  if (collection === "todayPlan") {
    const completedIds = JSON.parse(getCompletedIdsSnapshot()) as number[];
    window.localStorage.setItem(
      completedKey,
      JSON.stringify(completedIds.filter((id) => id !== workoutId)),
    );
  }

  window.dispatchEvent(new Event(updateEvent));
}

export function markWorkoutDone(workoutId: number): void {
  const completedIds = JSON.parse(getCompletedIdsSnapshot()) as number[];
  if (!completedIds.includes(workoutId)) {
    window.localStorage.setItem(
      completedKey,
      JSON.stringify([...completedIds, workoutId]),
    );
    window.dispatchEvent(new Event(updateEvent));
  }
}

export function subscribeToWorkoutCollections(onChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (
      !event.key ||
      Object.values(collectionKeys).includes(event.key) ||
      event.key === completedKey
    ) {
      onChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(updateEvent, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(updateEvent, onChange);
  };
}