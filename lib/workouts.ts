export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export async function getWorkouts(): Promise<Workout[]> {
  const workoutsUrl = process.env.WORKOUTS_API_URL;
  if (!workoutsUrl) {
    throw new Error("WORKOUTS_API_URL environment variable is required");
  }

  try {
    const response = await fetch(workoutsUrl, { next: { revalidate: 3600 } });
    if (!response.ok) {
      return [];
    }

    const data: unknown = await response.json();
    return Array.isArray(data) ? (data as Workout[]) : [];
  } catch {
    return [];
  }
}

export async function getWorkoutById(id: string): Promise<Workout | undefined> {
  const workouts = await getWorkouts();
  return workouts.find((workout) => String(workout.id) === id);
}