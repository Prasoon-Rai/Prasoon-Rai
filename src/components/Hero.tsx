import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-background px-6 pb-10 pt-8 md:px-12"
    >
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between text-xs uppercase tracking-widest md:text-sm">
        <span className="font-semibold">Prasoon Rai™</span>
        <span className="hidden md:inline">Portfolio / 2026</span>
        <span>Based in India ✈</span>
      </div>

      {/* Big stack */}
      <motion.div style={{ y, opacity }} className="relative z-10 -mx-2 mt-8">
        <h1 className="font-[var(--font-serif)] text-3xl italic leading-none md:text-5xl">
          Hey, Welcome to the{" "}
          <span className="italic">Wonderfully Weirdo World of</span>
        </h1>

        <div className="relative mt-2 flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="select-none text-[22vw] font-black uppercase leading-[0.82] tracking-tighter"
          >
            PRASOON
          </motion.h2>
        </div>

        <div className="relative -mt-[3vw] flex items-end justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="select-none text-[22vw] font-black uppercase leading-[0.82] tracking-tighter"
          >
            RAI<sup className="text-2xl md:text-4xl">™</sup>
          </motion.h2>
        </div>
      </motion.div>

      {/* Sub copy */}
      <div className="relative z-10 mt-10 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-12">
        <p className="font-[var(--font-serif)] text-xl leading-snug md:col-span-7 md:text-3xl">
          I'm a developer who loves building odd, opinionated, very-much-not-boring
          software. I collect ideas, ship them with friends, and occasionally make
          things on the internet that make people smile.
        </p>
        <div className="flex flex-col gap-2 text-sm uppercase tracking-widest md:col-span-5 md:items-end md:text-right">
          <a href="#projects" data-cursor="hover" className="underline-offset-4 hover:underline">↓ See the projects</a>
          <a href="#about" data-cursor="hover" className="underline-offset-4 hover:underline">↓ About me</a>
          <a href="#contact" data-cursor="hover" className="underline-offset-4 hover:underline">↓ Get in touch</a>
        </div>
      </div>
    </section>
  );
}
