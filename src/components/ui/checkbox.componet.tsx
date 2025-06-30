import React from "react";
import { motion, AnimatePresence } from "@/lib/framer";

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "box" | "switch" | "toggle";
  label?: React.ReactNode;
  disabled?: boolean;
}

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
    {...props}
  >
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      exit={{ pathLength: 0 }}
      transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  checked,
  onChange,
  variant = "box",
  label,
  disabled = false,
}) => {
  const containerClasses = `flex items-center select-none ${
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
  }`;

  const commonVisualClasses = `relative inline-flex items-center justify-center transition-colors duration-200 ease-in-out
    border
    focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500`;

  const variantClasses = {
    box: {
      container: `h-4 w-4 rounded ${
        checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
      }`,
      thumb: "h-4 w-4 text-white",
    },
    switch: {
      container: `h-7 w-12 rounded-full ${
        checked
          ? "bg-green-500 border-green-500"
          : "bg-gray-300 border-gray-300"
      }`,
      thumb: "h-5 w-5 bg-white rounded-full shadow-md",
    },
    toggle: {
      container: `h-8 w-14 rounded-full ${
        checked
          ? "bg-purple-600 border-purple-600"
          : "bg-gray-700 border-gray-600"
      }`,
      thumb: "h-6 w-6 bg-white rounded-full shadow-lg",
    },
  };

  const currentVariant = variantClasses[variant];

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  } as const;

  return (
    <label className={containerClasses}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
      />

      <div className={`${commonVisualClasses} ${currentVariant.container}`}>
        {variant === "box" && (
          <AnimatePresence>
            {checked && <CheckIcon className={currentVariant.thumb} />}
          </AnimatePresence>
        )}

        {variant === "switch" && (
          <motion.div
            className={currentVariant.thumb}
            layout
            transition={spring}
            style={{ x: checked ? 18 : 2 }}
          />
        )}

        {variant === "toggle" && (
          <motion.div
            className={`absolute left-1 ${currentVariant.thumb}`}
            layout
            transition={spring}
            style={{ x: checked ? "1.5rem" : "0rem" }} // 24px or 1.5rem
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={checked ? "on" : "off"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
                className="flex h-full w-full items-center justify-center text-purple-600"
              >
                {checked && "✓"}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {label && (
        <span className="ml-3 text-gray-700 dark:text-gray-200">{label}</span>
      )}
    </label>
  );
};

export default Checkbox;
