import React from "react";
import { motion } from "framer-motion";

const AnimatedImage = ({ image, index, isLarge }) => {
  return (
    <motion.div
      className={`${isLarge ? "col-span-2 row-span-2" : ""} ${
        index === 6 ? "col-span-2 row-span-1 h-64" : ""
      } overflow-hidden rounded-lg shadow-md relative group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.02 }}>
      <motion.div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300 z-10" />
      <motion.img
        src={image.src}
        alt={image.alt}
        className="object-cover w-full h-full"
        initial={{ scale: 1.2 }}
        whileInView={{
          scale: 1,
          transition: {
            duration: 1.2,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true }}
        whileHover={{
          scale: 1.1,
          transition: {
            duration: 0.8,
            ease: "easeOut",
          },
        }}
      />
    </motion.div>
  );
};

const AnimatedGallery = ({ images }) => {
  return (
    <div className="mb-16">
      <motion.h3
        className="mb-8 text-center section-subtitle"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true }}>
        Fotos destacadas
      </motion.h3>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((image, index) => (
          <AnimatedImage
            key={index}
            image={image}
            index={index}
            isLarge={index === 0 || index === 3}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedGallery;
