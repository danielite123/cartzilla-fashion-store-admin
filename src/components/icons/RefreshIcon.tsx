import React from "react";

type RefreshIconProps = {
  onClick?: () => void;
  className?: string;
};

const RefreshIcon: React.FC<RefreshIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.34314 15.6569C1.21895 12.5327 1.21895 7.46734 4.34315 4.34315C6.31809 2.3682 9.06872 1.64171 11.6143 2.16367M16.4494 5.26467C18.7539 8.39518 18.4897 12.824 15.6569 15.6569C13.6189 17.6948 10.755 18.4034 8.14275 17.7826M14.8644 6.55044V3.55044L17.8644 3.55044L14.8644 6.55044ZM5.04974 13.3639V16.3639H2.04974L5.04974 13.3639Z" />
      </svg>
    </button>
  );
};

export default RefreshIcon;
