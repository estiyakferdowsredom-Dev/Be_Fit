import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#090b0e]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="" width={28} height={28} />
          <span className="text-sm font-black text-zinc-100">FITLOG</span>
        </div>
        <p className="text-xs leading-5 text-zinc-500">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}