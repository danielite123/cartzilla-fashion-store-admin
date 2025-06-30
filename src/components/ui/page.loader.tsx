"use client";

import { useLoadingStore } from "@/store/loading-store";
import { AnimatePresence, motion } from "@/lib/framer";

const pulseVariant = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
    } as const,
  },
};

const Loader = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-white"
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          <div className="flex items-baseline">
            <motion.span
              className="text-4xl italic font-extrabold text-green-400"
              variants={pulseVariant}
              animate="animate"
            >
              C
            </motion.span>
            <motion.span
              className="text-4xl italic font-extrabold text-black"
              variants={pulseVariant}
              animate="animate"
            >
              Z
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
