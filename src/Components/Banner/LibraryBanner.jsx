import {
  FaBookOpen,
  FaSearch,
  FaChartLine,
  FaPlusCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";

const LibraryBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-900 to-purple-800 overflow-hidden rounded-b-xl shadow-2xl">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full mix-blend-overlay"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-yellow-300 rounded-full mix-blend-overlay"></div>
      </div>

      {/* Floating book elements */}
      <div className="absolute top-10 right-10 opacity-10">
        <FaBookOpen className="text-white text-9xl" />
      </div>

      <div className="relative z-10 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Text content */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              >
                Discover & Manage Your{" "}
                <span className="text-yellow-300">Literary Treasures</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-indigo-100 mb-8"
              >
                Streamline your library operations with our comprehensive
                management system. Track, organize, and analyze your collection
                with ease.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold rounded-lg shadow-lg transition-all"
                >
                  <FaPlusCircle className="text-xl" />
                  Add New Book
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white font-bold rounded-lg transition-all"
                >
                  <FaChartLine className="text-xl" />
                  View Analytics
                </motion.button>
              </div>
            </div>

            {/* Stats cards */}
            <div className="md:w-2/5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                  <div className="text-yellow-300 text-3xl font-bold mb-2">
                    1,248
                  </div>
                  <div className="text-indigo-100">Total Books</div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                  <div className="text-green-300 text-3xl font-bold mb-2">
                    342
                  </div>
                  <div className="text-indigo-100">Available Now</div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                  <div className="text-blue-300 text-3xl font-bold mb-2">
                    56
                  </div>
                  <div className="text-indigo-100">New Arrivals</div>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                  <div className="text-pink-300 text-3xl font-bold mb-2">
                    89%
                  </div>
                  <div className="text-indigo-100">Patron Satisfaction</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white opacity-10"></div>
    </div>
  );
};

export default LibraryBanner;
