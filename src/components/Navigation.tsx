"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-grey-100"
                    : "bg-transparent"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-display font-bold text-graphite-900 hover:text-graphite-700 transition-colors"
                    >
                        Portfolio<span className="text-graphite-400">.</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#projects"
                            className="text-graphite-600 hover:text-graphite-900 font-medium transition-colors"
                        >
                            Projects
                        </a>
                        <a
                            href="#about"
                            className="text-graphite-600 hover:text-graphite-900 font-medium transition-colors"
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            className="btn-primary"
                        >
                            Get in Touch
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-graphite-600 hover:text-graphite-900 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
}
