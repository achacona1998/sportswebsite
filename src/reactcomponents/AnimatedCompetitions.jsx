import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const OlympicInfoCard = ({ olympicInfo, imageSrc }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="p-8 mb-12 rounded-lg bg-oceanBlue"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}>
      <div className="flex flex-col items-center md:flex-row">
        <motion.div
          className="mb-6 md:w-1/3 md:mb-0 md:pr-8"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <motion.img
            src={imageSrc}
            alt="Kiteboarding olímpico"
            className="rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <motion.div
          className="md:w-2/3"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <motion.h3
            className="mb-4 text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}>
            {olympicInfo.title}
          </motion.h3>
          <motion.p
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}>
            {olympicInfo.description}
          </motion.p>

          <motion.h4
            className="mb-2 text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}>
            Detalles de la competición:
          </motion.h4>
          <ul className="space-y-1">
            {olympicInfo.details.map((detail, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.9 + index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  x: 5,
                  transition: { duration: 0.2 },
                }}>
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-sky-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{detail}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CategoryCard = ({ title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Calcular retraso basado en el índice
  const delay = 0.2 + index * 0.15;

  return (
    <motion.div
      ref={ref}
      className="p-4 bg-gray-50 rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}>
      <motion.h4
        className="mb-2 font-semibold text-oceanBlue"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.1 }}>
        {title}
      </motion.h4>
      <motion.p
        className="text-sm text-gray-700"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: delay + 0.2 }}>
        {description}
      </motion.p>
    </motion.div>
  );
};

const AnimatedCompetitions = ({ olympicInfo, categories }) => {
  const categoriesSectionRef = useRef(null);
  const categoriesSectionInView = useInView(categoriesSectionRef, {
    once: true,
    amount: 0.1,
  });

  return (
    <div>
      <OlympicInfoCard
        olympicInfo={olympicInfo}
        imageSrc="/Imagenes/FormulaK.avif"
      />

      <motion.div
        ref={categoriesSectionRef}
        className="p-6 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 40 }}
        animate={categoriesSectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}>
        <motion.h3
          className="mb-4 text-xl font-bold text-deep-sea"
          initial={{ opacity: 0 }}
          animate={categoriesSectionInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}>
          Categorías competitivas principales
        </motion.h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedCompetitions;
