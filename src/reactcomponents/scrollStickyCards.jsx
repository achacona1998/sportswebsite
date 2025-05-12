import { useScroll, motion, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { relatedSports, headingInfoRelatedSports } from "../constants/Const";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

export const StickyCards = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Usamos el contenedor de tarjetas como target para el efecto
  const { scrollYProgress } = useScroll({
    target: cardsContainerRef,
    offset: ["start start", "end start"],
  });

  return (
    <>
      <div ref={sectionRef} className="relative">
        {/* Cabecera siempre visible con fondo que coincide con la sección */}
        <div className="sticky top-0 z-10 pt-24 pb-0.5 bg-emerald-100">
          <AnimatedSectionHeading
            client:visible
            title={headingInfoRelatedSports.title}
            description={headingInfoRelatedSports.description}
          />
        </div>

        {/* Contenedor de tarjetas con efecto scroll */}
        <div ref={cardsContainerRef} className="relative">
          {relatedSports.map((c, idx) => (
            <Card
              key={c.id}
              card={c}
              scrollYProgress={scrollYProgress}
              position={idx + 1}
              isLast={idx === relatedSports.length - 1}
            />
          ))}
        </div>
      </div>
      {/* Espacio reducido al final para permitir la correcta visualización de la última tarjeta */}
      <div className="h-[300px] bg-emerald-100" />
    </>
  );
};

const Card = ({ position, card, scrollYProgress, isLast }) => {
  const scaleFromPct = (position - 1) / relatedSports.length;
  const y = useTransform(scrollYProgress, [scaleFromPct, 1], [0, -CARD_HEIGHT]);

  const isOddCard = position % 2;

  return (
    <motion.div
      style={{
        height: CARD_HEIGHT,
        y: isLast ? undefined : y, // La última tarjeta no se mueve para evitar espacios
        background: isOddCard ? "black" : "white",
        color: isOddCard ? "white" : "black",
      }}
      className={`flex sticky ${
        isLast ? "relative" : "top-40"
      } flex-row items-center px-8 w-full origin-top`}>
      {/* Contenedor de imagen - lado izquierdo */}
      <div className="w-1/3 h-[400px] overflow-hidden rounded-lg mr-8">
        <img
          src={card.image}
          alt={card.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Contenido - lado derecho */}
      <div className="flex flex-col w-2/3">
        <h3 className="mb-4 text-3xl font-bold md:text-4xl">{card.name}</h3>
        <p className="mb-6 text-sm md:text-base">{card.description}</p>

        {/* Sección de influencia */}
        <div
          className={`p-4 mb-6 rounded-md ${
            isOddCard ? "bg-gray-800" : "bg-gray-100"
          }`}>
          <h4
            className={`mb-2 text-sm font-semibold ${
              isOddCard ? "text-blue-300" : "text-blue-600"
            }`}>
            Influencia en el kiteboarding:
          </h4>
          <p
            className={`text-sm ${
              isOddCard ? "text-gray-300" : "text-gray-600"
            }`}>
            {card.influence}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const CARD_HEIGHT = 500;
