"use client";

import { useState } from "react";
import AnimatedHeader from "@/components/AnimatedHeader";
import ToolNavbar from "@/components/ToolNavbar";
import Footer from "@/components/Footer";
import ProjectModal from "@/components/ProjectModal";
import { Project, Category } from "@/lib/types";
import { createProject, updateProject, deleteProject } from "@/lib/api";
import { useToast } from "@/components/Toast";

interface HomeClientProps {
    projects: Project[];
    categories: Category[];
}

export default function HomeClient({ projects: initialProjects, categories }: HomeClientProps) {
    const [introComplete, setIntroComplete] = useState(false);
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [modalState, setModalState] = useState<{ isOpen: boolean; project: Project | null }>({
        isOpen: false,
        project: null,
    });

    const { addToast } = useToast();

    const handleCreateProject = async (projectData: Omit<Project, "id">) => {
        try {
            const newProject = await createProject(projectData);
            if (newProject) {
                setProjects([...projects, newProject]);
                addToast("Project created successfully!", "success");
            }
        } catch (error) {
            addToast("Failed to create project", "error");
        }
    };

    const handleUpdateProject = async (projectData: Project | Omit<Project, "id">) => {
        try {
            if ("id" in projectData) {
                // Ensure ID is treated correctly (cast to project object)
                const updated = await updateProject(projectData as Project);
                if (updated) {
                    setProjects(projects.map((p) => (String(p.id) === String(updated.id) ? updated : p)));
                    addToast("Project updated successfully!", "success");
                } else {
                    throw new Error("Update failure");
                }
            } else {
                handleCreateProject(projectData);
            }
        } catch (error) {
            addToast("Failed to update project", "error");
        }
    };

    const handleDeleteProject = async (id: number | string) => {
        try {
            const success = await deleteProject(id);
            if (success) {
                setProjects(projects.filter((p) => String(p.id) !== String(id)));
                addToast("Project deleted successfully", "info");
            } else {
                throw new Error("Delete failure");
            }
        } catch (error) {
            addToast("Failed to delete project", "error");
        }
    };

    const openAddModal = () => setModalState({ isOpen: true, project: null });
    const openEditModal = (project: Project) => setModalState({ isOpen: true, project });
    const closeModal = () => setModalState({ isOpen: false, project: null });

    return (
        <main className="min-h-screen bg-white">
            {/* Animated Header - always visible */}
            <AnimatedHeader
                onAnimationComplete={() => setIntroComplete(true)}
                showAddButton={true}
                onAddClick={openAddModal}
            />

            {/* Main content - appears after intro animation */}
            <div
                className={`transition-opacity duration-500 ${introComplete ? "opacity-100" : "opacity-0"
                    }`}
                style={{ paddingTop: "80px" }} // Space for fixed header
            >
                {/* Tool Navigation & Projects */}
                <ToolNavbar
                    projects={projects}
                    categories={categories}
                    onEditClick={openEditModal}
                />

                <Footer />
            </div>

            {/* Add/Edit Project Modal */}
            {modalState.isOpen && (
                <ProjectModal
                    categories={categories}
                    project={modalState.project}
                    onClose={closeModal}
                    onSave={handleUpdateProject}
                    onDelete={handleDeleteProject}
                />
            )}
        </main>
    );
}
