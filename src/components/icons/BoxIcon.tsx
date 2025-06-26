import React from "react";

type BoxIconProps = {
  onClick?: () => void;
  className?: string;
};

const BoxIcon: React.FC<BoxIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        id="Category--Streamline-Tabler"
        height="24"
        width="24"
      >
        <desc>Category Streamline Icon: https://streamlinehq.com</desc>
        <path d="M4 4h6v6H4z" strokeWidth="2"></path>
        <path d="M14 4h6v6h-6z" strokeWidth="2"></path>
        <path d="M4 14h6v6H4z" strokeWidth="2"></path>
        <path d="M14 17a3 3 0 1 0 6 0 3 3 0 1 0 -6 0" strokeWidth="2"></path>
      </svg>
    </button>
  );
};

export default BoxIcon;
