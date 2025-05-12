import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { competitions } from "../constants/Const";

export const TextParallaxContentExample = () => {
  return (
    <div className="mb-7">
      {competitions.map((competition, index) => (
        <TextParallaxContent
          key={index}
          imgUrl={competition.image}
          subheading={competition.category}
          heading={competition.name}>
          <CompetitionContent competition={competition} />
        </TextParallaxContent>
      ))}
    </div>
  );
};

const IMG_PADDING = 12;
const TOP_REDUCTION = 80;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2 + TOP_REDUCTION}px)`,
        top: `${IMG_PADDING + TOP_REDUCTION}px`,
        scale,
      }}
      ref={targetRef}
      className="overflow-hidden sticky z-0 rounded-3xl">
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="flex absolute top-0 left-0 flex-col justify-center items-center w-full h-screen text-white">
      <p className="mb-2 text-xl text-center md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-4xl font-bold text-center md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const CompetitionContent = ({ competition }) => (
  <div className="grid gap-8 px-4 pb-16 mx-auto max-w-5xl">
    <div className="">
      <p className="mb-2 text-xl text-neutral-600 md:text-2xl">
        {competition.description}
      </p>
      {competition.champions && (
        <div className="p-4 mb-4 rounded-lg bg-neutral-100">
          <h3 className="mb-2 text-xl font-semibold text-neutral-600 md:text-2xl">
            Campeones Destacados:
          </h3>
          <ul className="list-disc list-inside">
            {competition.champions.map((highlight, idx) => (
              <li key={idx} className="text-md text-neutral-600 md:text-xl">
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={competition.website || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-9 py-4 text-xl text-white rounded transition-colors bg-neutral-900 hover:bg-neutral-700">
        Más información
      </a>
    </div>
  </div>
);
