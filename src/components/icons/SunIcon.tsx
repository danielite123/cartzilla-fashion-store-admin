import React from "react";

type SunIconProps = {
  onClick?: () => void;
  className?: string;
};

const SunIcon: React.FC<SunIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="black"
        strokeWidth="1.77778"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M9.9983 13.5564C11.962 13.5564 13.5539 11.9645 13.5539 10.0009C13.5539 8.03719 11.962 6.44531 9.9983 6.44531C8.03463 6.44531 6.44275 8.03719 6.44275 10.0009C6.44275 11.9645 8.03463 13.5564 9.9983 13.5564Z" />
        <path d="M17.1111 10H18M2 10H2.88889M10 17.1111V18M10 2V2.88889M15.0284 15.0284L15.6569 15.6569M4.34311 4.34311L4.97156 4.97156M4.97156 15.0284L4.34311 15.6569M15.6569 4.34311L15.0284 4.97156" />
      </svg>
    </button>
  );
};

export default SunIcon;
