"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTopOnRouteChange() {
    const pathname = usePathname();
    const previousPath = useRef<string>("");

    useEffect(() => {
        const hash = window.location.hash;

        // CASE 1: If URL has hash → do NOT scroll to top (hash handler will manage scrolling)
        if (hash) return;

        // CASE 2: If navigating between pages → scroll to top ONLY when pathname changes
        if (previousPath.current && previousPath.current !== pathname) {
            window.scrollTo({ top: 0 });
        }

        previousPath.current = pathname;
    }, [pathname]);

    return null;
}
