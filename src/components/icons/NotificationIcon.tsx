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
        width="1.5em"
        height="1.5em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.33333 17.5H11.6667C11.6667 18.4166 10.9167 19.1666 10 19.1666C9.08333 19.1666 8.33333 18.4166 8.33333 17.5ZM17.5 15.8333V16.6666H2.5V15.8333L4.16667 14.1666V9.16663C4.16667 6.58329 5.83333 4.33329 8.33333 3.58329V3.33329C8.33333 2.41663 9.08333 1.66663 10 1.66663C10.9167 1.66663 11.6667 2.41663 11.6667 3.33329V3.58329C14.1667 4.33329 15.8333 6.58329 15.8333 9.16663V14.1666L17.5 15.8333ZM14.1667 9.16663C14.1667 6.83329 12.3333 4.99996 10 4.99996C7.66667 4.99996 5.83333 6.83329 5.83333 9.16663V15H14.1667V9.16663Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default NotificationIcon;
