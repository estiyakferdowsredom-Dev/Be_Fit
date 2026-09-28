import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Workouts() {
    return (
        <main className="flex-1 bg-[#141619] text-white">
            <Navbar />
            <section className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="font-(family-name:--font-oswald) text-3xl font-bold uppercase">
                    Workouts
                </h1>
                <Link
                    href="/#library"
                    className="mt-4 inline-flex min-h-9 items-center rounded-md bg-[#ccff00] px-4 text-[10px] font-bold uppercase text-black"
                >
                    Browse the library
                </Link>
            </section>
        </main>
    );
}