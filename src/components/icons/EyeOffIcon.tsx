import React from "react";

type EyeOffIconProps = {
  onClick?: () => void;
  className?: string;
};

const EyeOffIcon: React.FC<EyeOffIconProps> = ({ onClick, className }) => {
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
      >
        <path d="M17 16.25L4.5 3.75" />
        <path d="M8.5 8.70131C8.18882 9.04438 8 9.49503 8 9.98859C8 11.0634 8.89543 11.9347 10 11.9347C10.5093 11.9347 10.9741 11.7495 11.3272 11.4445" />
        <path d="M17.0323 11.9347C17.7209 10.904 18 10.0634 18 10.0634C18 10.0634 16.1795 4.25 10 4.25C9.65308 4.25 9.31989 4.26832 9 4.30291" />
        <path d="M14.5 14.4579C13.3521 15.1901 11.8744 15.7079 10 15.6773C3.89744 15.5775 2 10.0634 2 10.0634C2 10.0634 2.88155 7.2484 5.5 5.5361" />
      </svg>
    </button>
  );
};

export default EyeOffIcon;
