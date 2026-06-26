import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type Counts = Record<string, number>;

const DAY_MS = 86400000;

function toKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function buildGrid(lc: Counts, nc: Counts) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDow = today.getDay();
  const end = new Date(today.getTime() + (6 - endDow) * DAY_MS);
  const weeks = 53;
  const start = new Date(end.getTime() - (weeks * 7 - 1) * DAY_MS);
  const cols: {
    date: Date;
    lc: number;
    nc: number;
    total: number;
    future: boolean;
    hasLc: boolean;
    hasNc: boolean;
  }[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: {
      date: Date;
      lc: number;
      nc: number;
      total: number;
      future: boolean;
      hasLc: boolean;
      hasNc: boolean;
    }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start.getTime() + (w * 7 + d) * DAY_MS);
      const k = toKey(date);
      const lcCount = lc[k] ?? 0;
      const ncCount = nc[k] ?? 0;
      col.push({
        date,
        lc: lcCount,
        nc: ncCount,
        total: lcCount + ncCount,
        future: date > today,
        hasLc: lcCount > 0,
        hasNc: ncCount > 0,
      });
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

function cellColor(cell: {
  hasLc: boolean;
  hasNc: boolean;
  total: number;
  future: boolean;
}, maxTotal: number) {
  if (cell.future) return "transparent";
  if (!cell.hasLc && !cell.hasNc) return "var(--color-secondary)";

  const lvl = levelOf(cell.total, maxTotal);

  if (cell.hasLc && !cell.hasNc) {
    switch (lvl) {
      case 1: return "color-mix(in oklab, #FEE500 35%, var(--color-secondary))";
      case 2: return "color-mix(in oklab, #FEE500 60%, var(--color-secondary))";
      case 3: return "#FEE500";
      case 4: return "color-mix(in oklab, #FEE500 80%, #232323)";
    }
  }
  if (!cell.hasLc && cell.hasNc) {
    switch (lvl) {
      case 1: return "color-mix(in oklab, #7A746F 25%, var(--color-secondary))";
      case 2: return "color-mix(in oklab, #7A746F 55%, var(--color-secondary))";
      case 3: return "#7A746F";
      case 4: return "#494745";
    }
  }
  // both
  switch (lvl) {
    case 1: return "color-mix(in oklab, #FEEA80 35%, var(--color-secondary))";
    case 2: return "#FEEA80";
    case 3: return "color-mix(in oklab, #FEE500 50%, #7A746F)";
    case 4: return "color-mix(in oklab, #FEE500 70%, #494745)";
  }
  return "var(--color-secondary)";
}

