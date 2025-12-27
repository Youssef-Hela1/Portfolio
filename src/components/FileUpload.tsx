"use client";

import { useState, useRef } from "react";

interface FileUploadProps {
    value: string;
    onChange: (url: string) => void;
    placeholder?: string;
    label?: string;
    accept?: string;
}

export default function FileUpload({ value, onChange, placeholder, label, accept }: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file size (max 50MB for general files)
        if (file.size > 50 * 1024 * 1024) {
            setError("File size must be less than 50MB");
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                onChange(data.url);
            } else {
                setError(data.error || "Upload failed");
            }
        } catch (err) {
            setError("Failed to upload file");
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const isImage = value.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i);

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-graphite-700">{label}</label>
            )}

            <div className="flex gap-2">
                {/* URL Input */}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 px-4 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-graphite-500 focus:border-transparent text-sm"
                    placeholder={placeholder || "File URL or upload →"}
                />

                {/* Upload Button */}
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-2 bg-grey-100 text-graphite-700 font-medium rounded-lg hover:bg-grey-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                    {isUploading ? (
                        <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Uploading...</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Upload</span>
                        </>
                    )}
                </button>

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* Preview if it's an image */}
            {value && isImage && (
                <div className="mt-2 relative w-24 h-16 rounded-lg overflow-hidden border border-grey-200">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* File name display if not an image */}
            {value && !isImage && (
                <div className="mt-2 text-xs text-graphite-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span className="truncate">{value.split('/').pop()}</span>
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="text-red-500 hover:text-red-700 ml-2"
                    >
                        Remove
                    </button>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
