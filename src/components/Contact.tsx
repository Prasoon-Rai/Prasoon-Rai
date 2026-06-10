import { motion } from "framer-motion";

export function Contact() {
  return (
    <section id="contact" className="relative bg-foreground px-6 py-24 text-background md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <span className="text-xs uppercase tracking-widest opacity-60">(03) Say hi</span>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-4 font-[var(--font-serif)] text-5xl italic leading-[0.95] md:text-8xl"
        >
          Got an idea?
          <br />
          Let's <span className="not-italic text-white dark:text-primary">build</span> it.
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
          <a
            href="mailto:prasoonrai@icloud.com"
            data-cursor="hover"
            className="group border-2 border-background p-8 transition-colors hover:bg-primary hover:text-foreground"
          >
            <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">Email</span>
            <div className="mt-3 font-[var(--font-display)] text-2xl uppercase md:text-4xl">
              prasoonrai@icloud.com
            </div>
          </a>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://github.com/Prasoon-Rai"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="border-2 border-background p-6 hover:bg-primary hover:text-foreground"
            >
              <span className="text-xs uppercase tracking-widest opacity-60">GitHub</span>
              <div className="mt-2 font-[var(--font-display)] text-xl uppercase">@Prasoon-Rai</div>
            </a>
            <a
              href="https://instagram.com/prasoon_raii"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="border-2 border-background p-6 hover:bg-primary hover:text-foreground"
            >
              <span className="text-xs uppercase tracking-widest opacity-60">Instagram</span>
              <div className="mt-2 font-[var(--font-display)] text-xl uppercase">@prasoon_raii</div>
            </a>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap items-end justify-between gap-4 border-t-2 border-background pt-6 text-xs uppercase tracking-widest opacity-70">
          <span>© Prasoon Rai · 2026</span>
          
        </div>
      </div>
    </section>
  );
}