export function Contributions() {
  const [lc, setLc] = useState<Counts>({});
  const [lcLoading, setLcLoading] = useState(true);
  const [lcError, setLcError] = useState<string | null>(null);

  const [nc, setNc] = useState<Counts>({});
  const [ncLoading, setNcLoading] = useState(true);
  const [ncError, setNcError] = useState<string | null>(null);

  useEffect(() => {
    const url = "https://leetcode-api-faisalshohag.vercel.app/prasoon-rai";
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("api " + r.status);
        return r.json();
      })
      .then((data) => {
        const obj = data?.submissionCalendar;
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

  useEffect(() => {
    async function load() {
      try {
        const counts: Counts = {};
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

  const grid = useMemo(() => buildGrid(lc, nc), [lc, nc]);
  const maxTotal = useMemo(
    () => Math.max(0, ...grid.flat().map((c) => c.total)),
    [grid],
  );

  const totalLc = useMemo(
    () => Object.values(lc).reduce((a, b) => a + b, 0),
    [lc],
  );
  const totalNc = useMemo(
    () => Object.values(nc).reduce((a, b) => a + b, 0),
    [nc],
  );
  const activeDays = useMemo(
    () => grid.flat().filter((c) => c.total > 0).length,
    [grid],
  );

  const monthLabels: { col: number; label: string }[] = [];
  let lastMonth = -1;
  grid.forEach((col, i) => {
    const m = col[0].date.getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ col: i, label: col[0].date.toLocaleString("en", { month: "short" }) });
      lastMonth = m;
    }
  });

  const yellowLegend = [
    "var(--color-secondary)",
    "color-mix(in oklab, #FEE500 35%, var(--color-secondary))",
    "color-mix(in oklab, #FEE500 60%, var(--color-secondary))",
    "#FEE500",
    "color-mix(in oklab, #FEE500 80%, #232323)",
  ];
  const warmLegend = [
    "var(--color-secondary)",
    "color-mix(in oklab, #7A746F 25%, var(--color-secondary))",
    "color-mix(in oklab, #7A746F 55%, var(--color-secondary))",
    "#7A746F",
    "#494745",
  ];
  const bothLegend = [
    "var(--color-secondary)",
    "color-mix(in oklab, #FEEA80 35%, var(--color-secondary))",
    "#FEEA80",
    "color-mix(in oklab, #FEE500 50%, #7A746F)",
    "color-mix(in oklab, #FEE500 70%, #494745)",
  ];

  const loading = lcLoading || ncLoading;
  const error = lcError || ncError;

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
          <h2 className="mt-2 text-5xl md:text-7xl">Grind / Heatmap</h2>
          <p className="mt-4 max-w-2xl font-[var(--font-serif)] text-xl italic text-muted-foreground">
            one square per day. yellow = LeetCode. warm gray = NeetCode. mixed gold = both. darker means louder.
          </p>
        </motion.div>

        <div className="border-2 border-foreground bg-secondary p-5 md:p-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h3 className="font-[var(--font-display)] text-2xl uppercase leading-none md:text-3xl">
                combined grind
              </h3>
              <p className="mt-1 font-[var(--font-serif)] text-base italic opacity-80">
                LeetCode + NeetCode submissions
              </p>
            </div>
            <div className="text-right text-xs uppercase tracking-widest text-muted-foreground">
              {loading ? (
                "loading…"
              ) : error ? (
                "offline"
              ) : (
                <>
                  <div>{totalLc + totalNc} total submissions</div>
                  <div>{activeDays} active days · max {maxTotal}/day</div>
                  <div className="mt-1">
                    <span className="text-[#FEE500]">{totalLc}</span> lc ·{" "}
                    <span className="text-[#7A746F]">{totalNc}</span> nc
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
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
                <div className="mr-1 flex flex-col gap-[2px] pt-[2px] text-[10px] uppercase tracking-widest text-muted-foreground">
                  {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                    <div key={i} className="h-[12px] leading-[12px]">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="flex gap-[2px]">
                  {grid.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-[2px]">
                      {col.map((cell, ri) => {
                        const color = cellColor(cell, maxTotal);
                        return (
                          <motion.div
                            key={ri}
                            initial={{ opacity: 0, scale: 0.4 }}
                            whileInView={{ opacity: cell.future ? 0.15 : 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.25, delay: Math.min(ci * 0.005, 0.8) }}
                            title={
                              `${toKey(cell.date)} — ` +
                              (cell.hasLc ? `${cell.lc} LC` : "") +
                              (cell.hasLc && cell.hasNc ? " + " : "") +
                              (cell.hasNc ? `${cell.nc} NC` : "") +
                              (cell.total ? ` (${cell.total} total)` : "no submissions")
                            }
                            className="h-[12px] w-[12px] border border-foreground/20"
                            style={{ backgroundColor: color }}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">LeetCode only</div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">less</span>
                {yellowLegend.map((s, i) => (
                  <span key={i} className="h-[12px] w-[12px] border border-foreground/20" style={{ backgroundColor: s }} />
                ))}
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">more</span>
              </div>
            </div>
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">NeetCode only</div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">less</span>
                {warmLegend.map((s, i) => (
                  <span key={i} className="h-[12px] w-[12px] border border-foreground/20" style={{ backgroundColor: s }} />
                ))}
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">more</span>
              </div>
            </div>
            <div>
              <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Both (mixed)</div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">less</span>
                {bothLegend.map((s, i) => (
                  <span key={i} className="h-[12px] w-[12px] border border-foreground/20" style={{ backgroundColor: s }} />
                ))}
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">more</span>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-3 font-[var(--font-serif)] text-sm italic text-muted-foreground">
              couldn't fetch live data ({error}) — heatmap shown empty.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
