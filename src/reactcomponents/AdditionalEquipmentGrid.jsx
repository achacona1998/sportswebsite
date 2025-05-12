import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const AdditionalEquipmentItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Calcular delay basado en el índice
  const delay = index * 0.1;

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden p-4 bg-gray-50 rounded-lg shadow"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}>
      <div className="flex items-center mb-3">
        <motion.div
          className="overflow-hidden flex-shrink-0 mr-4 w-16 h-16 rounded-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}>
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full"
          />
        </motion.div>
        <h4 className="font-bold text-blue-600">{item.name}</h4>
      </div>
      <p className="text-sm text-gray-600">{item.description}</p>
    </motion.div>
  );
};

const AdditionalEquipmentGrid = ({ additionalEquipment }) => {
  return (
    <>
      <h3 class="mt-16 mb-4 text-2xl font-bold text-center text-blue-900">
        Equipo Adicional Recomendado
      </h3>
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
        {additionalEquipment.map((item, index) => (
          <AdditionalEquipmentItem
            key={item.id || index}
            item={item}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default AdditionalEquipmentGrid;
