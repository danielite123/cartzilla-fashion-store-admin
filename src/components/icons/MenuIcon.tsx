import React from "react";

type MenuIconProps = {
  onClick?: () => void;
  className?: string;
};

const MenuIcon: React.FC<MenuIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.16663 4.16663H9.99996H15.8333M4.16663 9.99996H15.8333M4.16663 15.8333H9.99996H15.8333" />
      </svg>
    </button>
  );
};

export default MenuIcon;
