import React from "react";

type LogoutIconProps = {
  onClick?: () => void;
  className?: string;
};

const LogoutIcon: React.FC<LogoutIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="1.5em"
        height="1.5em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.16667 4.16667H9.16667C9.625 4.16667 10 3.79167 10 3.33333C10 2.875 9.625 2.5 9.16667 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V15.8333C2.5 16.75 3.25 17.5 4.16667 17.5H9.16667C9.625 17.5 10 17.125 10 16.6667C10 16.2083 9.625 15.8333 9.16667 15.8333H4.16667V4.16667Z"
          fill="currentColor"
        />
        <path
          d="M17.2083 9.70837L14.8833 7.38337C14.8254 7.32383 14.751 7.28293 14.6696 7.26592C14.5883 7.24891 14.5037 7.25656 14.4268 7.28788C14.3498 7.3192 14.284 7.37277 14.2376 7.44174C14.1913 7.51071 14.1666 7.59194 14.1667 7.67503V9.1667H8.33333C7.875 9.1667 7.5 9.5417 7.5 10C7.5 10.4584 7.875 10.8334 8.33333 10.8334H14.1667V12.325C14.1667 12.7 14.6167 12.8834 14.875 12.6167L17.2 10.2917C17.3667 10.1334 17.3667 9.8667 17.2083 9.70837Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default LogoutIcon;
