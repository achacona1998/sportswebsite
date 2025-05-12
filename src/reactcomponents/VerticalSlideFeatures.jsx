import { featuredSpots } from "../constants/Const";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const VerticalSlideFeatures = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="flex flex-col-reverse gap-6 items-center px-4 py-12 mx-auto max-w-5xl bg-white md:flex-row md:gap-12 md:px-8">
      <AnimatePresence mode="wait">
        {featuredSpots.map((spot, index) => {
          return selected === index ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              key={index}
              className="w-full">
              <SpotFeature spot={spot} />
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
      <Tabs
        selected={selected}
        setSelected={setSelected}
        spots={featuredSpots}
      />
    </section>
  );
};

const Tabs = ({ selected, setSelected, spots }) => {
  return (
    <div className="overflow-scroll w-full shrink-0 md:w-fit md:max-w-xs">
      {spots.map((spot, index) => {
        return (
          <Tab
            key={index}
            setSelected={setSelected}
            selected={selected === index}
            title={spot.name}
            tabNum={index}
          />
        );
      })}
    </div>
  );
};

const Tab = ({ selected, title, setSelected, tabNum }) => {
  return (
    <div className="relative w-full group md:w-fit">
      <button
        onClick={() => setSelected(tabNum)}
        className="relative z-0 flex w-full border-l-[6px] border-slate-200 p-4 transition-colors group-hover:border-slate-300 md:flex-col md:border-l-8 md:p-6">
        <span
          className={`min-w-[150px] max-w-[200px] text-start text-xl font-bold transition-colors md:text-2xl ${
            selected
              ? "text-blue-500"
              : "text-slate-400 group-hover:text-slate-500"
          }`}>
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="vertical-slide-feature-slider"
          className="absolute bottom-0 left-0 top-0 z-10 w-[6px] bg-blue-500 md:w-2"
        />
      )}
    </div>
  );
};

const SpotFeature = ({ spot }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Mostrar los detalles después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 700); // Mostrar detalles después de 700ms

    return () => clearTimeout(timer);
  }, [spot.id]); // Reset cuando cambia el spot

  return (
    <div className="w-full">
      <motion.div
        className="relative h-[500px] w-full rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Imagen de fondo */}
        <img
          src={spot.image}
          alt={spot.name}
          className="object-cover absolute w-full h-full"
        />

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t to-black/30 from-black/90 via-black/70" />

        {/* Información del spot */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              className="absolute right-0 bottom-0 left-0 z-10 p-6 text-white"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <h2 className="mb-2 text-3xl font-bold">{spot.name}</h2>
              <p className="mb-4 text-sm text-gray-200">{spot.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-300">
                    Temporada
                  </h3>
                  <p>{spot.season}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-300">Nivel</h3>
                  <p>{spot.level}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-300">
                    Viento
                  </h3>
                  <p>{spot.wind}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold text-blue-300">
                  Aspectos destacados
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {spot.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="px-3 py-1 text-sm rounded-full border bg-blue-500/30 border-blue-400/30">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default VerticalSlideFeatures;
