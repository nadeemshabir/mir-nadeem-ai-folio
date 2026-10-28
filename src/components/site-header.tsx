"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { nav, profile } from "@/lib/content";
import { scrollToSection } from "@/lib/scroll-to";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const elements = nav
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.15, 0.4] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function follow(id: string) {
    const target = document.getElementById(id);
    setOpen(false);
    if (!target) return;
    window.setTimeout(() => {
      scrollToSection(id);
      window.history.replaceState(null, "", `/#${id}`);
    }, 60);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-4 px-5">
        <Link href="/" className="text-base font-medium text-foreground">
          {profile.shortName}
        </Link>
        <nav className="hidden items-center gap-5 sm:flex" aria-label="Sections">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground",
                  isActive && "text-foreground",
                )}
                onClick={(event) => {
                  if (!document.getElementById(item.id)) return;
                  event.preventDefault();
                  scrollToSection(item.id);
                  window.history.replaceState(null, "", item.href);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 sm:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </Button>
      </div>
      {open ? (
        <nav
          id="site-menu"
          aria-label="Sections"
          className="border-t border-border bg-background px-5 py-3 sm:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex h-12 items-center border-b border-border text-base text-foreground last:border-b-0"
                  onClick={(event) => {
                    if (!document.getElementById(item.id)) {
                      setOpen(false);
                      return;
                    }
                    event.preventDefault();
                    follow(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className={cn(buttonVariants({ size: "lg" }), "mt-3 h-11 w-full")}
            onClick={() => setOpen(false)}
          >
            Email {profile.shortName}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
