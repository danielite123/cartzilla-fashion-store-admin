import React from "react";

type ImportExportIconProps = {
  onClick?: () => void;
  className?: string;
};

const ImportExportIcon: React.FC<ImportExportIconProps> = ({
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.66671 16.6667V5.83337" />
        <path d="M6.66671 16.6667L3.33337 13.3334" />
        <path d="M6.66671 16.6667L10 13.3334" />
        <path d="M13.3334 3.33337V14.1667" />
        <path d="M13.3334 3.33337L16.6667 6.66671" />
        <path d="M13.3334 3.33337L10 6.66671" />
      </svg>
    </button>
  );
};

export default ImportExportIcon;
