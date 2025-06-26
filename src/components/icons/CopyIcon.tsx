import React from "react";

type CopyIconProps = {
  onClick?: () => void;
  className?: string;
};

const CopyIcon: React.FC<CopyIconProps> = ({ onClick, className }) => {
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
        <g clipPath="url(#clip0_2004_812)">
          <path d="M4.16406 12.4993H3.33073C2.8887 12.4993 2.46478 12.3238 2.15222 12.0112C1.83966 11.6986 1.66406 11.2747 1.66406 10.8327V3.33268C1.66406 2.89065 1.83966 2.46673 2.15222 2.15417C2.46478 1.84161 2.8887 1.66602 3.33073 1.66602H10.8307C11.2728 1.66602 11.6967 1.84161 12.0092 2.15417C12.3218 2.46673 12.4974 2.89065 12.4974 3.33268V4.16602M9.16406 7.49935H16.6641C17.5845 7.49935 18.3307 8.24554 18.3307 9.16602V16.666C18.3307 17.5865 17.5845 18.3327 16.6641 18.3327H9.16406C8.24359 18.3327 7.4974 17.5865 7.4974 16.666V9.16602C7.4974 8.24554 8.24359 7.49935 9.16406 7.49935Z" />
        </g>
        <defs>
          <clipPath id="clip0_2004_812">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
};

export default CopyIcon;
