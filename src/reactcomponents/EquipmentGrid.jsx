import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EquipmentCard = ({ image, name, description, index }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // La información se muestra si la tarjeta está seleccionada o en hover
  const showInfo = isSelected || isHovered;

  return (
    <motion.div
      className="overflow-hidden relative bg-gray-50 rounded-lg shadow transition-shadow duration-300 cursor-pointer hover:shadow-lg h-[400px]"
      onClick={() => setIsSelected(!isSelected)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut" 
      }}
      layout
    >
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

const EquipmentGrid = ({ equipmentItems }) => {
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
      }, 100);
    }
  }, [isExpanded]);

  // Filtrar los elementos para mostrar en función del estado
  const visibleItems =
    isMobile && !isExpanded ? equipmentItems.slice(0, 3) : equipmentItems;

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
          {visibleItems.map((item, index) => (
            <motion.div key={item.id || index} layout>
              <EquipmentCard
                image={item.image}
                name={item.name}
                description={item.description}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Botón para mostrar/ocultar más elementos (solo en móvil) */}
      {isMobile && equipmentItems.length > 3 && (
        <div ref={buttonRef} className="flex justify-center my-8">
          <motion.button
            onClick={toggleExpanded}
            className="px-6 py-3 text-white font-medium rounded-full transition-colors duration-300 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 shadow-md flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout>
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={isExpanded ? "less" : "more"}>
              {isExpanded ? "Mostrar menos" : "Ver más equipo"}
            </motion.span>

            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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

export default EquipmentGrid;
