import React from "react";

type ExternalLinkIconProps = {
  onClick?: () => void;
  className?: string;
};

const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = ({
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.19997 1.59998H3.99998C2.67449 1.59998 1.59998 2.67449 1.59998 3.99998V12.0001C1.59998 13.3255 2.67449 14.4 3.99998 14.4H12C13.3255 14.4 14.4 13.3255 14.4 12.0001V8.79998M10.3996 1.60017L14.4 1.59998M14.4 1.59998V5.20007M14.4 1.59998L7.59939 8.39978" />
      </svg>
    </button>
  );
};

export default ExternalLinkIcon;
