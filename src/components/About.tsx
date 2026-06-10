import { motion } from "framer-motion";
import portrait from "@/assets/prasoon-portrait.jpg.asset.json";

const experiences = [
  { when: "2024 — Now", what: "Shipping weird little internet things", where: "Independent" },
  { when: "2023", what: "Breaking & fixing open source", where: "GitHub / Various" },
  { when: "2022", what: "First serious lines of code", where: "Mostly self-taught, partly Stack Overflow" },
];

const values = ["Curious", "Opinionated", "Playful", "Detail-obsessed", "Ship > perfect", "Probably overthinking it"];

export function About() {
  return (
    <section id="about" className="relative bg-secondary px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-wrap items-end justify-between gap-4"
        >
          <h2 className="text-5xl md:text-7xl">About / Me</h2>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            (01) Hi, I'm Prasoon
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Left: portrait blueprint card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-foreground bg-background">
              {/* blueprint grid */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[var(--font-display)] text-[8rem] leading-none">P</span>
              </div>
              {/* corner brackets */}
              {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((p) => (
                <div key={p} className={`absolute h-4 w-4 border-2 border-foreground bg-background ${p}`} />
              ))}
            </div>
            <div className="mt-4 flex items-baseline justify-between text-sm">
              <span className="font-[var(--font-display)] uppercase">Prasoon Rai</span>
              <span className="text-muted-foreground">Developer • India</span>
            </div>
          </motion.div>

          {/* Middle: bio + contact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-5"
          >
            <span className="inline-block rounded-full border-2 border-foreground px-4 py-1 text-xs uppercase tracking-widest">
              Hi, I'm Prasoon
            </span>
            <p className="mt-6 font-[var(--font-serif)] text-2xl leading-snug md:text-3xl">
              A developer who loves making things that feel a little weird and a lot
              useful. I obsess over interfaces, ship side projects on weekends, and
              spend too much time picking fonts.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-t-2 border-foreground pt-4">
                <h4 className="mb-2 text-xs uppercase tracking-widest">Contact</h4>
                <a
                  href="mailto:prasoonrai@icloud.com"
                  data-cursor="hover"
                  className="block font-[var(--font-serif)] text-xl underline-offset-4 hover:underline md:text-2xl"
                >
                  prasoonrai@icloud.com
                </a>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t-2 border-foreground pt-4">
                <div>
                  <h4 className="mb-1 text-xs uppercase tracking-widest">Instagram</h4>
                  <a
                    href="https://instagram.com/prasoon_raii"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="font-[var(--font-serif)] text-lg hover:underline"
                  >
                    @prasoon_raii
                  </a>
                </div>
                <div>
                  <h4 className="mb-1 text-xs uppercase tracking-widest">GitHub</h4>
                  <a
                    href="https://github.com/Prasoon-Rai"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="font-[var(--font-serif)] text-lg hover:underline"
                  >
                    @Prasoon-Rai
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: timeline + values */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3"
          >
            <h4 className="mb-4 text-xs uppercase tracking-widest">Experience</h4>
            <ul className="space-y-5 border-l-2 border-dashed border-foreground pl-4">
              {experiences.map((e) => (
                <li key={e.what}>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{e.when}</div>
                  <div className="font-[var(--font-serif)] italic">{e.what}</div>
                  <div className="text-sm">{e.where}</div>
                </li>
              ))}
            </ul>

            <h4 className="mb-3 mt-10 text-xs uppercase tracking-widest">Values</h4>
            <div className="flex flex-wrap gap-2">
              {values.map((v) => (
                <span
                  key={v}
                  className="rounded-full border-2 border-foreground px-3 py-1 text-xs uppercase tracking-widest"
                >
                  {v}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
