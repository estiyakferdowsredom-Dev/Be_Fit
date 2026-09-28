import BannerSection from "@/components/BannerSection";
import Navbar from "@/components/Navbar";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="flex-1 bg-[#141619] text-white">
      <Navbar />
      <BannerSection />
      <WorkoutLibrary />
    </main>
  );
}
