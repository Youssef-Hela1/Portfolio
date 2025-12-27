import HomeClient from "@/components/HomeClient";
import { getProjects, getCategories } from "@/lib/api";

export default async function Home() {
    const [projects, categories] = await Promise.all([
        getProjects(),
        getCategories(),
    ]);

    return <HomeClient projects={projects} categories={categories} />;
}
