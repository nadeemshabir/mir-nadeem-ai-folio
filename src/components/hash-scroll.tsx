"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/lib/scroll-to";

export function HashScroll() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;

    scrollToSection(id);
    const timer = window.setTimeout(() => scrollToSection(id), 60);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
