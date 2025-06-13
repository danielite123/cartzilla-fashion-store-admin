import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
}

export const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  variant = "primary",
}) => {
  const baseStyles =
    "px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all duration-200";
  const variants: Record<string, string> = {
    primary: "bg-accent text-white",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};
