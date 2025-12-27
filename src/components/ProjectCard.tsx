"use client";

import Image from "next/image";
import { Project } from "@/lib/types";
import { getGridClasses } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    index: number;
    onViewClick: (project: Project) => void;
    onEditClick?: (project: Project) => void;
}

// Check if we're in development mode
const isDev = process.env.NODE_ENV === "development";

export default function ProjectCard({ project, index, onViewClick, onEditClick }: ProjectCardProps) {
    const gridClass = getGridClasses(project.gridSize);
    const isLarge = project.gridSize === "large";
    // Add explicit height classes to prevent collapsing
    const heightClass = project.gridSize === "large" ? "h-[520px]" : "h-[320px]";

    return (
        <article
            className={`bento-card ${gridClass} ${heightClass} group cursor-pointer`}
        >
            {/* Project Image */}
            <div className="absolute inset-0">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-grey-100 to-grey-200" />
                )}
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/20 opacity-95 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                {/* Featured badge */}
                {project.featured && (
                    <span
                        className="inline-flex self-start px-2.5 py-1 mb-3 text-xs font-semibold uppercase tracking-wider text-white rounded-md"
                        style={{ backgroundColor: project.accentColor || "#2D3035" }}
                    >
                        Featured
                    </span>
                )}

                {/* Title */}
                <h3
                    className={`font-display font-bold text-graphite-900 mb-2 transition-colors group-hover:text-graphite-700 ${isLarge ? "text-xl sm:text-2xl lg:text-3xl" : "text-lg sm:text-xl"
                        }`}
                >
                    {project.title}
                </h3>

                {/* Description */}
                <p
                    className={`text-graphite-600 mb-4 line-clamp-2 ${isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                        }`}
                >
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.slice(0, isLarge ? 4 : 3).map((tech) => (
                        <span
                            key={tech}
                            className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-grey-100 text-graphite-700 rounded-md border border-grey-200 hover:bg-grey-200 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > (isLarge ? 4 : 3) && (
                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-grey-200 text-graphite-600 rounded-md">
                            +{project.technologies.length - (isLarge ? 4 : 3)}
                        </span>
                    )}
                </div>

                {/* Action buttons - appear on hover */}
                {(project.liveUrl || project.githubUrl || true) && (
                    <div className="flex items-center gap-2 mt-4 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        {/* View Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewClick(project);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-white text-xs font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
                            style={{ backgroundColor: project.accentColor || "#1f2937" }}
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                            <span>View</span>
                        </button>

                        {/* Admin Edit Button */}
                        {isDev && onEditClick && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditClick(project);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-graphite-700 text-xs font-medium rounded-lg hover:bg-grey-50 transition-colors border border-grey-200 shadow-sm"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Edit</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}
