import React, { useState } from "react";
import { motion } from "framer-motion";

const VideoCard = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getCategoryText = (category) => {
    switch (category) {
      case "competition":
        return "Competición";
      case "tutorial":
        return "Tutorial";
      case "travel":
        return "Viajes";
      default:
        return category;
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <motion.div
      className="overflow-hidden bg-gray-50 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -5 }}>
      <div className="relative pb-[56.25%] h-0 bg-gray-200">
        {!isPlaying ? (
          <motion.div
            className="absolute inset-0 cursor-pointer group"
            onClick={() => setIsPlaying(true)}
            whileHover={{ scale: 1.02 }}>
            <img
              src={video.thumbnail}
              alt={video.title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
            <div className="flex absolute inset-0 justify-center items-center transition-all duration-300 bg-black/50 group-hover:bg-opacity-30">
              <motion.div
                className="flex justify-center items-center w-16 h-16 bg-blue-600 rounded-full"
                initial={{ opacity: 0.8, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1 }}>
                <svg
                  className="ml-1 w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getYoutubeEmbedUrl(video.embedUrl)}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <motion.div
        className="p-4"
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: true }}>
        <h4 className="font-bold text-blue-900">{video.title}</h4>
        <motion.span
          className="inline-block px-2 py-1 mt-2 text-xs text-white bg-blue-600 rounded"
          whileHover={{ scale: 1.05 }}>
          {getCategoryText(video.category)}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

const AnimatedVideos = ({ videos }) => {
  return (
    <div>
      <motion.h3
        className="mb-8 text-center section-subtitle"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.6 },
        }}
        viewport={{ once: true }}>
        Videos destacados
      </motion.h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default AnimatedVideos;
