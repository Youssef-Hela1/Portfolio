"use client";

import { useState, useEffect } from "react";
import { Project, Category } from "@/lib/types";
import FileUpload from "./FileUpload";

interface ProjectModalProps {
    categories: Category[];
    project?: Project | null;
    onClose: () => void;
    onSave: (project: Project | Omit<Project, "id">) => void;
    onDelete?: (id: number | string) => void;
}

export default function ProjectModal({ categories, project, onClose, onSave, onDelete }: ProjectModalProps) {
    const isEditMode = !!project;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        longDescription: "",
        image: "",
        technologies: "",
        liveUrl: "",
        downloadUrl: "",
        featured: false,
        gridSize: "medium" as "small" | "medium" | "large",
        category: categories[0]?.slug || "excel",
        accentColor: "#2D3035",
        screenshots: [] as { image: string; description: string; id?: number }[],
    });

    const [newScreenshot, setNewScreenshot] = useState({ image: "", description: "" });
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    // Load project data if editing
    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title,
                description: project.description,
                longDescription: project.longDescription || "",
                image: project.image,
                technologies: project.technologies.join(", "),
                liveUrl: project.liveUrl || "",
                downloadUrl: project.downloadUrl || "",
                featured: project.featured,
                gridSize: project.gridSize,
                category: project.category,
                accentColor: project.accentColor || "#2D3035",
                screenshots: project.screenshots || [],
            });
            setIsDeleteConfirm(false); // Reset delete confirmation on project change
        }
    }, [project]);

    const handleAddScreenshot = () => {
        if (newScreenshot.image) {
            setFormData({
                ...formData,
                screenshots: [...formData.screenshots, { ...newScreenshot }],
            });
            setNewScreenshot({ image: "", description: "" });
        }
    };

    const handleRemoveScreenshot = (index: number) => {
        setFormData({
            ...formData,
            screenshots: formData.screenshots.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const processedProject = {
            ...formData,
            technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
            screenshots: formData.screenshots.map((s, i) => ({ ...s, id: i + 1 })),
            // Preserve original ID and creation date if editing
            createdAt: project?.createdAt || new Date().toISOString().split("T")[0],
            ...(isEditMode ? { id: project.id } : {}),
        };
        onSave(processedProject);
        onClose();
    };

    const handleDelete = () => {
        if (project && onDelete) {
            onDelete(project.id);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-grey-200 px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-display font-bold text-graphite-900">
                        {isEditMode ? "Edit Project" : "Add New Project"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-grey-100 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-graphite-700 mb-1">Title *</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent"
                                placeholder="Project Title"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-graphite-700 mb-1">Category *</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-graphite-700 mb-1">Short Description *</label>
                        <input
                            type="text"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent"
                            placeholder="Brief description for the card"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-graphite-700 mb-1">Long Description</label>
                        <textarea
                            value={formData.longDescription}
                            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                            className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent h-24"
                            placeholder="Detailed project description..."
                        />
                    </div>

                    {/* Cover Image with Upload */}
                    <FileUpload
                        label="Cover Image *"
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                        placeholder="Image URL or upload from PC"
                        accept="image/*"
                    />

                    {/* Display & Styling */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-graphite-700 mb-1">Accent Color</label>
                            <div className="flex gap-2">
                                <input
                                    type="color"
                                    value={formData.accentColor}
                                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                                    className="w-12 h-10 border border-grey-300 rounded-lg cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={formData.accentColor}
                                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                                    className="flex-1 px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-graphite-700 mb-1">Grid Size</label>
                            <select
                                value={formData.gridSize}
                                onChange={(e) => setFormData({ ...formData, gridSize: e.target.value as "small" | "medium" | "large" })}
                                className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent"
                            >
                                <option value="small">Small (1×1)</option>
                                <option value="medium">Medium (2×1)</option>
                                <option value="large">Large (2×2) - Featured</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-graphite-700 mb-1">Technologies (comma-separated)</label>
                        <input
                            type="text"
                            value={formData.technologies}
                            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                            className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent"
                            placeholder="VLOOKUP, Pivot Tables, Charts"
                        />
                    </div>

                    {/* Links and Download File */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-graphite-700 mb-1">Live/View URL</label>
                            <input
                                type="url"
                                value={formData.liveUrl}
                                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent"
                                placeholder="Link to view project"
                            />
                        </div>
                        <div>
                            <FileUpload
                                label="Download Link / File"
                                value={formData.downloadUrl}
                                onChange={(url) => setFormData({ ...formData, downloadUrl: url })}
                                placeholder="Paste link or upload file"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-4 h-4 rounded border-grey-300"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-graphite-700">Featured Project</label>
                    </div>

                    {/* Screenshots */}
                    <div className="border-t border-grey-200 pt-6">
                        <h3 className="text-lg font-semibold text-graphite-900 mb-4">Screenshots</h3>

                        {/* Existing screenshots */}
                        {formData.screenshots.length > 0 && (
                            <div className="space-y-3 mb-4">
                                {formData.screenshots.map((screenshot, index) => (
                                    <div key={index} className="flex items-start gap-3 p-3 bg-grey-50 rounded-lg">
                                        <img src={screenshot.image} alt="" className="w-20 h-14 object-cover rounded" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-graphite-600 line-clamp-2">{screenshot.description || "No description"}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveScreenshot(index)}
                                            className="p-1 text-red-500 hover:bg-red-50 rounded flex-shrink-0"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add new screenshot */}
                        <div className="space-y-3 p-4 bg-grey-50 rounded-lg">
                            <FileUpload
                                value={newScreenshot.image}
                                onChange={(url) => setNewScreenshot({ ...newScreenshot, image: url })}
                                placeholder="Screenshot URL or upload"
                                accept="image/*"
                            />
                            <input
                                type="text"
                                value={newScreenshot.description}
                                onChange={(e) => setNewScreenshot({ ...newScreenshot, description: e.target.value })}
                                className="w-full px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent"
                                placeholder="Describe what this screenshot shows..."
                            />
                            <button
                                type="button"
                                onClick={handleAddScreenshot}
                                disabled={!newScreenshot.image}
                                className="px-4 py-2 text-sm font-medium text-graphite-700 bg-white border border-grey-300 hover:bg-grey-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                + Add Screenshot
                            </button>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-grey-200">
                        {isEditMode && onDelete ? (
                            isDeleteConfirm ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-red-600 font-medium">Are you sure?</span>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Yes, Delete
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsDeleteConfirm(false)}
                                        className="px-3 py-1.5 text-graphite-600 hover:bg-grey-100 text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsDeleteConfirm(true)}
                                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            )
                        ) : (
                            <div></div> // Spacer
                        )}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 text-graphite-700 hover:bg-grey-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-graphite-900 text-white font-medium rounded-lg hover:bg-graphite-800 transition-colors"
                            >
                                {isEditMode ? "Update Project" : "Save Project"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
