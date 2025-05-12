import { AnimatePresence, motion } from "framer-motion";

export const SpringModal = ({ isOpen, setIsOpen, brandInfo }) => {
  return (
    <AnimatePresence>
      {isOpen && brandInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="grid overflow-y-scroll fixed inset-0 z-50 place-items-center p-8 backdrop-blur cursor-pointer bg-slate-900/20">
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="overflow-hidden relative p-6 w-full max-w-lg text-white bg-gradient-to-br from-sky-600 via-emerald-400 to-sky-600 rounded-lg shadow-xl cursor-default">
            <div className="relative z-10 text-black">
              <div className="grid place-items-center p-4 mx-auto mb-4 w-24 h-24 bg-white rounded-full">
                <brandInfo.logo className="w-full h-full" />
              </div>
              <h3 className="mb-4 text-3xl font-bold text-center">
                {brandInfo.name}
              </h3>
              <p className="mb-4 text-center">{brandInfo.description}</p>
              {brandInfo.featured && (
                <div className="p-4 mb-4 rounded-lg bg-white/10">
                  <h4 className="mb-2 font-semibold">Productos Destacados:</h4>
                  <p className="">{brandInfo.featured}</p>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="py-2 w-full font-semibold bg-white rounded transition-opacity hover:opacity-90">
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
