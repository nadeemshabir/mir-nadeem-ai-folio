"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyEmail({
  email,
  tone = "default",
}: {
  email: string;
  tone?: "default" | "inverse";
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
    window.setTimeout(() => setState("idle"), 2400);
  }

  const label =
    state === "copied" ? "Email copied" : state === "error" ? "Could not copy" : "Copy email";

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className={cn("h-11 rounded-full px-5", tone === "inverse" && "text-[#1c1915] hover:text-[#1c1915]")}
        onClick={onCopy}
      >
        {state === "copied" ? <Check /> : <Copy />}
        {label}
      </Button>
      {state === "error" ? (
        <p
          className={tone === "inverse" ? "max-w-xs text-sm text-[#d9d1c3]" : "max-w-xs text-sm text-muted-foreground"}
          role="status"
        >
          Clipboard access is blocked in this browser. Select the address above, or use the mail link.
        </p>
      ) : (
        <p className="sr-only" role="status">
          {state === "copied" ? "Email address copied to the clipboard." : ""}
        </p>
      )}
    </div>
  );
}
