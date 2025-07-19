
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
        {/* Bottom section */}
        <motion.div
          className="mt-12 pt-8 border-t-2 border-gray-200 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
<footer class="bg-white border-t-4 border-black py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" bis_skin_checked="1">
    <div class="mt-12 pt-8 border-t-2 border-gray-200 text-center" style="opacity: 1;" bis_skin_checked="1">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" bis_skin_checked="1">
        <p class="font-jetbrains text-sm text-gray-600">© 2024 PRASOON RAI. ALL RIGHTS RESERVED.</p>
        <p class="font-jetbrains text-sm text-gray-600">MADE WITH <span class="text-neon">❤</span> IN NOIDA, INDIA</p>
      </div>
    </div>
    <div class="absolute bottom-4 left-4 w-4 h-4 bg-electric transform rotate-45" bis_skin_checked="1">
    </div>
    <div class="absolute bottom-4 right-4 w-4 h-4 bg-neon transform rotate-45" bis_skin_checked="1"></div>
  </div>
</footer>
  );
};
