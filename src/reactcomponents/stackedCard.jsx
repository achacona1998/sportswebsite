import { useState } from "react";
import { motion } from "framer-motion";
import { ikoLevels } from "../constants/Const";
import AnimatedSectionSubHeading from "./AnimatedSectionSubHeading";

const StackedCardTestimonials = () => {
  const [selected, setSelected] = useState(0);
  return (
    <section className="grid overflow-hidden grid-cols-1 gap-8 items-center px-4 py-24 mb-5 lg:px-8 lg:grid-cols-2 lg:gap-4">
      <div className="p-4">
        <AnimatedSectionSubHeading
          title="Niveles de Certificación IKO"
          description="La IKO ha estandarizado la enseñanza del kiteboarding a nivel mundial
          con un sistema de 5 niveles"
          client:visible
        />

        <SelectBtns
          numTracks={ikoLevels.length}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      <Cards levels={ikoLevels} setSelected={setSelected} selected={selected} />
    </section>
  );
};

const SelectBtns = ({ numTracks, setSelected, selected }) => {
  return (
    <div className="flex gap-1 mt-8">
      {Array.from(Array(numTracks).keys()).map((n) => {
        return (
          <button
            key={n}
            onClick={() => setSelected(n)}
            className="h-1.5 w-full bg-slate-300 relative">
            {selected === n ? (
              <motion.span
                className="absolute top-0 bottom-0 left-0 bg-slate-950"
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 5,
                }}
                onAnimationComplete={() => {
                  setSelected(selected === numTracks - 1 ? 0 : selected + 1);
                }}
              />
            ) : (
              <span
                className="absolute top-0 bottom-0 left-0 bg-slate-950"
                style={{
                  width: selected > n ? "100%" : "0%",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

const Cards = ({ levels, selected, setSelected }) => {
  return (
    <div className="p-4 relative h-[450px] lg:h-[500px] shadow-xl">
      {levels.map((level, i) => {
        return (
          <Card
            key={i}
            level={level.level}
            title={level.title}
            description={level.description}
            skills={level.skills}
            position={i}
            selected={selected}
            setSelected={setSelected}
          />
        );
      })}
    </div>
  );
};

const Card = ({
  level,
  title,
  description,
  skills,
  position,
  selected,
  setSelected,
}) => {
  const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
  const offset = position <= selected ? 0 : 95 + (position - selected) * 2;
  const background = position % 2 ? "black" : "white";
  const color = position % 2 ? "white" : "black";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background,
        color,
      }}
      animate={{
        x: `${offset}%`,
        scale,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      onClick={() => setSelected(position)}
      className="flex absolute top-0 left-0 flex-col justify-between p-8 w-full min-h-full cursor-pointer lg:p-12">
      <div className="flex items-center">
        <div>
          <h3 className="text-xl font-bold">{level}</h3>
          <h4 className="text-lg">{title}</h4>
        </div>
      </div>

      <p className="my-6 text-base italic">{description}</p>

      <div className="mt-2">
        <h4 class="mb-2 font-semibold text-blue-600">
          Habilidades adquiridas:
        </h4>
        <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {skills.map((skill, idx) => (
            <li class="flex items-start">
              <svg
                class="flex-shrink-0 mr-2 w-5 h-5 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default StackedCardTestimonials;
