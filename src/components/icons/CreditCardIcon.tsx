import React from "react";

type CreditCardIconProps = {
  onClick?: () => void;
  className?: string;
};

const CreditCardIcon: React.FC<CreditCardIconProps> = ({
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="1.3em"
        height="1.3em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.0625 4H4.1875C2.97938 4 2 4.97938 2 6.1875V14.3125C2 15.5206 2.97938 16.5 4.1875 16.5H16.0625C17.2706 16.5 18.25 15.5206 18.25 14.3125V6.1875C18.25 4.97938 17.2706 4 16.0625 4Z" />
        <path d="M2 8H18.25M5.125 12.2188H7V13H5.125V12.2188Z" />
      </svg>
    </button>
  );
};

export default CreditCardIcon;
