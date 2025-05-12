import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { historicBrands } from "../constants/Const";

const TabsFeatures = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="p-4">
      <div className="mx-auto max-w-5xl">
        <Tabs selected={selected} setSelected={setSelected} />

        <AnimatePresence mode="wait">
          {historicBrands.map((brand, index) => {
            return selected === index ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                key={index}>
                <BrandFeature brand={brand} />
              </motion.div>
            ) : undefined;
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-wrap justify-center bg-gradient-to-tr from-sky-300 via-sky-600 to-sky-300 rounded-t-lg">
      {historicBrands.map((brand, index) => {
        return (
          <Tab
            key={index}
            setSelected={setSelected}
            selected={selected === index}
            Icon={brand.logo}
            title={brand.name}
            tabNum={index}
          />
        );
      })}
    </div>
  );
};

const Tab = ({ selected, Icon, title, setSelected, tabNum }) => {
  return (
    <div className="relative w-full sm:w-auto sm:flex-1">
      <button
        onClick={() => setSelected(tabNum)}
        className="flex relative z-0 flex-row gap-2 justify-start items-center p-4 w-full border-b-4 border-sky-200 transition-colors hover:bg-sky-600/65 md:flex-col md:p-6 md:gap-4">
        <Icon
          className={`rounded-lg bg-gradient-to-tr from-sky-900 via-sky-500 to-sky-900 p-2 text-xl text-white shadow-sky-400 transition-all duration-300 w-12 h-12 md:w-16 md:h-16 md:p-3 md:text-2xl ${
            selected
              ? "shadow-lg opacity-100 scale-100"
              : "shadow opacity-50 scale-90"
          }`}
        />

        <span
          className={`text-sm md:text-base text-center font-bold text-slate-600 transition-opacity ${
            selected ? "opacity-100" : "opacity-50"
          }`}>
          {title}
        </span>
      </button>
      {selected && (
        <motion.span
          layoutId="tabs-features-underline"
          className="absolute right-0 bottom-0 left-0 z-10 h-1 bg-sky-600"
        />
      )}
    </div>
  );
};

const BrandFeature = ({ brand }) => (
  <div className="px-0 py-6 w-full md:py-8 md:px-8">
    <div className="flex relative justify-center items-center w-full h-auto min-h-[300px] md:h-96 text-black bg-gradient-to-tr from-sky-300 via-sky-600 to-sky-300 rounded-xl shadow-xl p-4">
      <div className="flex flex-col items-center">
        <brand.marca className="w-full max-w-[240px] md:w-80 h-auto md:h-28 text-black" />
        <h3 className="pt-4 text-2xl font-bold text-center md:text-3xl">
          {brand.name}
        </h3>
        <p className="pt-2 max-w-2xl text-base text-center md:text-lg text-slate-600">
          {brand.description}
        </p>
      </div>
    </div>
  </div>
);

export default TabsFeatures;
