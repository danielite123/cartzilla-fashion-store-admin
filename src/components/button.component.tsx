import React from "react";
import LoadingSpinner from "./loading-spinner";

type CustomButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  const isButtonDisabled = disabled || isLoading;

  const baseClasses =
    "inline-flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out cursor-pointer";

  const stateClasses = isButtonDisabled
    ? "bg-gray-400 cursor-not-allowed"
    : "hover:bg-opacity-90 focus:ring-indigo-500";

  const combinedClasses = `${baseClasses} ${stateClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      disabled={isButtonDisabled}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          <span className="ml-2">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default CustomButton;
