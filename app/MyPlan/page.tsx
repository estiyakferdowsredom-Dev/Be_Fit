import Navbar from "@/components/Navbar";
import MyPlanContent from "@/components/MyPlanContent";
import { getWorkouts } from "@/lib/workouts";

export default async function MyPlanPage() {
    const workouts = await getWorkouts();

    return (
        <main className="flex-1 bg-[#141619] text-white">
            <Navbar />
            <MyPlanContent workouts={workouts} />
        </main>
    );
}