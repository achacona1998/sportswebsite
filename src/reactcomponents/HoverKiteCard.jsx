import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const HoverKiteCard = ({ image, name, description, index = 0 }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // La información se muestra si la tarjeta está seleccionada o en hover
  const showInfo = isSelected || isHovered;

  // Calcular retraso basado en el índice para efecto escalonado
  const delay = index * 0.2;

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden relative bg-white rounded-lg shadow-md transition-shadow duration-300 cursor-pointer hover:shadow-lg h-[400px]"
      onClick={() => setIsSelected(!isSelected)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 50 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}>
      {/* Imagen de fondo */}
      <motion.div
        className="overflow-hidden h-full"
        animate={{
          height: showInfo ? "60%" : "100%",
        }}
        transition={{ duration: 0.5 }}>
        <motion.img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
          animate={{
            scale: showInfo ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>

      {/* Información animada */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="absolute right-0 bottom-0 left-0 p-6 bg-white bg-opacity-90 backdrop-blur-sm"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <h3 className="mb-2 text-xl font-bold text-blue-900">{name}</h3>
            <p className="text-gray-700">{description}</p>

            {/* Pequeño indicador para mostrar que esta seleccionada */}
            {isSelected && (
              <motion.div
                className="absolute top-0 right-0 mt-2 mr-2 w-2 h-2 bg-blue-600 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HoverKiteCard;
