"use client";

import { useEffect, useState, useRef } from "react";

export default function HeroHeader() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const heroHeight = heroRef.current.offsetHeight;
            const scrollY = window.scrollY;
            const progress = Math.min(scrollY / (heroHeight * 0.6), 1);
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-screen flex items-center justify-center bg-white overflow-hidden"
            style={{
                transform: `scale(${1 - scrollProgress * 0.1})`,
                opacity: 1 - scrollProgress * 0.3,
            }}
        >
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-grey-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-grey-100 rounded-full blur-3xl opacity-40" />

            {/* Main content */}
            <div className="relative z-10 text-center px-6">
                <h1
                    className="font-display font-bold text-graphite-950 leading-none tracking-tight"
                    style={{
                        fontSize: `clamp(4rem, 15vw, 12rem)`,
                        transform: `translateY(${scrollProgress * -50}px)`,
                    }}
                >
                    Youssef Helal
                </h1>

                <p
                    className="mt-6 text-xl sm:text-2xl text-graphite-500 font-light tracking-wide"
                    style={{
                        opacity: 1 - scrollProgress * 2,
                        transform: `translateY(${scrollProgress * -30}px)`,
                    }}
                >
                    Data Analytics & Visualization
                </p>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ opacity: 1 - scrollProgress * 3 }}
            >
                <span className="text-xs uppercase tracking-[0.3em] text-graphite-400">
                    Scroll
                </span>
                <div className="w-6 h-10 rounded-full border-2 border-graphite-300 flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-graphite-400 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
