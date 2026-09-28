import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import WorkoutActions from "@/components/WorkoutActions";
import { getWorkoutById } from "@/lib/workouts";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="flex-1 bg-[#141619] text-white">
      <Navbar />
      <article className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-6 sm:px-6 sm:py-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-9 lg:py-9">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-white/[0.07] bg-[#1b1d22] lg:aspect-4/5">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1023px) 100vw, 48vw"
              className="object-cover"
              priority
            />
        </div>

        <div className="flex flex-col py-1 lg:py-0">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-sm border border-[#ccff00]/30 bg-[#ccff00]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d9ff66]"
              >
                {group}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-(family-name:--font-oswald) text-4xl leading-[1.02] font-bold uppercase sm:text-5xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {workout.description}
          </p>

          <section className="mt-5 rounded-lg border border-white/[0.07] bg-[#1b1d22] px-4 py-1" aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="sr-only">Key specs</h2>
            <dl className="divide-y divide-white/10">
              {[
                ["Equipment", workout.equipment],
                ["Difficulty", workout.difficulty],
                ["Sets", String(workout.sets)],
                ["Reps", workout.reps],
                ["Duration", `${workout.duration} min`],
                ["Calories", `${workout.caloriesBurned} kcal`],
                ["Rating", workout.rating.toFixed(1)],
              ].map(([label, value]) => (
                <div key={label} className="grid min-h-10 grid-cols-[1fr_auto] items-center gap-4 border-b border-white/[0.06] py-2 text-sm last:border-b-0">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-500">{label}</dt>
                  <dd className="text-right font-medium text-zinc-100">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-5" aria-labelledby="instructions-heading">
            <h2
              id="instructions-heading"
              className="font-(family-name:--font-oswald) text-xl font-bold uppercase"
            >
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3 text-sm leading-5 text-zinc-300">
                  <span className="font-mono text-xs font-bold text-[#ccff00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {instruction}
                </li>
              ))}
            </ol>
          </section>

          <WorkoutActions workoutId={workout.id} />
        </div>
      </article>
    </main>
  );
}