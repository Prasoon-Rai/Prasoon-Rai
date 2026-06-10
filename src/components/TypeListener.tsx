import { useEffect, useState } from "react";

/**
 * Listens for the user typing "dark" or "light" ANYWHERE on the page
 * (no input focused) and toggles the theme accordingly.
 * Also shows a tiny ghost-text HUD of what you're currently typing.
 */
export function TypeListener() {
  const [buffer, setBuffer] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    // restore previous theme
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1 || !/[a-zA-Z]/.test(e.key)) {
        if (e.key === "Backspace") setBuffer((b) => b.slice(0, -1));
        return;
      }
      setBuffer((prev) => {
        const next = (prev + e.key).toLowerCase().slice(-12);
        if (next.endsWith("dark")) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
          setFlash("◐ dark mode");
          setTimeout(() => setFlash(null), 1400);
          return "";
        }
        if (next.endsWith("light")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
          setFlash("◑ light mode");
          setTimeout(() => setFlash(null), 1400);
          return "";
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[60] flex flex-col gap-1 text-xs uppercase tracking-widest">
      <span className="rounded-full border border-foreground/40 bg-background/70 px-3 py-1 font-mono text-foreground/70 backdrop-blur">
        type <b className="text-foreground">dark</b> or <b className="text-foreground">light</b>
        {buffer && <span className="ml-2 text-muted-foreground">› {buffer}</span>}
      </span>
      {flash && (
        <span className="self-start rounded-full bg-foreground px-3 py-1 font-mono text-background">
          {flash}
        </span>
      )}
    </div>
  );
}
