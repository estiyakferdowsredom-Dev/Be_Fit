"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import logo from "@/assets/logo.png";
import {
  getWorkoutIds,
  subscribeToWorkoutCollections,
} from "@/lib/workout-collections";

const navItems = [
  { label: "Workouts", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const planCount = useSyncExternalStore(
    subscribeToWorkoutCollections,
    () => getWorkoutIds("todayPlan").length,
    () => 0,
  );
  const savedCount = useSyncExternalStore(
    subscribeToWorkoutCollections,
    () => getWorkoutIds("saved").length,
    () => 0,
  );

  return (
    <header className="border-b border-white/[0.07] bg-[#141619]">
      <nav className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-y-3 px-5 py-4 sm:flex sm:justify-between sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src={logo} alt="" width={23} height={23} />
          <span className="font-(family-name:--font-oswald) text-xl font-bold leading-none text-[#f5f7f7] sm:text-2xl">
            FITLOG
          </span>
        </Link>

        <div className="order-3 col-span-2 flex items-center justify-center gap-2 text-xs font-medium sm:order-none sm:col-span-1 sm:gap-3 sm:text-sm">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "whitespace-nowrap rounded-full px-3 py-1.5 transition-colors sm:px-4 sm:py-2",
                  isActive
                    ? "bg-[#1e2f2c] text-[#d9ff66] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                    : "text-zinc-300 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-self-end gap-2 text-[11px] sm:gap-3 sm:text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 whitespace-nowrap text-zinc-300 transition hover:text-white sm:gap-2"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black sm:h-6 sm:min-w-6 sm:text-xs">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 whitespace-nowrap text-zinc-300 transition hover:text-white sm:gap-2"
          >
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/15 px-1.5 text-[10px] text-zinc-300 sm:h-6 sm:min-w-6 sm:text-xs">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
