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
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 rounded-full border border-border/80 bg-background/70 pr-2 pl-5 shadow-[0_8px_30px_rgb(0_0_0/0.35)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5 text-sm font-medium text-foreground">
          <span className="grid size-7 place-items-center rounded-full bg-foreground font-serif text-base text-background italic">
            N
          </span>
          {profile.shortName}
        </Link>
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Sections">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "bg-secondary text-foreground",
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
          <a
            href={`mailto:${profile.email}`}
            className="ml-2 inline-flex h-10 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-oxide"
          >
            Say hello
          </a>
        </nav>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-10 rounded-full sm:hidden"
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
          className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border bg-surface/95 px-5 py-3 backdrop-blur-xl sm:hidden"
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
            className={cn(buttonVariants({ size: "lg" }), "mt-3 h-11 w-full rounded-full")}
            onClick={() => setOpen(false)}
          >
            Email {profile.shortName}
          </a>
        </nav>
      ) : null}
    </header>
  );
}
