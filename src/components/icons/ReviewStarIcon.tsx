import React from "react";

type ReviewStarIconProps = {
  onClick?: () => void;
  className?: string;
};

const ReviewStarIcon: React.FC<ReviewStarIconProps> = ({
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
      >
        <path
          d="M7.56246 11.875L9.99996 10.3958L12.4375 11.875L11.7916 9.10413L13.9583 7.22913L11.1041 6.99996L9.99996 4.37496L8.89579 6.99996L6.04163 7.22913L8.20829 9.10413L7.56246 11.875ZM1.66663 18.3333V3.33329C1.66663 2.87496 1.82996 2.48274 2.15663 2.15663C2.48329 1.83051 2.87551 1.66718 3.33329 1.66663H16.6666C17.125 1.66663 17.5175 1.82996 17.8441 2.15663C18.1708 2.48329 18.3338 2.87551 18.3333 3.33329V13.3333C18.3333 13.7916 18.1702 14.1841 17.8441 14.5108C17.518 14.8375 17.1255 15.0005 16.6666 15H4.99996L1.66663 18.3333ZM4.29163 13.3333H16.6666V3.33329H3.33329V14.2708L4.29163 13.3333Z"
          fill="black"
        />
      </svg>
    </button>
  );
};

export default ReviewStarIcon;
