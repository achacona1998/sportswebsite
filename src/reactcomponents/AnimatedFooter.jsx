import React from "react";
import { motion } from "framer-motion";
import { Logo } from "../constants/icons";
// import { socialMedia } from "../constants/Const";

const AnimatedFooter = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <motion.footer
      className="overflow-hidden relative pt-16 pb-8 text-white bg-gradient-to-br from-blue-900 to-sky-700"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}>
      {/* Decorative wave pattern */}
      <div className="overflow-hidden absolute top-0 left-0 w-full">
        <svg
          className="block relative w-full h-10 text-blue-900"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-sky-800"></path>
        </svg>
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-4">
          {/* Logo and description */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="flex items-center mb-4">
              <motion.div
                className="flex items-center text-3xl font-bold text-white"
                whileHover={{ scale: 1.05 }}>
                <Logo className="mr-2 w-8 h-8" />
                KiteWorld
              </motion.div>
            </div>
            <p className="mb-6 text-sky-100">
              Tu portal de información sobre el apasionante mundo del
              kiteboarding, donde el viento y el agua se convierten en tu mejor
              aventura.
            </p>

            {/* Social media icons */}
            {/* <div className="flex mt-4 space-x-4">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="flex justify-center items-center w-10 h-10 bg-sky-600 rounded-full transition-colors duration-300 hover:bg-sky-500"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}>
                  <span></span>
                </motion.a>
              ))}
            </div> */}
          </motion.div>

          {/* Quick links */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="pb-2 mb-6 text-xl font-semibold text-white border-b border-sky-600">
              Enlaces rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Inicio", href: "#intro" },
                { name: "Estilos", href: "#styles" },
                { name: "Equipación", href: "#equipment" },
                { name: "Cursos", href: "#courses" },
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="flex items-center text-sky-100 transition-colors duration-300 hover:text-white">
                    <svg
                      className="mr-2 w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* More information */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="pb-2 mb-6 text-xl font-semibold text-white border-b border-sky-600">
              Más información
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Marcas", href: "#brands" },
                { name: "Spots", href: "#spots" },
                { name: "Competiciones", href: "#competitions" },
                { name: "Galería", href: "#gallery" },
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="flex items-center text-sky-100 transition-colors duration-300 hover:text-white">
                    <svg
                      className="mr-2 w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal and contact */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <h4 className="pb-2 mb-6 text-xl font-semibold text-white border-b border-sky-600">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Política de privacidad", href: "/" },
                { name: "Términos y condiciones", href: "/" },
                { name: "Cookies", href: "/" },
                { name: "Contacto", href: "#contact" },
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="flex items-center text-sky-100 transition-colors duration-300 hover:text-white">
                    <svg
                      className="mr-2 w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter subscription */}
        {/* <motion.div
          variants={itemVariants}
          className="p-6 mb-12 bg-sky-800 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 gap-6 items-center md:grid-cols-3">
            <div className="md:col-span-1">
              <h4 className="text-xl font-bold text-white">
                Mantente informado
              </h4>
              <p className="text-sky-100">
                Recibe las últimas noticias y ofertas especiales
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-grow px-4 py-3 placeholder-sky-300 text-white bg-sky-700 rounded-lg border border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <motion.button
                  className="px-6 py-3 font-semibold text-white bg-sky-500 rounded-lg transition-colors duration-300 hover:bg-sky-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}>
                  Suscribirse
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div> */}

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="pt-6 mt-8 text-center border-t border-sky-700">
          <p className="text-sky-200">
            &copy; {currentYear} KiteWorld - All rights reserved | Designed and
            implemented by{" "}
            <motion.a
              href="https://sierraesperanzac.com"
              className="font-semibold text-white transition-colors duration-300 hover:text-sky-300"
              whileHover={{ scale: 1.05 }}>
              Sierra-Esperanza Creations
            </motion.a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default AnimatedFooter;
