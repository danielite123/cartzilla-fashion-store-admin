import React from "react";

type AddCircleIconProps = {
  onClick?: () => void;
  className?: string;
};

const AddCircleIcon: React.FC<AddCircleIconProps> = ({
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="black"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="10" r="7.5" />
        <path d="M7.5 10H12.5" />
        <path d="M10 7.5V12.5" />
      </svg>
    </button>
  );
};

export default AddCircleIcon;
