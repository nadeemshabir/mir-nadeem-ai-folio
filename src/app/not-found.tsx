import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main id="content" className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-oxide">404</p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight">This page is not part of the portfolio.</h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
        Experience, projects, and contact details are on the home page.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 w-fit rounded-full px-5")}>
        Back to the portfolio
      </Link>
    </main>
  );
}
