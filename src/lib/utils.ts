import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });
}

export function getGridClasses(size: "small" | "medium" | "large"): string {
    const gridClasses = {
        small: "bento-card-small",
        medium: "bento-card-medium",
        large: "bento-card-large",
    };
    return gridClasses[size];
}
