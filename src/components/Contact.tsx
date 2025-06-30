
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 gap-4 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-white"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="brutalist-heading text-5xl md:text-6xl text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              LET'S
              <br />
              <span className="text-neon">CONNECT</span>
            </motion.h2>

            <motion.p
              className="font-space text-xl leading-relaxed text-gray-300 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to collaborate on something amazing? Let's build the future together.
            </motion.p>
          </motion.div>

          {/* Contact links */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="https://github.com/Prasoon-Rai"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-8 border-2 border-white hover:border-electric hover:bg-electric hover:text-black transition-all duration-300"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="w-16 h-16 border-2 border-white group-hover:border-black flex items-center justify-center font-jetbrains font-bold text-2xl">
                GH
              </div>
              <span className="font-space font-bold tracking-wider text-lg">GITHUB</span>
            </motion.a>

            <motion.a
              href="https://www.instagram.com/prasoon_raii/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center space-y-4 p-8 border-2 border-white hover:border-neon hover:bg-neon hover:text-black transition-all duration-300"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="w-16 h-16 border-2 border-white group-hover:border-black flex items-center justify-center font-jetbrains font-bold text-2xl">
                IG
              </div>
              <span className="font-space font-bold tracking-wider text-lg">INSTAGRAM</span>
            </motion.a>

            <motion.a
              href="mailto:prasoonrai@icloud.com"
              className="group flex flex-col items-center space-y-4 p-8 border-2 border-white hover:border-white hover:bg-white hover:text-black transition-all duration-300"
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <div className="w-16 h-16 border-2 border-white group-hover:border-black flex items-center justify-center font-jetbrains font-bold text-2xl">
                @
              </div>
              <span className="font-space font-bold tracking-wider text-lg">EMAIL</span>
              <span className="font-jetbrains text-sm opacity-75 group-hover:opacity-100">prasoonrai@icloud.com</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
