import React from "react";

type SkipBackIconProps = {
  onClick?: () => void;
  className?: string;
};

const SkipBackIcon: React.FC<SkipBackIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="1.5em"
        height="1.5em "
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 3V17H11.333V3H12ZM8.66699 12.96L5.70703 10L8.66699 7.04004V12.96Z"
          fill="currentColor"
          stroke="currentColor"
        />
        <path d="M15 2.5V17.5" stroke="black" strokeWidth="2" />
      </svg>
    </button>
  );
};

export default SkipBackIcon;
