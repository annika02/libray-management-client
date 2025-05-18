import { useState } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaRegStar,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ReadingSpotlight = () => {
  const featuredBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      excerpt:
        "Between life and death there is a library, and within that library, the shelves go on forever...",
      rating: 4.5,
      cover:
        "https://m.media-amazon.com/images/I/81YzHKeWq7L._AC_UF1000,1000_QL80_.jpg",
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      excerpt:
        "I'm stranded on a spaceship with no memory of how I got here. Now I have to save the world...",
      rating: 4.8,
      cover:
        "https://i.ibb.co/S4q0cv1J/71-S-z-KJp-Vv-S-AC-UF1000-1000-QL80.jpg",
      color: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      id: 3,
      title: "Educated",
      author: "Tara Westover",
      excerpt:
        "My family lived so far off the grid that there was no one to ensure we received an education...",
      rating: 4.7,
      cover: "https://i.ibb.co/fYKp0r2n/Educated.jpg",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
  ];

  const [currentBook, setCurrentBook] = useState(0);

  const nextBook = () => {
    setCurrentBook((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevBook = () => {
    setCurrentBook(
      (prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length
    );
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-2xl">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 ${featuredBooks[currentBook].color} opacity-50`}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full mix-blend-overlay"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 bg-yellow-300 rounded-full mix-blend-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* Book Cover */}
          <motion.div
            key={featuredBooks[currentBook].id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-48 h-64 md:w-56 md:h-80 rounded-lg shadow-xl overflow-hidden mb-6 md:mb-0 md:mr-10"
          >
            <img
              src={featuredBooks[currentBook].cover}
              alt={featuredBooks[currentBook].title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Book Details */}
          <div className="flex-1 text-white">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) =>
                i < Math.floor(featuredBooks[currentBook].rating) ? (
                  <FaStar key={i} className="text-yellow-300 mr-1" />
                ) : (
                  <FaRegStar key={i} className="text-yellow-300 mr-1" />
                )
              )}
              <span className="ml-2 text-white">
                {featuredBooks[currentBook].rating.toFixed(1)}
              </span>
            </div>

            <motion.h2
              key={`title-${featuredBooks[currentBook].id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              {featuredBooks[currentBook].title}
            </motion.h2>

            <motion.p
              key={`author-${featuredBooks[currentBook].id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl mb-6 text-white"
            >
              by {featuredBooks[currentBook].author}
            </motion.p>

            <motion.div
              key={`excerpt-${featuredBooks[currentBook].id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative mb-8"
            >
              <FaQuoteLeft className="absolute -top-2 -left-2 text-white opacity-20 text-4xl" />
              <p className="text-lg italic pl-6">
                "{featuredBooks[currentBook].excerpt}"
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center"
            >
              <button className="px-6 py-3 bg-white hover:bg-gray-100 text-indigo-900 font-bold rounded-lg shadow-md transition-all flex items-center mr-4">
                Borrow Now <FaArrowRight className="ml-2" />
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-indigo-900 text-white font-bold rounded-lg transition-all">
                View Details
              </button>
            </motion.div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {featuredBooks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBook(index)}
              className={`w-3 h-3 rounded-full ${
                currentBook === index ? "bg-white" : "bg-white bg-opacity-30"
              }`}
              aria-label={`Go to book ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevBook}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-indigo-900 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all z-20"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextBook}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 text-indigo-900 p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all z-20"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ReadingSpotlight;
