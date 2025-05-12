import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const RegionCard = ({ region, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Calcular el retraso basado en el índice
  const delay = index * 0.2;

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-lg p-6 shadow-md"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: "easeOut",
      }}
      whileHover={{ y: -5 }}>
      <motion.h4
        className="mb-4 text-lg font-bold text-blue-600 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}>
        <span>{region.region}</span>
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.h4>

      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            className="space-y-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}>
            {region.spots.map((spot, spotIndex) => (
              <motion.li
                key={spotIndex}
                className="flex justify-between items-center pb-2 border-b border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: spotIndex * 0.1 + 0.2,
                }}>
                <span className="font-medium text-gray-800">{spot.name}</span>
                <span className="px-2 py-1 text-sm text-gray-500 bg-gray-100 rounded">
                  {spot.level}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TravelTip = ({ children, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.li
      ref={ref}
      className="flex items-start"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      whileHover={{
        x: 5,
        transition: { duration: 0.2 }, // Reducir el delay en el hover
      }}>
      <svg
        className="flex-shrink-0 mt-0.5 mr-2 w-5 h-5 text-sky-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>{children}</span>
    </motion.li>
  );
};

const AnimatedSpotRegions = ({ otherSpots, travelTips }) => {
  const tipsRef = useRef(null);
  const tipsInView = useInView(tipsRef, { once: true, amount: 0.2 });

  return (
    <div className="space-y-12">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <motion.h3
          className="mb-6 text-2xl font-bold text-center text-blue-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}>
          Otros spots destacados por región
        </motion.h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {otherSpots.map((region, index) => (
            <RegionCard key={index} region={region} index={index} />
          ))}
        </div>
      </div>

      <motion.div
        ref={tipsRef}
        className="p-6 text-white bg-blue-900 rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={tipsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}>
        <motion.h3
          className="mb-4 text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={tipsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}>
          Consejos para viajar a spots de kiteboarding
        </motion.h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ul className="space-y-2">
            {travelTips
              .slice(0, Math.ceil(travelTips.length / 2))
              .map((tip, index) => (
                <TravelTip key={index} index={index}>
                  {tip}
                </TravelTip>
              ))}
          </ul>

          <ul className="space-y-2">
            {travelTips
              .slice(Math.ceil(travelTips.length / 2))
              .map((tip, index) => (
                <TravelTip
                  key={index}
                  index={index + Math.ceil(travelTips.length / 2)}>
                  {tip}
                </TravelTip>
              ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedSpotRegions;
