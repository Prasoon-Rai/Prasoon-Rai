import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Counts = Record<string, number>; // YYYY-MM-DD -> count

const DAY_MS = 86400000;

function toKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildGrid(counts: Counts) {
  // 53 weeks ending today, columns = weeks, rows = days (Sun..Sat)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // align end to Saturday of current week
  const endDow = today.getDay(); // 0..6
  const end = new Date(today.getTime() + (6 - endDow) * DAY_MS);
  const weeks = 53;
  const start = new Date(end.getTime() - (weeks * 7 - 1) * DAY_MS);
  const cols: { date: Date; count: number; future: boolean }[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: { date: Date; count: number; future: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start.getTime() + (w * 7 + d) * DAY_MS);
      const future = date > today;
      col.push({ date, count: counts[toKey(date)] ?? 0, future });
    }
    cols.push(col);
  }
  return cols;
}

function levelOf(count: number, max: number) {
  if (count <= 0) return 0;
  const r = count / Math.max(max, 4);
  if (r > 0.66) return 4;
  if (r > 0.33) return 3;
  if (r > 0.1) return 2;
  return 1;
}

function Heatmap({
  title,
  subtitle,
  counts,
  loading,
  error,
  palette,
}: {
  title: string;
  subtitle: string;
  counts: Counts;
  loading: boolean;
  error: string | null;
  palette: "yellow" | "warm";
}) {
  const grid = useMemo(() => buildGrid(counts), [counts]);
  const total = useMemo(() => Object.values(counts).reduce((a, b) => a + b, 0), [counts]);
  const max = useMemo(() => Math.max(0, ...Object.values(counts)), [counts]);
  const activeDays = useMemo(() => Object.values(counts).filter((v) => v > 0).length, [counts]);

  const yellowShades = [
    "var(--color-secondary)", // empty surface
    "color-mix(in oklab, #FEE500 35%, var(--color-secondary))",
    "color-mix(in oklab, #FEE500 60%, var(--color-secondary))",
    "#FEE500",
    "color-mix(in oklab, #FEE500 80%, #232323)",
  ];
  const warmShades = [
    "var(--color-secondary)",
    "color-mix(in oklab, #7A746F 25%, var(--color-secondary))",
    "color-mix(in oklab, #7A746F 55%, var(--color-secondary))",
    "#7A746F",
    "#494745",
  ];
  const shades = palette === "yellow" ? yellowShades : warmShades;

  // month labels
  const monthLabels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  grid.forEach((col, i) => {
    const m = col[0].date.getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ col: i, label: col[0].date.toLocaleString("en", { month: "short" }) });
      lastMonth = m;
    }
  });

  return (
    <div className="border-2 border-foreground bg-secondary p-5 md:p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="font-[var(--font-display)] text-2xl uppercase leading-none md:text-3xl">{title}</h3>
          <p className="mt-1 font-[var(--font-serif)] text-base italic opacity-80">{subtitle}</p>
        </div>
        <div className="text-right text-xs uppercase tracking-widest text-muted-foreground">
          {loading ? "loading…" : error ? "offline" : (
            <>
              <div>{total} submissions</div>
              <div>{activeDays} active days · max {max}/day</div>
            </>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* month row */}
          <div className="relative ml-7 h-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            {monthLabels.map((m, i) => (
              <span
                key={i}
                className="absolute top-0"
                style={{ left: `${m.col * 14}px` }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex">
            {/* day labels */}
            <div className="mr-1 flex flex-col gap-[2px] pt-[2px] text-[10px] uppercase tracking-widest text-muted-foreground">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <div key={i} className="h-[12px] leading-[12px]">{d}</div>
              ))}
            </div>
            {/* grid */}
            <div className="flex gap-[2px]">
              {grid.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-[2px]">
                  {col.map((cell, ri) => {
                    const lvl = levelOf(cell.count, max);
                    return (
                      <motion.div
                        key={ri}
                        initial={{ opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: cell.future ? 0.15 : 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25, delay: Math.min(ci * 0.005, 0.8) }}
                        title={`${toKey(cell.date)} · ${cell.count} submission${cell.count === 1 ? "" : "s"}`}
                        className="h-[12px] w-[12px] border border-foreground/20"
                        style={{ backgroundColor: cell.future ? "transparent" : shades[lvl] }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>less</span>
        {shades.map((s, i) => (
          <span key={i} className="h-[12px] w-[12px] border border-foreground/20" style={{ backgroundColor: s }} />
        ))}
        <span>more</span>
      </div>

      {error && (
        <p className="mt-3 font-[var(--font-serif)] text-sm italic text-muted-foreground">
          couldn't fetch live data ({error}) — heatmap shown empty.
        </p>
      )}
    </div>
  );
}

export function Contributions() {
  const [lc, setLc] = useState<Counts>({});
  const [lcLoading, setLcLoading] = useState(true);
  const [lcError, setLcError] = useState<string | null>(null);

  const [nc, setNc] = useState<Counts>({});
  const [ncLoading, setNcLoading] = useState(true);
  const [ncError, setNcError] = useState<string | null>(null);

  // LeetCode via unofficial proxy
  useEffect(() => {
    const url = "https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=prasoon-rai";
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("api " + r.status);
        return r.json();
      })
      .then((data) => {
        const raw =
          data?.data?.matchedUser?.userCalendar?.submissionCalendar ??
          data?.submissionCalendar ??
          null;
        const obj = typeof raw === "string" ? JSON.parse(raw) : raw;
        if (!obj) throw new Error("no calendar");
        const counts: Counts = {};
        for (const [ts, n] of Object.entries(obj)) {
          const d = new Date(Number(ts) * 1000);
          counts[toKey(d)] = (counts[toKey(d)] ?? 0) + Number(n);
        }
        setLc(counts);
      })
      .catch((e) => setLcError(e.message))
      .finally(() => setLcLoading(false));
  }, []);

  // NeetCode via GitHub commits to repo
  useEffect(() => {
    async function load() {
      try {
        const counts: Counts = {};
        // paginate up to 5 pages of 100
        for (let page = 1; page <= 5; page++) {
          const r = await fetch(
            `https://api.github.com/repos/Prasoon-Rai/neetcode-submissions/commits?per_page=100&page=${page}`,
          );
          if (!r.ok) throw new Error("gh " + r.status);
          const arr: Array<{ commit: { author: { date: string } } }> = await r.json();
          if (!arr.length) break;
          for (const c of arr) {
            const d = new Date(c.commit.author.date);
            const k = toKey(d);
            counts[k] = (counts[k] ?? 0) + 1;
          }
          if (arr.length < 100) break;
        }
        setNc(counts);
      } catch (e: any) {
        setNcError(e.message);
      } finally {
        setNcLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section id="contributions" className="relative bg-background px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">(03) Receipts</span>
          <h2 className="mt-2 text-5xl md:text-7xl">Grind / Heatmaps</h2>
          <p className="mt-4 max-w-2xl font-[var(--font-serif)] text-xl italic text-muted-foreground">
            one square per day. yellow squares = LeetCode submissions. warm gray squares = NeetCode problems synced from my submissions repo. the darker the box, the louder the day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Heatmap
            title="LeetCode · @prasoon-rai"
            subtitle="live from leetcode's submission calendar"
            counts={lc}
            loading={lcLoading}
            error={lcError}
            palette="yellow"
          />
          <Heatmap
            title="NeetCode · synced repo"
            subtitle="commits to Prasoon-Rai/neetcode-submissions"
            counts={nc}
            loading={ncLoading}
            error={ncError}
            palette="warm"
          />
        </div>
      </div>
    </section>
  );
}
