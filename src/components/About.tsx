import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AbstractDigitalStream = () => {
  const characters = ['{', '}', '<', '>', '/', '-', '_', '=', ';', '&', '$', '#', '0', '1'];

  const glitchVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: [0, 1, 0.5, 1, 0], // Flicker effect
      y: [20, 0, -5, 0, -20],     // Slight vertical movement
      x: [0, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, 0], // Slight horizontal jitter
      transition: {
        duration: Math.random() * 3 + 2, // Random duration for varied feel
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: Math.random() * 2 + i * 0.1, // Staggered and random initial delay
      },
    }),
  };

  const lineVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: (i) => ({
      scaleX: [0, 1, 0.5, 1, 0], // Grow, shrink, grow, disappear
      opacity: [0, 1, 0.7, 1, 0],
      transition: {
        duration: Math.random() * 4 + 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: Math.random() * 1.5 + i * 0.2,
      },
    }),
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background data lines / flickering grid */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`bg-line-${i}`}
          className="absolute h-px bg-electric-glow" // Use bg-electric-glow for a thin glowing line
          style={{
            width: `${Math.random() * 80 + 20}%`, // Random width for variety
            top: `${10 + i * 8}%`, // Position vertically
            left: `${Math.random() * 20}%`, // Slight horizontal offset
            boxShadow: '0 0 8px var(--color-electric)',
            opacity: 0.2,
          }}
          variants={lineVariants}
          initial="initial"
          animate="animate"
          custom={i}
        />
      ))}

      {/* Abstract Glitchy Code Fragments */}
      <div className="absolute inset-0 flex flex-wrap content-around justify-center text-center p-4">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.span
            key={`char-${i}`}
            className="font-jetbrains text-lg md:text-xl text-neon-glow leading-none m-1" // neon-glow for text
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            custom={i}
            style={{ textShadow: '0 0 10px var(--color-neon)' }} // Text glow
          >
            {characters[Math.floor(Math.random() * characters.length)]}
          </motion.span>
        ))}
      </div>

       {/* Central pulsating highlight for focus */}
       <motion.div
        className="absolute w-32 h-32 rounded-full bg-white opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: 'blur(30px)' }}
      />
    </div>
  );
};
// --- End of AbstractDigitalStream Component ---


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
                I'm <span className="text-white font-bold">Prasoon Rai</span>,
                a 17-year-old AI/DL programmer from <span className="text-neon font-bold">Noida, India </span>
                I started coding at 10 and quickly developed a passion for Artificial Intelligence and Deep Learning.
              </p>

              <p className="font-space text-lg md:text-xl leading-relaxed text-gray-300">
                I'm proficient in <span className="text-neon font-bold">TensorFlow, PyTorch, and Keras </span>using these frameworks to build practical AI solutions.
                I love turning complex ideas into working applications.
              </p>

              <p className="font-space text-lg md:text-xl leading-relaxed text-gray-300">
                My goal is to study abroad and become a <span className="text-white font-bold">Computer Science Engineer </span>
                I'm excited to innovate in the tech world and contribute to the future of AI.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {['TENSORFLOW', 'PYTORCH', 'PYTHON', 'LLAMA', 'GIT', 'KERAS'].map((skill, index) => (
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

          {/* Right side - Visual element (Animated Digital Stream) */}
          <motion.div
            className="relative w-full h-96"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* These outer frames and decorative elements are kept for the brutalist style */}
            <div className="absolute inset-0 border-4 border-white transform rotate-3">
              <div className="w-full h-full bg-gradient-to-br from-electric/20 to-neon/20"></div>
            </div>

            <div className="absolute inset-0 border-4 border-neon transform -rotate-3 translate-x-4 translate-y-4">
              <div className="w-full h-full bg-gradient-to-tl from-neon/10 to-electric/10"></div>
            </div>

            {/* Integration of the new AbstractDigitalStream component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AbstractDigitalStream />
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
