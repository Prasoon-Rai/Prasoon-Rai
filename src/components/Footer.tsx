import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <motion.footer
      className="bg-white border-t-4 border-black py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-jetbrains text-sm text-gray-600">© 2025 PRASOON RAI. ALL RIGHTS RESERVED.</p>
            <p className="font-jetbrains text-sm text-gray-600">MADE WITH <span className="text-neon">❤</span> IN NOIDA, INDIA</p>
          </div>
        </div>
        {/* These absolute positioned divs might need adjustment based on your layout */}
        <div className="absolute bottom-4 left-4 w-4 h-4 bg-electric transform rotate-45"></div>
        <div className="absolute bottom-4 right-4 w-4 h-4 bg-neon transform rotate-45"></div>
      </div>
    </motion.footer>
  );
};
