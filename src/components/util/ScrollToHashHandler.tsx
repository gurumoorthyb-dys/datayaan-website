"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Robust scroll-to-hash handler:
 * - Scrolls only when the hash belongs to the same pathname (i.e., same page),
 *   or when navigation landed with a hash on the same pathname.
 * - Ignores hashchange events caused by navigating to a different pathname.
 */
export default function ScrollToHashHandler() {
    const pathname = usePathname();
    const lastPathRef = useRef<string | null>(null);

    useEffect(() => {
        // keep track of last pathname observed
        lastPathRef.current = pathname;
    }, [pathname]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const scrollToHash = (hash: string) => {
            if (!hash) return;
            const el = document.querySelector(hash);
            if (!el) return;
            // small timeout so RSC/dom finishes rendering
            setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
                // adjust if you have a sticky header; set -80 or appropriate px
                window.scrollBy({ top: -80, behavior: "smooth" });
            }, 120);
        };

        // handle initial load or when path changes and URL already contains hash
        if (window.location.hash) {
            // only scroll if the current pathname matches lastPathRef (meaning page loaded/landed here)
            // or when there is no previous path recorded yet (initial mount)
            const currentPath = window.location.pathname;
            if (!lastPathRef.current || lastPathRef.current === currentPath) {
                scrollToHash(window.location.hash);
            }
        }

        // hashchange handler that checks if the path stayed the same
        const onHashChange = (e: HashChangeEvent) => {
            try {
                const oldUrl = new URL(e.oldURL);
                const newUrl = new URL(e.newURL);

                // If pathname changed during this hash change, ignore it (navigation occurred)
                if (oldUrl.pathname !== newUrl.pathname) return;

                // same pathname — this is a same-page hash change => scroll
                scrollToHash(newUrl.hash);
            } catch (err) {
                // fallback: if parsing fails, only scroll when hash exists and pathname didn't change
                if (window.location.hash && lastPathRef.current === window.location.pathname) {
                    scrollToHash(window.location.hash);
                }
            }
        };

        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []); // run once (pathname updates are handled via lastPathRef)

    return null;
}
