import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WriteupView } from "@/components/writeup";
import { roleBySlug, roles } from "@/lib/content";

export function generateStaticParams() {
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = roleBySlug(slug);
  if (!role) return { title: "Not found" };
  return { title: role.title };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = roleBySlug(slug);
  if (!role) notFound();
  return (
    <main id="content">
      <WriteupView item={role} />
    </main>
  );
}
