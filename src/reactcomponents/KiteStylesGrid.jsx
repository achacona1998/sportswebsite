import React, { useState, useEffect, useRef } from "react";
import HoverKiteCard from "./HoverKiteCard";
import { motion, AnimatePresence } from "framer-motion";

const KiteStylesGrid = ({ styles }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef(null);

  // Comprobar si estamos en móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Comprueba al cargar y al cambiar el tamaño de la ventana
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Efecto para scroll al botón cuando se colapsa
  useEffect(() => {
    if (!isExpanded && buttonRef.current) {
      setTimeout(() => {
        buttonRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100); // Pequeño retraso para asegurar que se ejecuta después de la animación
    }
  }, [isExpanded]);

  // Filtrar los estilos para mostrar en función del estado
  const visibleStyles = isMobile && !isExpanded ? styles.slice(0, 3) : styles;

  // Función para manejar el cambio de estado expandido/colapsado
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        layout>
        <AnimatePresence>
          {visibleStyles.map((style, index) => (
            <motion.div
              key={style.id || index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              layout>
              <HoverKiteCard
                image={style.image}
                name={style.name}
                description={style.description}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Botón para mostrar/ocultar más elementos (solo en móvil) */}
      {isMobile && styles.length > 3 && (
        <div ref={buttonRef} className="flex justify-center my-8">
          <motion.button
            onClick={toggleExpanded}
            className="flex gap-2 items-center px-6 py-3 font-medium text-white bg-gradient-to-r from-blue-500 to-teal-400 rounded-full shadow-md transition-colors duration-300 hover:from-blue-600 hover:to-teal-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout>
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={isExpanded ? "less" : "more"}>
              {isExpanded ? "Mostrar menos" : "Ver más estilos"}
            </motion.span>

            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}>
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </motion.svg>
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default KiteStylesGrid;
