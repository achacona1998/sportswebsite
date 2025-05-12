import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useMeasure from "react-use-measure";
import { QUESTIONS, TABS } from "../constants/Const";
import AnimatedSectionHeading from "./AnimatedSectionHeading";

export const TabsFAQ = () => {
  const [selected, setSelected] = useState(TABS[0]);

  return (
    <section className="overflow-hidden px-4 py-12">
      <Heading />
      <Tabs selected={selected} setSelected={setSelected} />
      <Questions selected={selected} />
    </section>
  );
};

const Heading = () => {
  return (
    <AnimatedSectionHeading
      title="FAQs"
      description="Let's answer some questions"
      client:visible
    />
  );
};

const Tabs = ({ selected, setSelected }) => {
  return (
    <div className="flex relative z-10 flex-wrap gap-4 justify-center items-center">
      {TABS.map((tab) => (
        <button
          onClick={() => setSelected(tab)}
          className={`relative overflow-hidden whitespace-nowrap rounded-md border-[1px] px-3 py-1.5 text-sm font-medium transition-colors duration-500 ${
            selected === tab
              ? "border-sky-500 text-slate-50"
              : "border-slate-600 bg-transparent text-slate-800"
          }`}
          key={tab}>
          <span className="relative z-10">{tab}</span>
          <AnimatePresence>
            {selected === tab && (
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "backIn",
                }}
                className="absolute inset-0 z-0 bg-gradient-to-r from-sky-900 via-sky-700 to-sky-900"
              />
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
};

const Questions = ({ selected }) => {
  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <AnimatePresence mode="wait">
        {Object.entries(QUESTIONS).map(([tab, questions]) => {
          return selected === tab ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: "backIn",
              }}
              className="space-y-4"
              key={tab}>
              {questions.map((q, idx) => (
                <Question key={idx} {...q} />
              ))}
            </motion.div>
          ) : undefined;
        })}
      </AnimatePresence>
    </div>
  );
};

const Question = ({ question, answer }) => {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      animate={open ? "open" : "closed"}
      className={`rounded-xl border-[1px] border-sky-700 px-4 transition-colors ${
        open ? "bg-gradient-to-r from-sky-800 via-sky-600 to-sky-800" : "bg-gradient-to-r from-sky-900 via-sky-700 to-sky-900"
      }`}>
      <button
        onClick={() => setOpen((pv) => !pv)}
        className="flex gap-4 justify-between items-center py-4 w-full">
        <span
          className={`text-left text-lg font-medium transition-colors ${
            open ? "text-white" : "text-slate-300"
          }`}>
          {question}
        </span>
        <motion.span
          variants={{
            open: {
              rotate: "45deg",
            },
            closed: {
              rotate: "0deg",
            },
          }}>
          <FiPlus
            className={`text-2xl transition-colors ${
              open ? "text-white" : "text-slate-300"
            }`}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? height : "0px",
          marginBottom: open ? "24px" : "0px",
        }}
        className="overflow-hidden text-white">
        <p ref={ref}>{answer}</p>
      </motion.div>
    </motion.div>
  );
};

