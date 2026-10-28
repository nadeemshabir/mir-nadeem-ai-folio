import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Info } from "lucide-react";
import { RichText } from "@/components/rich-text";
import type { Writeup } from "@/lib/content";
import { cn } from "@/lib/utils";

export function WriteupView({ item }: { item: Writeup }) {
  const kind = item.back.includes("projects") ? "Project" : "Experience";

  return (
    <article className="mx-auto max-w-3xl px-5 pt-12 pb-24 sm:px-8 sm:pt-16">
      <Link
        href={item.back}
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        Back
      </Link>

      <header className="mt-10 animate-rise">
        <p className="font-mono text-xs tracking-[0.2em] text-oxide uppercase">{kind}</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl">{item.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{item.meta}</p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/90">{item.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {skill}
            </li>
          ))}
        </ul>

        {item.links.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            {item.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 transition-colors hover:border-oxide/50 hover:text-oxide"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="mt-14 space-y-14 border-t border-border pt-14">
        {item.table ? (
          <section>
            <h2 className="font-serif text-3xl tracking-tight">Evaluation</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.table.caption}</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm tabular-nums">
                <thead>
                  <tr className="border-b border-border">
                    {item.table.columns.map((column) => (
                      <th
                        key={column}
                        className="px-4 py-3 font-mono text-[11px] font-normal tracking-wider text-faint uppercase"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.table.rows.map((row) => (
                    <tr
                      key={row.cells[0]}
                      className={cn(
                        "border-b border-border last:border-b-0",
                        row.emphasis && "bg-oxide/10 text-foreground",
                      )}
                    >
                      {row.cells.map((cell, index) => (
                        <td
                          key={`${row.cells[0]}-${index}`}
                          className={cn(
                            "px-4 py-3",
                            index === 0 ? "text-foreground/90" : "text-muted-foreground",
                            row.emphasis && "font-medium text-foreground",
                            row.emphasis && index === 0 && "text-oxide",
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {item.sections.map((section, sectionIndex) => (
          <section key={section.heading} className="grid gap-4 sm:grid-cols-[3rem_minmax(0,1fr)]">
            <span className="font-mono text-xs text-faint sm:pt-3">{String(sectionIndex + 1).padStart(2, "0")}</span>
            <div>
              <h2 className="font-serif text-3xl tracking-tight">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-muted-foreground">
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 leading-relaxed text-muted-foreground">
                      <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-oxide" />
                      <span>
                        <RichText text={bullet} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      {item.note ? (
        <p className="mt-16 flex gap-3 rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-4 shrink-0 text-oxide" />
          {item.note}
        </p>
      ) : null}
    </article>
  );
}
