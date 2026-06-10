import { motion } from "framer-motion";
import portrait from "@/assets/prasoon.JPG";

const experiences = [
  { when: "2026 - Now", what: "Got back and started learning Pytorch in a structured manner", where: "Goal is to become proficient in deep learning" },
  { when: "2025", what: "Shifted my interest to C and Rust", where: "Self-taught C and Rust and built multiple graphics related projects" },
  { when: "2024", what: "Started showing interest in artificial intelligence", where: "Went on to learn about LLMs, finetuning etc." },
  { when: "2023", what: "Participated and won multiple hackathons and interschool competitions", where: "Took a boost!" },
  { when: "2021", what: "Started my python journey", where: "Developed my own assistant in python." },
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
            <div className="relative aspect-4/5 overflow-hidden border-2 border-foreground bg-warm">
              <img
                src={portrait}
                alt="Prasoon Rai — portrait"
                className="absolute inset-0 h-full w-full object-cover grayscale-20 contrast-105"
              />
              {/* warm gray frame tag */}
              <div className="absolute left-2 top-2 flex items-center gap-1 bg-warm px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-background">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> rec · 002
              </div>
              <div className="absolute bottom-2 right-2 bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground">
                ƒ/2.8 · 35mm
              </div>
              {/* corner brackets */}
              {["top-2 right-2 hidden", "bottom-2 left-2"].map((p) => (
                <div key={p} className={`absolute h-3 w-3 border-2 border-background ${p}`} />
              ))}
            </div>
            <div className="mt-4 flex items-baseline justify-between text-sm">
              <span className="font-(--font-display) uppercase">Prasoon Rai</span>
              <span className="text-muted-foreground">Developer • India</span>
            </div>
            <p className="mt-2 font-(--font-serif) text-sm italic text-warm">
              "Yes, the hair has a mind of its own. We've made peace."
            </p>
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
            <p className="mt-6 font-(--font-serif) text-2xl leading-snug md:text-3xl">
              A teen developer with keen interest in domain of artificial intelligence and an even stronger
              opinion that software should feel like <em>something</em>. I obsess over
              interfaces, ship side projects on weekends, and have lost actual hours
              of my life to picking the right feel.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-t-2 border-foreground pt-4">
                <h4 className="mb-2 text-xs uppercase tracking-widest">Contact</h4>
                <a
                  href="mailto:prasoonrai@icloud.com"
                  data-cursor="hover"
                  className="block font-(--font-serif) text-xl underline-offset-4 hover:underline md:text-2xl"
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
                    className="font-(--font-serif) text-lg hover:underline"
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
                    className="font-(--font-serif) text-lg hover:underline"
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
                  <div className="font-(--font-serif) italic">{e.what}</div>
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
