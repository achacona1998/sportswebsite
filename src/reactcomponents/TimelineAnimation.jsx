import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

const timelineEvents = [
  {
    year: "1960s - 1970s",
    description:
      "El windsurf se populariza como deporte acuático, estableciendo las bases para futuros deportes de viento.",
    position: "left",
  },
  {
    year: "1980s",
    description:
      "El wakeboarding emerge como evolución del esquí acuático, introduciendo trucos y maniobras inspiradas en el snowboard.",
    position: "right",
  },
  {
    year: "1990s",
    description:
      "Nacimiento del kiteboarding moderno, combinando elementos del windsurf, wakeboard y parapente.",
    position: "left",
  },
  {
    year: "2010s",
    description:
      "El hydrofoil revoluciona el kiteboarding, permitiendo navegar con vientos más ligeros y alcanzar mayores velocidades.",
    position: "right",
  },
  {
    year: "2020s",
    description:
      "Auge del wing foiling como nueva evolución, simplificando el concepto del kiteboarding con un ala sin líneas.",
    position: "left",
  },
];

const TimelineAnimation = () => {
  const containerRef = useRef(null);

  return (
    <div className="p-4 text-black rounded-lg sm:p-8">
      <AnimatedSectionHeading
        client:visible
        title="La evolución de los deportes acuáticos"
        description=""
      />

      <div className="relative mt-12" ref={containerRef}>
        {/* Línea de tiempo animada - ahora visible en todos los tamaños */}
        <TimelineLine />

        <div className="space-y-16 sm:space-y-12">
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={index}
              year={event.year}
              description={event.description}
              position={event.position}
              number={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente para la línea vertical
const TimelineLine = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="absolute top-0 bottom-0 left-1/2 w-1 transform -translate-x-1/2 bg-black/20"
      initial={{ scaleY: 0, opacity: 0 }}
      animate={isInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{ transformOrigin: "top" }}
    />
  );
};

// Componente para cada evento de la línea de tiempo
const TimelineEvent = ({ year, description, position, number }) => {
  const eventRef = useRef(null);
  const isInView = useInView(eventRef, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={eventRef}
      className="flex relative flex-col items-center sm:flex-row"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}>
      {/* Contenido izquierdo en desktop o espacio */}
      {position === "left" ? (
        <motion.div
          className="hidden sm:block sm:text-right sm:w-1/2 sm:pr-12"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6, delay: 0.6 }}>
          <h4 className="text-xl font-bold">{year}</h4>
          <p className="mt-2">{description}</p>
        </motion.div>
      ) : (
        <div className="hidden sm:block sm:w-1/2 sm:pr-12"></div>
      )}

      {/* Círculo numerado */}
      <motion.div
        className="flex z-10 justify-center items-center w-10 h-10 bg-emerald-500 rounded-full transform sm:absolute sm:left-1/2 sm:-translate-x-1/2"
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.4, delay: 0.3 }}>
        <span className="font-bold text-black">{number}</span>
      </motion.div>

      {/* Contenido derecho en desktop o espacio */}
      {position === "right" ? (
        <motion.div
          className="hidden sm:block sm:text-left sm:w-1/2 sm:pl-12"
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6, delay: 0.6 }}>
          <h4 className="text-xl font-bold">{year}</h4>
          <p className="mt-2">{description}</p>
        </motion.div>
      ) : (
        <div className="hidden sm:block sm:w-1/2 sm:pl-12"></div>
      )}

      {/* Contenido para móvil - siempre debajo del número */}
      <motion.div
        className="block px-4 mt-4 w-full text-center sm:hidden"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, delay: 0.6 }}>
        <h4 className="text-xl font-bold backdrop-blur-lg">{year}</h4>
        <p className="mt-2 backdrop-blur-sm">{description}</p>
      </motion.div>
    </motion.div>
  );
};

export default TimelineAnimation;
