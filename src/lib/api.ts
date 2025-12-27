import { Project, Category } from "./types";
import localDb from "./db.json";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Helper to simulate network delay if needed, or just handle errors
const handleFetch = async (endpoint: string) => {
    try {
        const res = await fetch(`${API_URL}${endpoint}`, { cache: "no-store" });
        if (!res.ok) throw new Error("API Error");
        return await res.json();
    } catch (error) {
        console.warn(`API unavailable for ${endpoint}, falling back to static data.`);
        // Fallback to localDb
        if (endpoint.includes("/projects")) return localDb.projects;
        if (endpoint.includes("/categories")) return localDb.categories;
        return [];
    }
};

export async function getProjects(): Promise<Project[]> {
    return handleFetch("/projects");
}

export async function getCategories(): Promise<Category[]> {
    return handleFetch("/categories");
}

export async function createProject(project: Omit<Project, "id">): Promise<Project | null> {
    try {
        const res = await fetch(`${API_URL}/projects`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        });

        if (!res.ok) throw new Error("Failed to create project");
        return res.json();
    } catch (error) {
        console.error("Error creating project:", error);
        return null;
    }
}

export async function updateProject(project: Project): Promise<Project | null> {
    try {
        console.log(`Updating project ${project.id}. URL: ${API_URL}/projects/${project.id}`);
        // console.log("Payload:", JSON.stringify(project));

        const { id, ...rest } = project;

        const res = await fetch(`${API_URL}/projects/${project.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rest),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`Failed to update project ${project.id}. Status: ${res.status} ${res.statusText}. Response: ${errorText}`);
            throw new Error(`Failed to update project: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error updating project:", error);
        return null;
    }
}

export async function deleteProject(id: number | string): Promise<boolean> {
    try {
        console.log(`Deleting project ${id}. URL: ${API_URL}/projects/${id}`);
        const res = await fetch(`${API_URL}/projects/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            // If the project is not found (404), considered it already deleted (success)
            if (res.status === 404) {
                console.warn(`Project ${id} already deleted (404). Treating as success.`);
                return true;
            }
            console.error(`Failed to delete project ${id}. Status: ${res.status} ${res.statusText}`);
            throw new Error("Failed to delete project");
        }
        return true;
    } catch (error) {
        console.error("Error deleting project:", error);
        return false;
    }
}
