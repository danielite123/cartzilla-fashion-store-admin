import React from "react";

type NotificationIconProps = {
  onClick?: () => void;
  className?: string;
};

const NotificationIcon: React.FC<NotificationIconProps> = ({
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.529922 13.394C0.317268 14.7471 1.268 15.6862 2.43205 16.1542C6.89481 17.9486 13.1052 17.9486 17.5679 16.1542C18.732 15.6862 19.6827 14.7471 19.4701 13.394C19.3394 12.5625 18.6932 11.8701 18.2144 11.194C17.5873 10.2975 17.525 9.31971 17.5249 8.27941C17.5249 4.2591 14.1559 1 10 1C5.84413 1 2.47513 4.2591 2.47513 8.27941C2.47503 9.31971 2.41272 10.2975 1.78561 11.194C1.30684 11.8701 0.660612 12.5625 0.529922 13.394Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 20C7.79613 20.6219 8.84747 21 10 21C11.1525 21 12.2039 20.6219 13 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default NotificationIcon;
