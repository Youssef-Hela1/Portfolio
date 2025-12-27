"use client";

import React from "react";
import { Project } from "@/lib/types";

interface ProjectExpandedViewProps {
    project: Project;
    onClose: () => void;
}

// Tool-specific icons for download/link buttons
const ToolDownloadIcons: Record<string, { icon: React.ReactNode; label: string }> = {
    excel: {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.17 3H7.83A1.83 1.83 0 0 0 6 4.83v1.34h2V5h12v14H8v-1h-2v1.17A1.83 1.83 0 0 0 7.83 21h13.34A1.83 1.83 0 0 0 23 19.17V4.83A1.83 1.83 0 0 0 21.17 3z" />
                <path d="M1 7.5v9a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 10.5 6h-8A1.5 1.5 0 0 0 1 7.5zm2.5 1.75L5 12l-1.5 2.75h1.4l.85-1.75.85 1.75h1.4L6.5 12l1.5-2.75h-1.4l-.85 1.75-.85-1.75H3.5z" />
            </svg>
        ),
        label: "Download Excel File",
    },
    sheets: {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.5 2h-15A2.5 2.5 0 0 0 2 4.5v15A2.5 2.5 0 0 0 4.5 22h15a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 19.5 2zM9 19H5v-3h4v3zm0-5H5v-3h4v3zm0-5H5V6h4v3zm10 10h-8v-3h8v3zm0-5h-8v-3h8v3zm0-5h-8v-3h8v3zm0-5h-8V6h8v3z" />
            </svg>
        ),
        label: "Open in Google Sheets",
    },
    looker: {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
        ),
        label: "Open in Looker Studio",
    },
    tableau: {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.25 2v4h-3v1.5h3v4h1.5v-4h3V6h-3V2h-1.5zm-5.5 5v3h-3v1.5h3v3H7.25v-3h3V10h-3V7H5.75zm12 0v3h-3v1.5h3v3h1.5v-3h3V10h-3V7h-1.5zm-6 5v4h-3v1.5h3v4h1.5v-4h3V16h-3v-4h-1.5zm-6 2v3H2.75v1.5h3v3h1.5v-3h3V17h-3v-3H5.75zm12 0v3h-3v1.5h3v3h1.5v-3h3V17h-3v-3h-1.5z" />
            </svg>
        ),
        label: "Open in Tableau",
    },
    powerbi: {
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4zm-6 6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1H4zm12 3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-4z" />
            </svg>
        ),
        label: "Download Power BI File",
    },
};

export default function ProjectExpandedView({ project, onClose }: ProjectExpandedViewProps) {
    const toolInfo = ToolDownloadIcons[project.category] || ToolDownloadIcons.excel;
    const downloadUrl = project.downloadUrl || project.liveUrl;

    return (
        <div className="bg-white border-t border-grey-200 animate-fade-in relative min-h-[500px]">
            {/* Sticky Header with Title and Close Button */}
            <div className="sticky top-[80px] z-30 bg-white/95 backdrop-blur-sm border-b border-grey-100 shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-graphite-900 truncate">
                        {project.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-4 py-2 text-graphite-600 hover:text-graphite-900 hover:bg-grey-100 rounded-lg transition-colors flex-shrink-0"
                    >
                        <span className="text-sm font-medium">Close</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Long description */}
                {project.longDescription && (
                    <p className="text-lg text-graphite-600 mb-10 leading-relaxed">
                        {project.longDescription}
                    </p>
                )}

                {/* Screenshots gallery */}
                {project.screenshots && project.screenshots.length > 0 ? (
                    <div className="space-y-12">
                        {project.screenshots.map((screenshot, index) => (
                            <div key={screenshot.id || index} className="flex flex-col items-center">
                                {/* Screenshot image */}
                                <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-card-hover border border-grey-200">
                                    <img
                                        src={screenshot.image}
                                        alt={`Screenshot ${index + 1}`}
                                        className="w-full h-auto"
                                    />
                                </div>
                                {/* Description */}
                                {screenshot.description && (
                                    <p className="mt-4 text-center text-graphite-600 max-w-2xl text-sm italic">
                                        {screenshot.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-graphite-400 bg-grey-50 rounded-xl border border-dashed border-grey-200">
                        <p>No screenshots available for this project.</p>
                    </div>
                )}

                {/* Download/Link button at the end */}
                {downloadUrl && (
                    <div className="mt-16 flex justify-center pb-12">
                        <a
                            href={downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-8 py-4 bg-graphite-900 text-white font-medium rounded-xl hover:bg-graphite-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                            style={{ backgroundColor: project.accentColor || undefined }}
                            download // Force download if it's a file
                        >
                            {toolInfo.icon}
                            <span>{toolInfo.label}</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </div>
                )}

                {/* Technologies used */}
                {project.technologies.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-grey-200">
                        <h4 className="text-sm font-medium text-graphite-500 uppercase tracking-wider mb-4 text-center">
                            Tools & Techniques Used
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 text-sm font-medium bg-grey-100 text-graphite-700 rounded-full"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
