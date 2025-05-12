import React, { useEffect, useState } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const AnimatedHero = ({
  title,
  description,
  primaryButton,
  secondaryButton,
}) => {
  const [scrollIndicatorVisible, setScrollIndicatorVisible] = useState(true);
  const controls = useAnimation();

  // Iniciar la secuencia de animación cuando el componente se monta
  useEffect(() => {
    const animationSequence = async () => {
      await controls.start("visible");
    };
    animationSequence();

    // Ocultar el indicador de scroll cuando el usuario comienza a desplazarse
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicatorVisible(false);
      } else {
        setScrollIndicatorVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.7 + index * 0.2,
        ease: [0.175, 0.885, 0.32, 1.275], // Efecto de rebote elegante
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1.3,
        ease: "easeOut",
      },
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative z-20 section-container">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          initial="hidden"
          animate={controls}
          variants={titleVariants}>
          {title}
        </motion.h1>

        <motion.p
          className="mb-8 text-xl text-gray-100 md:text-2xl"
          initial="hidden"
          animate={controls}
          variants={descriptionVariants}>
          {description}
        </motion.p>

        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href={primaryButton.url}
            className="btn btn-primary"
            initial="hidden"
            animate={controls}
            whileHover="hover"
            whileTap="tap"
            custom={0}
            variants={buttonVariants}>
            {primaryButton.text}
          </motion.a>

          <motion.a
            href={secondaryButton.url}
            className="btn btn-secondary"
            initial="hidden"
            animate={controls}
            whileHover="hover"
            whileTap="tap"
            custom={1}
            variants={buttonVariants}>
            {secondaryButton.text}
          </motion.a>
        </div>
      </div>

      {/* Indicador de scroll animado */}
      <AnimatePresence>
        {scrollIndicatorVisible && (
          <motion.div
            className="flex absolute right-0 left-0 -bottom-8 z-20 justify-center md:bottom-0"
            initial="hidden"
            animate={["visible", "bounce"]}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
            variants={scrollIndicatorVariants}>
            <motion.a
              href="#styles"
              className="p-2 text-white bg-blue-600 bg-opacity-30 rounded-full transition-all duration-300 hover:bg-opacity-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <title>Down</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHero;
