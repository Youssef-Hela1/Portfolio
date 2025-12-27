export interface ProjectScreenshot {
    id: number;
    image: string;
    description: string;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    downloadUrl?: string; // For file downloads (Excel, PowerBI, Tableau)
    featured: boolean;
    gridSize: "small" | "medium" | "large";
    category: string;
    createdAt: string;
    accentColor?: string; // Custom accent color for the project
    screenshots?: ProjectScreenshot[]; // Gallery of screenshots with descriptions
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
}

export type GridSize = "small" | "medium" | "large";

export type ToolCategory = "excel" | "sheets" | "looker" | "tableau" | "powerbi";
