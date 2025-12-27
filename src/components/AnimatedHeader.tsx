"use client";

import { useEffect, useState } from "react";

interface AnimatedHeaderProps {
    onAnimationComplete?: () => void;
    showAddButton?: boolean;
    onAddClick?: () => void;
}

// Check if we're in development mode
const isDev = process.env.NODE_ENV === "development";

export default function AnimatedHeader({ onAnimationComplete, showAddButton, onAddClick }: AnimatedHeaderProps) {
    const [animationPhase, setAnimationPhase] = useState<"full" | "minimizing" | "complete">("full");

    useEffect(() => {
        // Start minimizing after 1 second
        const minimizeTimer = setTimeout(() => {
            setAnimationPhase("minimizing");
        }, 1000);

        // Complete animation after 1.5 seconds total
        const completeTimer = setTimeout(() => {
            setAnimationPhase("complete");
            onAnimationComplete?.();
        }, 1500);

        return () => {
            clearTimeout(minimizeTimer);
            clearTimeout(completeTimer);
        };
    }, [onAnimationComplete]);

    const isFullScreen = animationPhase === "full";

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-50 flex items-center justify-center
        bg-white transition-all duration-500 ease-out
      `}
            style={{
                height: isFullScreen ? "100vh" : "80px",
            }}
        >
            {/* Subtle grid pattern - only visible during full screen */}
            {isFullScreen && (
                <div
                    className="absolute inset-0 opacity-[0.03] transition-opacity duration-500"
                    style={{
                        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                        backgroundSize: "80px 80px",
                    }}
                />
            )}

            {/* Dev-only Add button - top left, only visible after animation */}
            {isDev && showAddButton && !isFullScreen && (
                <button
                    onClick={onAddClick}
                    className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 shadow-lg opacity-0 animate-fade-in"
                    style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="hidden sm:inline">Add Project</span>
                </button>
            )}

            {/* Content container */}
            <div className={`flex flex-col items-center transition-all duration-500 ${isFullScreen ? "gap-4" : "gap-1"}`}>
                {/* Name */}
                <h1
                    className="font-display font-bold text-graphite-950 leading-none tracking-tight transition-all duration-500 ease-out"
                    style={{
                        fontSize: isFullScreen ? "clamp(3rem, 12vw, 10rem)" : "1.5rem",
                    }}
                >
                    Youssef Helal
                </h1>

                {/* Subtitle - always visible, just smaller when minimized */}
                <p
                    className={`text-graphite-400 font-light tracking-wide transition-all duration-500
            ${isFullScreen ? "text-xl" : "text-xs"}
          `}
                >
                    Data Analytics & Visualization
                </p>
            </div>
        </header>
    );
}
