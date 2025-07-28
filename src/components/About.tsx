import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
// Removed all previous visual component imports

// --- New EvolvingThoughtscape Component ---
const EvolvingThoughtscape = () => {
  const numPaths = 12; // Number of radiating paths
  const numSparks = 20; // Number of small, fleeting sparks

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Central Pulsating Core / Origin of Thought */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-neon-dark opacity-30" // Darker neon base
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1.1, 0.8],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: 'blur(15px)', boxShadow: '0 0 50px 15px var(--color-neon)' }} // Strong blur for glow
      />

      {/* Radiating & Intersecting Thought Paths */}
      {Array.from({ length: numPaths }).map((_, i) => (
        <motion.div
          key={`path-${i}`}
          className={`absolute rounded-full border border-${i % 2 === 0 ? 'electric' : 'neon'}`} // Alternating colors
          style={{
            width: '100px', // Base width
            height: '100px', // Base height
            transform: `rotate(${i * (360 / numPaths)}deg)`, // Rotate each path
            transformOrigin: '50% 50%', // Rotate around its own center
            opacity: 0.1, // Subtle base opacity
          }}
          initial={{ scale: 0 }}
          animate={{
            scale: [0, 1, 0.5, 1.2, 0], // Expand, contract, expand again, then shrink to disappear
            opacity: [0, 0.6, 0.4, 0.8, 0], // Fade in/out
          }}
          transition={{
            duration: Math.random() * 6 + 4, // Longer random durations for organic feel
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3, // Staggered entry
          }}
        />
      ))}

      {/* Ephemeral Sparks / Insights */}
      {Array.from({ length: numSparks }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className={`absolute w-1.5 h-1.5 rounded-full ${Math.random() > 0.5 ? 'bg-white' : 'bg-electric-glow'}`}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0], // Random movement
            y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
            opacity: [0, 1, 0], // Appear and fade
            scale: [0.5, 1.5, 0.5], // Pop in and out
          }}
          transition={{
            duration: Math.random() * 2 + 1, // Quick, fleeting animations
            repeat: Infinity,
            delay: Math.random() * 5 + i * 0.2, // Random and staggered delay
            ease: "easeOut",
          }}
          style={{ boxShadow: '0 0 8px var(--color-white)', filter: 'blur(1px)' }} // Soft glow for sparks
        />
      ))}

      {/* Subtle background noise/texture for digital feel */}
      <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none"></div>
    </div>
  );
};
// --- End of EvolvingThoughtscape Component ---


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

          {/* Right side - Visual element (Evolving Thoughtscape) */}
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

            {/* Integration of the new EvolvingThoughtscape component */}
            <div className="absolute inset-0 flex items-center justify-center">
              <EvolvingThoughtscape />
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
