
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-20 bg-black text-white noise-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
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
              ABOUT
              <br />
              <span className="text-neon">ME</span>
            </motion.h2>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="font-space text-lg md:text-xl leading-relaxed text-gray-300">
                I'm <span className="text-white font-bold">Prasoon Rai</span>, a 17-year-old developer 
                from <span className="text-neon font-bold">Noida, India</span>. Currently navigating 
                through high school while diving deep into the world of technology and innovation.
              </p>

              <p className="font-space text-lg md:text-xl leading-relaxed text-gray-300">
                My journey in programming started with curiosity and has evolved into a passion for 
                creating solutions that matter. I believe in learning by building, and every project 
                is an opportunity to push boundaries and explore new possibilities.
              </p>

              <p className="font-space text-lg md:text-xl leading-relaxed text-gray-300">
                When I'm not coding, you'll find me exploring emerging technologies, contributing to 
                open-source projects, or sketching ideas for the next big thing. The future is being 
                built today, and I want to be part of that story.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['REACT', 'JAVASCRIPT', 'PYTHON', 'NODE.JS', 'GIT', 'FIGMA'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="border-2 border-electric text-electric px-4 py-2 font-jetbrains font-bold text-sm tracking-widest hover:bg-electric hover:text-black transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Visual element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative w-full h-96">
              {/* Main container */}
              <div className="absolute inset-0 border-4 border-white transform rotate-3">
                <div className="w-full h-full bg-gradient-to-br from-electric/20 to-neon/20"></div>
              </div>

              {/* Secondary container */}
              <div className="absolute inset-0 border-4 border-neon transform -rotate-3 translate-x-4 translate-y-4">
                <div className="w-full h-full bg-gradient-to-tl from-neon/10 to-electric/10"></div>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 transform -rotate-1">
                  <motion.div
                    className="brutalist-mono text-4xl md:text-5xl text-white"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    {"{ }"}
                  </motion.div>
                  <p className="font-space text-lg font-bold text-neon tracking-widest">
                    CODE IS POETRY
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-neon"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 border-4 border-electric"
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
