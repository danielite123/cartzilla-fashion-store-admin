import React from "react";

type StarIconProps = {
  onClick?: () => void;
  className?: string;
};

const StarIcon: React.FC<StarIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="1.3em"
        height="1.3em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99937 14.7913L4.85604 17.4955L5.83854 11.768L1.67188 7.71214L7.42187 6.8788L9.99354 1.66797L12.5652 6.8788L18.3152 7.71214L14.1485 11.768L15.131 17.4955L9.99937 14.7913Z"
        />
      </svg>
    </button>
  );
};

export default StarIcon;
