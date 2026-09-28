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

const workoutsUrl = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
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