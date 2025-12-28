"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectExpandedView from "./ProjectExpandedView";
import { Project, Category } from "@/lib/types";
import { getProjects, createProject, getCategories } from "@/lib/api";
import ProjectModal from "./ProjectModal";
import { useToast } from "@/components/Toast";

interface ToolNavbarProps {
    projects: Project[];
    categories: Category[];
    onEditClick?: (project: Project) => void;
}

// Tool icons as SVG components
const ToolIcons: Record<string, React.ReactNode> = {
    excel: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.17 3H7.83A1.83 1.83 0 0 0 6 4.83v1.34h2V5h12v14H8v-1h-2v1.17A1.83 1.83 0 0 0 7.83 21h13.34A1.83 1.83 0 0 0 23 19.17V4.83A1.83 1.83 0 0 0 21.17 3z" />
            <path d="M1 7.5v9a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-8A1.5 1.5 0 0 0 1 7.5zm2.5 1.75L5 12l-1.5 2.75h1.4l.85-1.75.85 1.75h1.4L6.5 12l1.5-2.75h-1.4l-.85 1.75-.85-1.75H3.5z" />
        </svg>
    ),
    sheets: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 2h-15A2.5 2.5 0 0 0 2 4.5v15A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 19.5 2zM9 19H5v-3h4v3zm0-5H5v-3h4v3zm0-5H5V6h4v3zm10 10h-8v-3h8v3zm0-5h-8v-3h8v3zm0-5h-8v-3h8v3zm0-5h-8V6h8v3z" />
        </svg>
    ),
    looker: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
    ),
    tableau: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.25 2v4h-3v1.5h3v4h1.5v-4h3V6h-3V2h-1.5zm-5.5 5v3h-3v1.5h3v3H7.25v-3h3V10h-3V7H5.75zm12 0v3h-3v1.5h3v3h1.5v-3h3V10h-3V7h-1.5zm-6 5v4h-3v1.5h3v4h1.5v-4h3V16h-3v-4h-1.5zm-6 2v3H2.75v1.5h3v3h1.5v-3h3V17h-3v-3H5.75zm12 0v3h-3v1.5h3v3h1.5v-3h3V17h-3v-3h-1.5z" />
        </svg>
    ),
    powerbi: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4zm-6 6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1H4zm12 3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-4z" />
        </svg>
    ),
};

export default function ToolNavbar({ projects, categories, onEditClick }: ToolNavbarProps) {
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.slug || "excel");
    const [expandedProject, setExpandedProject] = useState<Project | null>(null);

    const filteredProjects = projects.filter((p) => p.category === activeCategory);

    const handleViewProject = (project: Project) => {
        setExpandedProject(project);
        // Scroll to top of section smoothly
        window.scrollTo({ top: 80, behavior: "smooth" });
    };

    const handleCloseProject = () => {
        setExpandedProject(null);
    };

    return (
        <>
            {/* Tool Navigation Bar - Hide when expanded project is visible */}
            {!expandedProject && (
                <nav className="sticky top-20 z-40 bg-white border-b border-grey-200 shadow-sm animate-fade-in">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 py-4 overflow-x-auto">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.slug)}
                                    className={`flex flex-col items-center justify-center gap-2 rounded-xl transition-all duration-300 w-[100px] h-[80px] flex-shrink-0
                    ${activeCategory === category.slug
                                            ? "bg-graphite-900 text-white shadow-lg scale-105"
                                            : "bg-grey-100 text-graphite-600 hover:bg-grey-200 hover:text-graphite-900"
                                        } `}
                                >
                                    <span className={activeCategory === category.slug ? "text-white" : "text-graphite-500"}>
                                        {ToolIcons[category.icon] || ToolIcons.excel}
                                    </span>
                                    <span className="text-[10px] sm:text-xs font-medium text-center leading-tight px-1">
                                        {category.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </nav>
            )}

            {/* Projects Section */}
            <section className="py-12 bg-grey-50 min-h-[calc(100vh-200px)]">
                <div className="max-w-6xl mx-auto px-6">

                    {expandedProject ? (
                        // Expanded View Mode
                        <div className="animate-fade-in">
                            <div className="mb-6 flex items-center gap-2">
                                <button
                                    onClick={handleCloseProject}
                                    className="flex items-center gap-1 text-sm text-graphite-500 hover:text-graphite-900 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to {categories.find(c => c.slug === activeCategory)?.name} Projects
                                </button>
                            </div>
                            <ProjectExpandedView
                                project={expandedProject}
                                onClose={handleCloseProject}
                            />
                        </div>
                    ) : (
                        // Grid View Mode
                        <>
                            {/* Section header */}
                            <div className="text-center mb-10">
                                <h2 className="text-3xl sm:text-4xl font-display font-bold text-graphite-900 mb-2">
                                    {categories.find((c) => c.slug === activeCategory)?.name} Projects
                                </h2>
                                <p className="text-graphite-500">
                                    {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} in this category
                                </p>
                            </div>

                            {/* Bento grid */}
                            <div className="bento-grid">
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        onViewClick={handleViewProject}
                                        onEditClick={onEditClick}
                                    />
                                ))}
                            </div>

                            {/* Empty state */}
                            {filteredProjects.length === 0 && (
                                <div className="text-center py-16 bg-white rounded-3xl border border-grey-200">
                                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-grey-100 rounded-full">
                                        <svg
                                            className="w-8 h-8 text-graphite-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-display font-semibold text-graphite-900 mb-2">
                                        No projects yet
                                    </h3>
                                    <p className="text-graphite-500 mb-4">
                                        Projects for this tool will appear here.
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                </div>
            </section>
        </>
    );
}
