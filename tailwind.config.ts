import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Light theme with white primary and graphite accents
                background: {
                    DEFAULT: "#FFFFFF",
                    secondary: "#F8F9FA",
                    tertiary: "#F1F3F4",
                },
                // Graphite accent colors
                graphite: {
                    50: "#F5F5F6",
                    100: "#E8E9EB",
                    200: "#D1D4D7",
                    300: "#B0B5BB",
                    400: "#8A919A",
                    500: "#6B737E",
                    600: "#565C65",
                    700: "#464B52",
                    800: "#3C4047",
                    900: "#2D3035",
                    950: "#1A1C1F",
                },
                // Grey shades
                grey: {
                    50: "#FAFAFA",
                    100: "#F4F4F5",
                    200: "#E4E4E7",
                    300: "#D4D4D8",
                    400: "#A1A1AA",
                    500: "#71717A",
                    600: "#52525B",
                    700: "#3F3F46",
                    800: "#27272A",
                    900: "#18181B",
                },
                // Accent for CTAs
                accent: {
                    DEFAULT: "#2D3035",
                    hover: "#1A1C1F",
                    light: "#464B52",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-outfit)", "system-ui", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out forwards",
                "fade-in-up": "fadeInUp 0.6s ease-out forwards",
                "slide-up": "slideUp 0.5s ease-out",
                "scale-in": "scaleIn 0.3s ease-out",
                float: "float 6s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            boxShadow: {
                card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)",
                "card-hover": "0 4px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
                "card-active": "0 8px 24px rgba(0,0,0,0.12), 0 16px 48px rgba(0,0,0,0.08)",
            },
            transitionTimingFunction: {
                smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
    },
    plugins: [],
};

export default config;
