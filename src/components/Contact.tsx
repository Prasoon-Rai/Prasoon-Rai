
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h2
              className="brutalist-heading text-5xl md:text-6xl text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              LET'S
              <br />
              <span className="text-neon">CONNECT</span>
            </motion.h2>

            <motion.p
              className="font-space text-xl leading-relaxed text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to collaborate on something amazing? Let's build the future together.
              <br />
              <br />
              Drop me a message and let's turn ideas into reality.
            </motion.p>

            {/* Social links */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="https://github.com/Prasoon-Rai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 text-xl hover:text-electric transition-colors duration-300"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 border-2 border-white group-hover:border-electric flex items-center justify-center font-jetbrains font-bold">
                  GH
                </div>
                <span className="font-space font-bold tracking-wider">GITHUB</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/prasoon_raii/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center space-x-4 text-xl hover:text-neon transition-colors duration-300"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 border-2 border-white group-hover:border-neon flex items-center justify-center font-jetbrains font-bold">
                  IG
                </div>
                <span className="font-space font-bold tracking-wider">INSTAGRAM</span>
              </motion.a>

              <motion.div
                className="group flex items-center space-x-4 text-xl"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 border-2 border-white flex items-center justify-center font-jetbrains font-bold">
                  @
                </div>
                <span className="font-space font-bold tracking-wider">PRASOON.RAI@EMAIL.COM</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white text-black p-8 border-4 border-white relative">
              <form className="space-y-6">
                <div>
                  <label className="block font-jetbrains font-bold text-sm tracking-widest mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-black p-4 font-space text-lg focus:border-electric outline-none transition-colors duration-300"
                    placeholder="YOUR NAME"
                  />
                </div>

                <div>
                  <label className="block font-jetbrains font-bold text-sm tracking-widest mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    className="w-full border-2 border-black p-4 font-space text-lg focus:border-electric outline-none transition-colors duration-300"
                    placeholder="YOUR@EMAIL.COM"
                  />
                </div>

                <div>
                  <label className="block font-jetbrains font-bold text-sm tracking-widest mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    className="w-full border-2 border-black p-4 font-space text-lg focus:border-electric outline-none transition-colors duration-300 resize-none"
                    placeholder="TELL ME ABOUT YOUR PROJECT..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-black text-white py-4 font-space font-bold text-lg tracking-widest hover:bg-electric hover:text-black transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  SEND MESSAGE
                </motion.button>
              </form>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-neon"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-electric"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
