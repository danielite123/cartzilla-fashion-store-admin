import React from "react";

type ControlSettingsIconProps = {
  onClick?: () => void;
  className?: string;
};

const ControlSettingsIcon: React.FC<ControlSettingsIconProps> = ({
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
        stroke="black"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.5026 4.16602V5.83268" />
        <path d="M12.5026 9.16602V10.8327" />
        <path d="M12.5026 14.166V15.8327" />
        <path d="M4.16667 4.16602H15.8333C16.7538 4.16602 17.5 4.91221 17.5 5.83268V8.33268C16.5795 8.33268 15.8333 9.07887 15.8333 9.99935C15.8333 10.9198 16.5795 11.666 17.5 11.666V14.166C17.5 15.0865 16.7538 15.8327 15.8333 15.8327H4.16667C3.24619 15.8327 2.5 15.0865 2.5 14.166V11.666C3.42047 11.666 4.16667 10.9198 4.16667 9.99935C4.16667 9.07887 3.42047 8.33268 2.5 8.33268V5.83268C2.5 4.91221 3.24619 4.16602 4.16667 4.16602Z" />
      </svg>
    </button>
  );
};

export default ControlSettingsIcon;
