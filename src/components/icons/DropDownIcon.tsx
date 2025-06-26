import React from "react";

type DropDownIconProps = {
  onClick?: () => void;
  className?: string;
};

const DropDownIcon: React.FC<DropDownIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="12"
        height="6"
        viewBox="0 0 12 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 0.500038C11 0.500038 7.31756 5.49999 5.99996 5.5C4.68237 5.50001 1 0.499999 1 0.499999"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default DropDownIcon;
