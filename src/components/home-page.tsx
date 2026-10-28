import Image from "next/image";
import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { profile, projects, roles, type Writeup } from "@/lib/content";

function Entry({ item }: { item: Writeup }) {
  return (
    <article className="border-t border-border py-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-lg font-medium">{item.title}</h3>
        <p className="text-sm text-muted-foreground">{item.meta}</p>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed sm:text-base">{item.summary}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Skills: {item.skills.join(", ")}</p>
      <p className="mt-3 text-sm">
        <Link href={item.href} className="text-oxide underline underline-offset-4">
          Read more
        </Link>
        {item.links.filter((link) => link.home).map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-4 text-oxide underline underline-offset-4"
          >
            {link.label}
          </a>
        ))}
      </p>
    </article>
  );
}

export function HomePage() {
  return (
    <main id="content">
      <section className="mx-auto grid max-w-3xl gap-8 px-5 py-10 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-start sm:py-14">
        <div>
          <p className="text-sm text-muted-foreground">
            {profile.degree}, {profile.school}
          </p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight sm:text-5xl">{profile.name}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed">
            I build AI systems for documents, retrieval, speech, and software agents.
          </p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${profile.email}`} className="text-oxide underline underline-offset-4">
              {profile.email}
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a href={profile.github} className="text-oxide underline underline-offset-4" target="_blank" rel="noreferrer noopener me">
              GitHub
            </a>
            <a
              href={profile.linkedin}
              className="ml-4 text-oxide underline underline-offset-4"
              target="_blank"
              rel="noreferrer noopener me"
            >
              LinkedIn
            </a>
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-[180px] overflow-hidden bg-card sm:max-w-none">
          <Image
            src={profile.portraitSrc}
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="180px"
            quality={90}
            className="object-cover object-[center_20%]"
          />
        </div>
      </section>

      <section id="work" className="scroll-mt-20 mx-auto max-w-3xl px-5 pb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Experience</h2>
        <div className="mt-2">
          {roles.map((role) => (
            <Entry key={role.slug} item={role} />
          ))}
        </div>
      </section>

      <section id="projects" className="scroll-mt-20 mx-auto max-w-3xl px-5 pt-8 pb-4">
        <h2 className="text-sm font-medium text-muted-foreground">Projects</h2>
        <div className="mt-2">
          {projects.map((project) => (
            <Entry key={project.slug} item={project} />
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 mx-auto max-w-3xl px-5 py-12">
        <h2 className="text-sm font-medium text-muted-foreground">Contact</h2>
        <p className="mt-3 text-base">{profile.availability}</p>
        <p className="mt-3 text-lg">
          <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
            {profile.email}
          </a>
        </p>
        <div className="mt-4">
          <CopyEmail email={profile.email} />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {profile.location}, {profile.school}, {profile.classYear}
        </p>
      </section>
    </main>
  );
}
