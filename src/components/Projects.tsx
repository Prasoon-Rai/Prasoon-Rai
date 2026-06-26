import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  fork: boolean;
};

export function Projects() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/Prasoon-Rai/repos?per_page=100&sort=updated", {
      headers: { Accept: "application/vnd.github.mercy-preview+json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error("GitHub API error");
        return r.json();
      })
      .then((data: Repo[]) => {
        const filtered = data
          .filter((r) => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.updated_at) - +new Date(a.updated_at))
          .slice(0, 9);
        setRepos(filtered);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section id="projects" className="relative bg-background px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">(03) Open Source</span>
            <h2 className="mt-2 text-5xl md:text-7xl">Projects / GitHub</h2>
          </div>
          <a
            href="https://github.com/Prasoon-Rai"
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            className="rounded-full border-2 border-foreground px-5 py-2 text-sm uppercase tracking-widest hover:bg-foreground hover:text-background"
          >
            View all on GitHub ↗
          </a>
        </motion.div>

        {error && <p className="font-[var(--font-serif)] italic">Couldn't fetch repos: {error}</p>}

        {!repos && !error && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse border-2 border-foreground bg-secondary" />
            ))}
          </div>
        )}

        {repos && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((r, i) => (
              <motion.a
                key={r.id}
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden border-2 border-foreground bg-secondary p-6 transition-colors hover:bg-foreground hover:text-background"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-widest">
                    <span>#{String(i + 1).padStart(2, "0")}</span>
                    <span>{r.language ?? "—"}</span>
                  </div>
                  <h3 className="font-[var(--font-display)] text-2xl uppercase leading-tight">
                    {r.name.replace(/[-_]/g, " ")}
                  </h3>
                  <p className="mt-3 font-[var(--font-serif)] text-base italic opacity-80">
                    {r.description ?? "No description — but it's probably great."}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-widest">
                  <span>★ {r.stargazers_count} · ⑂ {r.forks_count}</span>
                  <span className="transition-transform group-hover:translate-x-1">↗</span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
