import { profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <p className="mx-auto max-w-3xl px-5 py-6 text-sm text-muted-foreground">
        © 2026 {profile.name}
      </p>
    </footer>
  );
}
