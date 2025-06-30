
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-white border-t-4 border-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          {/* Left side - Logo and tagline */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="brutalist-mono text-2xl font-bold text-black mb-2">
              PRASOON RAI
            </h3>
            <p className="font-space text-gray-600">
              Building tomorrow's solutions today
            </p>
          </motion.div>

          {/* Center - Navigation links */}
          <motion.div
            className="flex space-x-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {['ABOUT', 'PROJECTS', 'CONTACT'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-space font-bold text-sm tracking-widest text-gray-600 hover:text-black transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>

          {/* Right side - Social links */}
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.a
              href="https://github.com/Prasoon-Rai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border-2 border-black flex items-center justify-center font-jetbrains font-bold text-sm hover:bg-black hover:text-white transition-all duration-300"
              whileHover={{ rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              GH
            </motion.a>
            <motion.a
              href="https://www.instagram.com/prasoon_raii/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 border-2 border-black flex items-center justify-center font-jetbrains font-bold text-sm hover:bg-black hover:text-white transition-all duration-300"
              whileHover={{ rotate: -5, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              IG
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="mt-12 pt-8 border-t-2 border-gray-200 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-jetbrains text-sm text-gray-600">
              © 2024 PRASOON RAI. ALL RIGHTS RESERVED.
            </p>
            <p className="font-jetbrains text-sm text-gray-600">
              MADE WITH <span className="text-neon">❤</span> IN NOIDA, INDIA
            </p>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-electric transform rotate-45"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-neon transform rotate-45"></div>
      </div>
    </footer>
  );
};
