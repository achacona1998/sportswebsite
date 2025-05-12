import { motion } from "framer-motion";
import {
  DuotoneLogo,
  CoreKiteboardingLogo,
  AirushLogo,
  NorthKiteboardingLogo,
  CabrinhaLogo,
  NaishLogo,
  FOneLogo,
  OzoneLogo,
  HarlemLogo,
  WainmanHawaiiLogo,
  BestKiteboardingLogo,
  LiquidForceLogo,
} from "../constants/icons.jsx";
import { useState } from "react";
import { SpringModal } from "./modal.jsx";
import { topBrands, historicBrands } from "../constants/Const.js";

const RibbonLogos = () => {
  const [activeModal, setActiveModal] = useState(null);

  // Función para obtener la información de la marca
  const getBrandInfo = (brandName) => {
    return [...topBrands, ...historicBrands].find(
      (brand) => brand.name === brandName
    );
  };

  return (
    <>
      <section className="overflow-hidden py-20">
        <div className="flex translate-y-[50%] rotate-[7deg] scale-110 overflow-hidden border-y-4 border-sky-700 bg-gradient-to-tr from-sky-300 via-sky-600 to-sky-300 ">
          <TranslateWrapper>
            <LogoItemsTop setActiveModal={setActiveModal} />
          </TranslateWrapper>
          <TranslateWrapper>
            <LogoItemsTop setActiveModal={setActiveModal} />
          </TranslateWrapper>
          <TranslateWrapper>
            <LogoItemsTop setActiveModal={setActiveModal} />
          </TranslateWrapper>
        </div>
        <div className="flex -translate-y-[50%] -rotate-[7deg] scale-110 overflow-hidden border-y-4 border-sky-700 bg-gradient-to-tr from-sky-300 via-sky-600 to-sky-300">
          <TranslateWrapper reverse>
            <LogoItemsBottom setActiveModal={setActiveModal} />
          </TranslateWrapper>
          <TranslateWrapper reverse>
            <LogoItemsBottom setActiveModal={setActiveModal} />
          </TranslateWrapper>
          <TranslateWrapper reverse>
            <LogoItemsBottom setActiveModal={setActiveModal} />
          </TranslateWrapper>
        </div>
      </section>
      <SpringModal
        isOpen={activeModal !== null}
        setIsOpen={() => setActiveModal(null)}
        brandInfo={activeModal ? getBrandInfo(activeModal) : null}
      />
    </>
  );
};

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex px-2">
      {children}
    </motion.div>
  );
};

const LogoItem = ({ Icon, name, setActiveModal }) => {
  return (
    <button
      onClick={() => setActiveModal(name)}
      className="flex gap-4 justify-center items-center px-2 py-2 text-black transition-colors hover:bg-black/20 md:py-6">
      <Icon className="w-8 h-8 text-black md:w-12 md:h-12 lg:w-16 lg:h-16" />
      <span className="text-xl font-semibold uppercase whitespace-nowrap md:text-3xl">
        {name}
      </span>
    </button>
  );
};

const LogoItemsTop = ({ setActiveModal }) => (
  <>
    <LogoItem
      Icon={DuotoneLogo}
      name="Duotone"
      setActiveModal={setActiveModal}
    />
    <LogoItem
      Icon={CoreKiteboardingLogo}
      name="Core Kiteboarding"
      setActiveModal={setActiveModal}
    />
    <LogoItem Icon={AirushLogo} name="Airush" setActiveModal={setActiveModal} />
    <LogoItem
      Icon={NorthKiteboardingLogo}
      name="North Kiteboarding"
      setActiveModal={setActiveModal}
    />
    <LogoItem
      Icon={CabrinhaLogo}
      name="Cabrinha"
      setActiveModal={setActiveModal}
    />
    <LogoItem Icon={NaishLogo} name="Naish" setActiveModal={setActiveModal} />
    <LogoItem Icon={FOneLogo} name="F-One" setActiveModal={setActiveModal} />
    <LogoItem Icon={OzoneLogo} name="Ozone" setActiveModal={setActiveModal} />
    <LogoItem Icon={HarlemLogo} name="Harlem" setActiveModal={setActiveModal} />
    <LogoItem
      Icon={WainmanHawaiiLogo}
      name="Wainman Hawaii"
      setActiveModal={setActiveModal}
    />
  </>
);

const LogoItemsBottom = ({ setActiveModal }) => (
  <>
    <LogoItem
      Icon={BestKiteboardingLogo}
      name="Best Kiteboarding"
      setActiveModal={setActiveModal}
    />
    <LogoItem Icon={AirushLogo} name="Airush" setActiveModal={setActiveModal} />
    <LogoItem
      Icon={CabrinhaLogo}
      name="Cabrinha"
      setActiveModal={setActiveModal}
    />
    <LogoItem
      Icon={LiquidForceLogo}
      name="Liquid Force"
      setActiveModal={setActiveModal}
    />
    <LogoItem Icon={OzoneLogo} name="Ozone" setActiveModal={setActiveModal} />
    <LogoItem
      Icon={DuotoneLogo}
      name="Duotone"
      setActiveModal={setActiveModal}
    />
    <LogoItem
      Icon={CoreKiteboardingLogo}
      name="Core Kiteboarding"
      setActiveModal={setActiveModal}
    />
    <LogoItem Icon={FOneLogo} name="F-One" setActiveModal={setActiveModal} />
    <LogoItem
      Icon={WainmanHawaiiLogo}
      name="Wainman Hawaii"
      setActiveModal={setActiveModal}
    />
    <LogoItem Icon={NaishLogo} name="Naish" setActiveModal={setActiveModal} />
  </>
);

export default RibbonLogos;
