import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedSectionHeading = ({ title, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="text-center mb-18">
      <motion.h3
        className="section-subtitle"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}>
        {title}
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.7 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: "easeOut",
        }}
        className="mx-auto my-4 w-24 h-1 bg-blue-600 rounded"
      />

      <motion.p
        className="mx-auto max-w-3xl text-sm center md:text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: 0.4,
          ease: "easeOut",
        }}>
        {description}
      </motion.p>
    </div>
  );
};

export default AnimatedSectionHeading;
