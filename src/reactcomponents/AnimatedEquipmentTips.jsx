import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedTipItem = ({ tip, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.li
      ref={ref}
      className="text-gray-700"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        x: 5,
        transition: { duration: 0.2 },
      }}>
      {tip}
    </motion.li>
  );
};

const AnimatedEquipmentTips = ({ title, tips }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={sectionRef}
      className="p-6 mt-12 bg-gray-50 rounded-lg shadow-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      whileHover={{
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        transition: { duration: 0.3 },
      }}>
      <motion.h3
        className="mb-4 text-xl font-bold text-blue-900"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}>
        {title}
      </motion.h3>

      <motion.ul
        className="pl-6 space-y-2 list-disc text-gray-700"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}>
        {tips.map((tip, index) => (
          <AnimatedTipItem key={index} tip={tip} index={index} />
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default AnimatedEquipmentTips;
