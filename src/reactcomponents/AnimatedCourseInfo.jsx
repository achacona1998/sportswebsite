import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedTip = ({ tip, index }) => {
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
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        x: 5,
        transition: { duration: 0.2 },
      }}>
      <svg
        className="flex-shrink-0 mt-1 mr-2 w-5 h-5 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-gray-700">{tip}</span>
    </motion.li>
  );
};

const AnimatedSchoolRequirement = ({ requirement, index }) => {
  return (
    <motion.li
      className="text-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5 + index * 0.1,
      }}>
      • {requirement}
    </motion.li>
  );
};

const AnimatedCourseInfo = ({ tips, schoolRequirements }) => {
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  const isLeftCardInView = useInView(leftCardRef, { once: true, amount: 0.3 });
  const isRightCardInView = useInView(rightCardRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Card de consejos para principiantes */}
      <motion.div
        ref={leftCardRef}
        className="p-6 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, x: -50 }}
        animate={isLeftCardInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}>
        <motion.h3
          className="mb-4 text-xl font-bold text-blue-900"
          initial={{ opacity: 0 }}
          animate={isLeftCardInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}>
          Consejos para Principiantes
        </motion.h3>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <AnimatedTip key={index} tip={tip} index={index} />
          ))}
        </ul>
      </motion.div>

      {/* Card para buscar escuela certificada */}
      <motion.div
        ref={rightCardRef}
        className="p-6 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, x: 50 }}
        animate={isRightCardInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}>
        <motion.h3
          className="mb-4 text-xl font-bold text-blue-900"
          initial={{ opacity: 0 }}
          animate={isRightCardInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}>
          Encuentra una Escuela Certificada
        </motion.h3>

        <motion.p
          className="mb-4 text-gray-700"
          initial={{ opacity: 0 }}
          animate={isRightCardInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}>
          Es fundamental aprender con profesionales certificados. Las escuelas
          IKO garantizan métodos de enseñanza estandarizados y seguros.
        </motion.p>

        <motion.div
          className="p-4 mb-6 bg-gray-50 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isRightCardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <motion.h4
            className="mb-2 font-semibold text-blue-600"
            initial={{ opacity: 0 }}
            animate={isRightCardInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}>
            ¿Qué buscar en una escuela?
          </motion.h4>

          <ul className="space-y-2">
            {schoolRequirements.map((req, index) => (
              <AnimatedSchoolRequirement
                key={index}
                requirement={req}
                index={index}
              />
            ))}
          </ul>
        </motion.div>

        <motion.a
          href="https://www.ikointl.com/es/escuelas"
          target="_blank"
          className="flex justify-center items-center p-3 w-full font-medium text-white bg-blue-600 rounded-md transition-colors hover:bg-blue-700"
          initial={{ opacity: 0, y: 20 }}
          animate={isRightCardInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}>
          Buscar Escuelas IKO
          <svg
            className="ml-2 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </motion.a>
      </motion.div>
    </div>
  );
};

export default AnimatedCourseInfo;
