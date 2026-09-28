import Image from "next/image";

import banner from "../assets/banner.png";

export default function BannerSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-5 sm:px-6 sm:py-6">
      <div className="grid min-h-[280px] grid-cols-1 items-center gap-2 rounded-lg border border-white/[0.07] bg-[#1b1d22] px-5 py-5 sm:px-8 sm:py-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-9">
        <div className="w-full lg:max-w-[600px]">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.08em] text-[#ccff00]">
            Workout Library
          </p>
          <h1 className="font-(family-name:--font-oswald) text-[32px] leading-[0.98] font-bold uppercase text-[#f5f7f7] sm:text-5xl">
            Train with intent. Log
            <br className="hidden sm:block" /> Every set.
          </h1>
          <p className="mt-3 max-w-lg text-xs leading-5 text-zinc-400 sm:text-sm sm:leading-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-4 inline-flex min-h-9 items-center gap-2 rounded-md bg-[#ccff00] px-4 text-[10px] font-bold uppercase text-black transition-colors hover:bg-[#dcff66] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]"
          >
            Browse workouts
            <span aria-hidden="true" className="text-base leading-none">
              &rarr;
            </span>
          </a>
        </div>
        <Image
          src={banner}
          alt="Athlete training on a seated leg machine"
          priority
          className="h-28 w-28 justify-self-end object-contain sm:h-40 sm:w-40 lg:h-60 lg:w-60"
        />
      </div>
    </section>
  );
}
