"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { width, height } = hero.getBoundingClientRect();
            const x = (clientX / width - 0.5) * 20;
            const y = (clientY / height - 0.5) * 20;
            hero.style.setProperty("--mouse-x", `${x}px`);
            hero.style.setProperty("--mouse-y", `${y}px`);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-grey-50 to-white"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-1/4 -left-20 w-96 h-96 bg-graphite-100/50 rounded-full blur-3xl animate-float"
                    style={{ transform: "translate(var(--mouse-x, 0), var(--mouse-y, 0))" }}
                />
                <div
                    className="absolute bottom-1/4 -right-20 w-80 h-80 bg-grey-200/50 rounded-full blur-3xl animate-float animation-delay-300"
                    style={{ transform: "translate(calc(var(--mouse-x, 0) * -1), calc(var(--mouse-y, 0) * -1))" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-grey-100/30 to-transparent rounded-full" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #1a1c1f 1px, transparent 1px), linear-gradient(to bottom, #1a1c1f 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white rounded-full shadow-card border border-grey-100 opacity-0 animate-fade-in">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-graphite-600">
                        Available for new projects
                    </span>
                </div>

                {/* Main heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-graphite-900 leading-tight mb-6 opacity-0 animate-fade-in-up animation-delay-100">
                    Crafting Digital
                    <br />
                    <span className="text-gradient">Experiences</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl sm:text-2xl text-graphite-500 max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in-up animation-delay-200">
                    I design and build modern web applications that are beautiful,
                    performant, and user-focused.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-300">
                    <a href="#projects" className="btn-primary group">
                        <span>View My Work</span>
                        <svg
                            className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                    <a href="#contact" className="btn-secondary">
                        Contact Me
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
                    <a
                        href="#projects"
                        className="flex flex-col items-center gap-2 text-graphite-400 hover:text-graphite-600 transition-colors"
                    >
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-2">
                            <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
