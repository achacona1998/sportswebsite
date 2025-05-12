import React from "react";
import { motion } from "framer-motion";

const BrandSelectionGuide = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="p-6 bg-white rounded-lg shadow-md"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h3 
        className="mb-4 text-xl font-bold text-blue-900"
        variants={itemVariants}
      >
        ¿En qué fijarse al elegir una marca?
      </motion.h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <motion.h4 
            className="mb-2 font-semibold text-blue-600"
            variants={itemVariants}
          >
            Factores principales
          </motion.h4>
          <motion.ul className="space-y-2 text-gray-700" variants={containerVariants}>
            {[
              "Calidad de los materiales y durabilidad",
              "Servicio postventa y garantía",
              "Diseño adaptado a tu estilo de navegación",
              "Disponibilidad de repuestos"
            ].map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                variants={itemVariants}
              >
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div>
          <motion.h4 
            className="mb-2 font-semibold text-blue-600"
            variants={itemVariants}
          >
            Consejos de compra
          </motion.h4>
          <motion.ul className="space-y-2 text-gray-700" variants={containerVariants}>
            {[
              "Probar el equipamiento antes de comprarlo",
              "Consultar opiniones de otros riders",
              "Considerar la compatibilidad con tu equipo actual",
              "Comprar en tiendas especializadas con asesoramiento"
            ].map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                variants={itemVariants}
              >
                <svg
                  className="flex-shrink-0 mr-2 w-5 h-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.div>
  );
};

export default BrandSelectionGuide;