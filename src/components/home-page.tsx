import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, Mail, MapPin, Phone } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/brand-icons";
import { CopyEmail } from "@/components/copy-email";
import { profile, projects, roles, type Writeup } from "@/lib/content";
import { cn } from "@/lib/utils";

const focus = ["Documents", "Retrieval", "Real time voice", "Speech data", "Software agents"];

// Small visual for projects that have no results table.
const projectFlow: Record<string, string[]> = {
  "swe-agent": ["search", "read", "edit", "run tests", "observe"],
};

function splitMeta(meta: string) {
  const at = meta.lastIndexOf(", ");
  if (at === -1) return { org: meta, dates: "" };
  return { org: meta.slice(0, at), dates: meta.slice(at + 2).replace(" to ", " – ") };
}

function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-oxide uppercase">
          {index} / {kicker}
        </p>
        <h2 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">{title}</h2>
      </div>
    </div>
  );
}

function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((skill) => (
        <li
          key={skill}
          className="rounded-full border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}

function RoleEntry({ item, last }: { item: Writeup; last: boolean }) {
  const { org, dates } = splitMeta(item.meta);
  return (
    <li className="relative grid gap-3 pb-12 pl-8 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-10 sm:pl-0">
      {/* Timeline rail */}
      <span
        aria-hidden
        className={cn(
          "absolute top-2 left-[5px] w-px bg-gradient-to-b from-border via-border to-transparent sm:left-[14.25rem]",
          last ? "h-16" : "bottom-0",
        )}
      />
      <span
        aria-hidden
        className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-oxide bg-background shadow-[0_0_12px_rgb(255_154_92/0.5)] sm:left-[14.25rem] sm:-translate-x-[5px]"
      />
      <div className="sm:pt-0.5 sm:text-right">
        <p className="font-mono text-xs text-faint">{dates}</p>
        <p className="mt-1 text-sm font-medium text-foreground/90">{org}</p>
      </div>
      <Link
        href={item.href}
        className="group card-hover -mt-2 -ml-4 block rounded-2xl border border-transparent p-4 sm:-mt-4 sm:ml-0 sm:p-5"
      >
        <h3 className="flex items-center gap-2 text-xl font-medium tracking-tight">
          {item.title}
          <ArrowUpRight className="size-4 text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-oxide" />
        </h3>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">{item.summary}</p>
        <Chips items={item.skills} className="mt-4" />
      </Link>
    </li>
  );
}

function ProjectCard({ item }: { item: Writeup }) {
  const shipped = item.table?.rows.find((row) => row.emphasis);
  const metricColumns = item.table ? [2, 4, 5] : [];
  const flow = projectFlow[item.slug];
  const external = item.links.filter((link) => link.home);

  return (
    <article
      className="group card-hover relative flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-oxide/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex items-start justify-between gap-4">
        <h3 className="font-serif text-3xl tracking-tight sm:text-4xl">{item.title}</h3>
        <span className="mt-1 hidden font-mono text-[11px] tracking-widest text-faint uppercase sm:block">
          Project
        </span>
      </div>
      <p className="relative mt-2 text-sm text-oxide/90">{item.meta}</p>
      <p className="relative mt-4 max-w-2xl leading-relaxed text-muted-foreground">{item.summary}</p>

      {shipped && item.table ? (
        <dl className="relative mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
          {metricColumns.map((col) => (
            <div key={col} className="bg-background/80 px-4 py-3">
              <dt className="font-mono text-[10px] tracking-wider text-faint uppercase">{item.table!.columns[col]}</dt>
              <dd className="mt-1 text-lg font-medium tabular-nums">{shipped.cells[col]}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {flow ? (
        <ol className="relative mt-6 flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
          {flow.map((step, index) => (
            <li key={step} className="flex items-center gap-1.5">
              <span className="rounded-md border border-border bg-background/80 px-2 py-1">{step}</span>
              {index < flow.length - 1 ? <ArrowRight className="size-3 text-faint" /> : null}
            </li>
          ))}
          <li className="ml-1 text-faint">↺ loop</li>
        </ol>
      ) : null}

      <Chips items={item.skills} className="relative mt-6" />

      {/* Not positioned, so the link's ::after overlay stretches over the whole card. */}
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-8 text-sm">
        <Link
          href={item.href}
          className="inline-flex items-center gap-1.5 font-medium text-foreground after:absolute after:inset-0 after:content-['']"
        >
          Read the write-up
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
        {external.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="relative z-10 inline-flex items-center gap-1 text-muted-foreground hover:text-oxide"
          >
            {link.label}
            <ArrowUpRight className="size-3.5" />
          </a>
        ))}
      </div>
    </article>
  );
}

export function HomePage() {
  return (
    <main id="content">
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pt-14 pb-16 sm:px-8 sm:pt-24 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center lg:gap-16">
        <div>
          <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pr-3.5 pl-3 text-xs text-muted-foreground backdrop-blur">
            <span className="size-2 animate-pulse-dot rounded-full bg-live" />
            {profile.availability}
          </p>
          <h1 className="mt-7 animate-rise font-serif text-6xl leading-[0.95] tracking-tight [animation-delay:80ms] sm:text-7xl lg:text-8xl">
            Nadeem
            <br />
            <span className="text-muted-foreground italic">Shabir Mir</span>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-muted-foreground [animation-delay:160ms] sm:text-xl">
            {profile.degree} at <span className="text-foreground">{profile.school}</span>. I build AI systems for
            documents, retrieval, speech, and software agents, and I pick the design by measuring it.
          </p>
          <ul className="mt-6 flex animate-rise flex-wrap gap-2 [animation-delay:220ms]">
            {focus.map((item) => (
              <li key={item} className="rounded-full bg-secondary px-3 py-1 text-xs text-foreground/80">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:280ms]">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-oxide"
            >
              <Mail className="size-4" />
              Get in touch
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-foreground/40"
            >
              <FileText className="size-4" />
              Resume
              <ArrowUpRight className="size-3.5 text-muted-foreground" />
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-[#25d366]"
              >
                <WhatsAppIcon className="size-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener me"
                className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <GitHubIcon className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener me"
                className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LinkedInIcon className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <p className="mt-6 flex animate-rise flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground [animation-delay:340ms]">
            <a href={profile.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Phone className="size-4 text-oxide" />
              {profile.phone}
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <WhatsAppIcon className="size-4 text-[#25d366]" />
              Chat on WhatsApp
            </a>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[300px] animate-rise [animation-delay:200ms] lg:max-w-none">
          <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-oxide/30 via-transparent to-transparent blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-surface">
            <Image
              src={profile.portraitSrc}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 340px, 300px"
              quality={90}
              className="object-cover object-[center_20%] grayscale-[15%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <div className="absolute -bottom-4 left-4 flex items-center gap-2 rounded-full border border-border bg-surface/90 px-3.5 py-2 text-xs backdrop-blur-md sm:-left-6">
            <MapPin className="size-3.5 text-oxide" />
            {profile.location} · {profile.classYear}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-16 sm:px-8">
        <SectionHeading index="01" kicker="Experience" title="Where I've worked" />
        <ol className="mt-14">
          {roles.map((role, index) => (
            <RoleEntry key={role.slug} item={role} last={index === roles.length - 1} />
          ))}
        </ol>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-16 sm:px-8">
        <SectionHeading index="02" kicker="Projects" title="Things I've built" />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} item={project} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-28 pb-24 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-14 sm:px-14 sm:py-20">
          <div aria-hidden className="glow absolute inset-0 opacity-80" />
          <div aria-hidden className="bg-grid absolute inset-0" />
          <div className="relative">
            <p className="font-mono text-xs tracking-[0.2em] text-oxide uppercase">03 / Contact</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl">
              Let&apos;s build something <span className="text-oxide italic">that holds up.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{profile.availability}</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-10 inline-block font-serif text-2xl break-all sm:text-4xl"
            >
              {profile.email}
            </a>
            <div className="mt-8 flex flex-wrap items-start gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-oxide"
              >
                <Mail className="size-4" />
                Send an email
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25d366] px-5 text-sm font-medium text-[#062e16] transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-foreground/40"
              >
                <FileText className="size-4" />
                Resume
              </a>
              <CopyEmail email={profile.email} />
            </div>
            <a
              href={profile.phoneHref}
              className="mt-6 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="size-4 text-oxide" />
              {profile.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
