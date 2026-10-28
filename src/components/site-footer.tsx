import { GitHubIcon, LinkedInIcon } from "@/components/brand-icons";
import { profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © 2026 {profile.name} · {profile.location}
        </p>
        <div className="flex items-center gap-1">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener me"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener me"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary hover:text-foreground"
          >
            <LinkedInIcon className="size-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
