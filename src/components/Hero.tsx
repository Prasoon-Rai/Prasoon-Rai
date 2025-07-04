import { motion } from 'framer-motion';
import { ThreeScene } from './ThreeScene';

export const Hero = () => {
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Prasoon_Rai_CV.pdf';
    link.click();
  };

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-white grid-texture">
      <ThreeScene />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main heading */}
            <div className="space-y-4">
              <motion.h1
                className="brutalist-heading text-6xl md:text-8xl lg:text-9xl text-black"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                PRASOON
                <br />
                <span className="text-electric">RAI</span>
              </motion.h1>
              
              <motion.div
                className="bg-black text-white px-8 py-4 inline-block transform -skew-x-6"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="brutalist-mono text-lg md:text-xl">
                  HIGH SCHOOL DEVELOPER | INNOVATOR | CREATOR
                </p>
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p
              className="font-space text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              17 years old from <span className="font-bold text-black">Noida, India</span>
              <br />
              Building the future, one line of code at a time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.a
                href="https://github.com/Prasoon-Rai"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-black text-neon px-8 py-4 font-space font-bold text-lg tracking-wider transform transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-200">VIEW GITHUB</span>
                <div className="absolute inset-0 bg-neon transform translate-x-2 translate-y-2 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:z-0 transition-all duration-200"></div>
              </motion.a>

              <motion.button
                onClick={downloadCV}
                className="group relative border-4 border-black bg-white text-black px-8 py-4 font-space font-bold text-lg tracking-wider transform transition-all duration-200 hover:bg-black hover:text-white"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                DOWNLOAD CV
              </motion.button>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <div className="flex flex-col items-center space-y-2 text-black">
                <p className="font-jetbrains text-sm tracking-widest">SCROLL</p>
                <motion.div
                  className="w-0.5 h-12 bg-black"
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-electric transform rotate-45 animate-pulse"></div>
      <div className="absolute bottom-40 right-20 w-6 h-6 border-4 border-neon transform rotate-45"></div>
      <div className="absolute top-1/2 left-5 w-8 h-0.5 bg-black"></div>
      <div className="absolute top-1/3 right-10 w-0.5 h-16 bg-black"></div>
    </section>
  );
};
