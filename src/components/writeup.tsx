import Link from "next/link";
import { RichText } from "@/components/rich-text";
import type { Writeup } from "@/lib/content";

export function WriteupView({ item }: { item: Writeup }) {
  return (
    <article className="mx-auto max-w-2xl px-5 py-10">
      <Link href={item.back} className="text-sm text-oxide underline underline-offset-4">
        Back
      </Link>
      <h1 className="mt-5 text-3xl font-medium tracking-tight">{item.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{item.meta}</p>
      <p className="mt-4 text-sm leading-relaxed">
        <span className="text-muted-foreground">Skills: </span>
        {item.skills.join(", ")}
      </p>
      {item.links.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {item.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-oxide underline underline-offset-4"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-8 space-y-8">
        {item.table ? (
          <section>
            <h2 className="text-lg font-medium">Evaluation</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.table.caption}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {item.table.columns.map((column) => (
                      <th key={column} className="py-2 pr-4 font-medium">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.table.rows.map((row) => (
                    <tr key={row.cells[0]} className="border-b border-border">
                      {row.cells.map((cell, index) => (
                        <td
                          key={`${row.cells[0]}-${index}`}
                          className={index === 0 && row.emphasis ? "py-2 pr-4 font-medium" : "py-2 pr-4"}
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

        {item.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-lg font-medium">{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <RichText text={paragraph} />
              </p>
            ))}
            {section.bullets ? (
              <ul className="mt-3 space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    <RichText text={bullet} />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {item.note ? <p className="mt-10 text-sm leading-relaxed text-muted-foreground">{item.note}</p> : null}
    </article>
  );
}
