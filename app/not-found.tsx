import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-[#141619] px-6 py-12 text-center text-white">
      <Navbar />
      <p className="font-(family-name:--font-oswald) text-7xl font-bold text-[#ccff00]">
        404
      </p>
      <h1 className="mt-2 font-(family-name:--font-oswald) text-3xl font-bold uppercase">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
        That route or workout does not exist. Head back to the library and keep
        your session moving.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-md bg-[#ccff00] px-5 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#dcff66]"
      >
        Go to workouts
      </Link>
    </main>
  );
}