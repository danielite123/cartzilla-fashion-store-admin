import React from "react";

type GroupUsersIconProps = {
  className?: string;
  onClick?: () => void;
};

const GroupUsersIcon: React.FC<GroupUsersIconProps> = ({
  className,
  onClick,
}) => {
  return (
    <svg
      width="1.3em"
      height="1.3em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <ellipse
        cx="7.4974"
        cy="5.83333"
        rx="3.33333"
        ry="3.33333"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 17.5V15.8333C2.5 13.9924 3.99238 12.5 5.83333 12.5H9.16667C11.0076 12.5 12.5 13.9924 12.5 15.8333V17.5"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3359 2.60742C14.8109 2.98506 15.8425 4.31408 15.8425 5.83659C15.8425 7.3591 14.8109 8.68811 13.3359 9.06576"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 17.5V15.8333C17.4913 14.3205 16.4648 13.0032 15 12.625"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GroupUsersIcon;
