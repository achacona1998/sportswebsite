import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "../constants/icons";

const AnimatedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Estilos", href: "#styles" },
    { name: "Equipación", href: "#equipment" },
    { name: "Cursos", href: "#courses" },
    { name: "Spots", href: "#spots" },
    { name: "Competiciones", href: "#competitions" },
  ];

  const mobileLinks = [
    { name: "Inicio", href: "#intro" },
    ...navLinks,
    { name: "Marcas", href: "#brands" },
    { name: "Galeria", href: "#gallery" },
  ];

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 ${
        scrolled
          ? "py-2 shadow-md backdrop-blur-sm bg-sky-300/40"
          : "py-4 mt-2 bg-transparent"
      }`}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <a href="#intro" className="flex items-center">
              <Logo
                className={`mr-2 w-10 h-10 ${
                  scrolled ? "text-blue-900" : "text-white text-shadow-sm"
                }`}
              />
              <span
                className={`text-2xl font-black lg:text-3xl md:text-xl ${
                  scrolled ? "text-blue-900" : "text-white text-shadow-sm"
                }`}>
                KiteWorld
              </span>
            </a>
          </motion.div>

          {/* Desktop menu */}
          <nav className="hidden md:block">
            <motion.ul
              className="flex space-x-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                staggerChildren: 0.1,
                delayChildren: 0.2,
              }}>
              {navLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  <a
                    href={link.href}
                    className={`relative px-4 py-2 text-base lg:text-lg font-bold rounded-full transition-all duration-300 ${
                      scrolled
                        ? "text-blue-900 hover:text-white hover:bg-blue-600"
                        : "text-white hover:text-blue-900 hover:bg-white/90"
                    }`}>
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <a
                  href="#gallery"
                  className={`px-6 py-2 text-lg font-bold rounded-full transition-all duration-300 ${
                    scrolled
                      ? "text-white bg-blue-600 hover:bg-blue-700"
                      : "text-blue-900 bg-white/90 hover:bg-white"
                  }`}>
                  Galería
                </a>
              </motion.li>
            </motion.ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              type="button"
              id="mobile-menu-button"
              onClick={toggleMenu}
              className={`p-2 rounded-full focus:outline-none ${
                scrolled
                  ? "text-blue-900 hover:bg-blue-100"
                  : "text-white hover:bg-white/20"
              }`}
              whileTap={{ scale: 0.9 }}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className={` md:hidden ${
              !scrolled && "backdrop-blur-sm bg-sky-300/40"
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}>
            <motion.ul
              className="px-4 py-4 space-y-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.07,
                  },
                },
              }}>
              {mobileLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-4 py-3 text-lg font-medium text-white rounded-lg transition-colors duration-300 hover:bg-blue-500">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AnimatedNavbar;
