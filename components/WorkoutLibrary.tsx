import Image from "next/image";
import Link from "next/link";
import { getWorkouts } from "@/lib/workouts";

export default async function WorkoutLibrary() {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      aria-labelledby="library-heading"
      className="scroll-mt-6 border-t border-white/[0.07] px-5 py-8 sm:px-6 sm:py-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col gap-1.5">
          <div>
            <h2
              id="library-heading"
              className="font-(family-name:--font-oswald) text-2xl leading-none font-bold uppercase text-white"
            >
              The Library
            </h2>
          </div>
          <p className="text-xs text-zinc-400">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {workouts.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <Link
                key={workout.id}
                href={`/Workouts/${workout.id}`}
                className="group overflow-hidden rounded-lg border border-white/[0.07] bg-[#1b1d22] transition-colors hover:border-white/15 hover:bg-[#202228] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#202328]">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.025]"
                  />
                </div>

                <div className="p-3">
                  <div className="mb-2 flex min-h-5 flex-wrap gap-1">
                    {workout.muscleGroups.map((group) => (
                      <span
                        key={group}
                        className="rounded-sm bg-[#ccff00] px-1.5 py-0.5 text-[8px] font-bold uppercase leading-none tracking-wide text-[#10120a]"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                  <h3 className="min-h-5 font-(family-name:--font-oswald) text-base leading-tight font-bold uppercase text-zinc-100 transition-colors group-hover:text-[#d9ff66]">
                    {workout.name}
                  </h3>
                  <p className="mt-0.5 truncate text-[10px] text-zinc-400">
                    {workout.equipment}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-1 border-t border-white/[0.07] pt-2 text-[9px] sm:text-[10px]">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="10" cy="10" r="7" />
                        <path d="M10 5.5v4.8l3 1.8" />
                      </svg>
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1 text-zinc-300">
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-[#f36b52]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                        <path d="M10.4 2.8c.5 2.7-2.9 3.4-2 6.1-1.1-.4-1.8-1.4-1.9-2.6-2.3 2-2.4 5.9-.4 8 2.3 2.4 6.8 2.1 8.3-.8 1.5-2.8.1-6.4-2.2-8.8.1 1.5-.5 2.4-1.3 2.7.4-1.9.2-3.4-.5-4.6Z" />
                      </svg>
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-zinc-200">
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 text-[#ccff00]" fill="currentColor">
                        <path d="m10 1.8 2.4 5 5.5.8-4 3.9.9 5.5-4.8-2.6-4.9 2.6 1-5.5-4-3.9 5.5-.8L10 1.8Z" />
                      </svg>
                      {workout.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="border border-white/10 bg-[#15171b] px-5 py-6 text-sm text-zinc-400">
            The workout library is temporarily unavailable. Please try again in a moment.
          </p>
        )}
      </div>
    </section>
  );
}