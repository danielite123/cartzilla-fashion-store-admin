import React from "react";

type SearchBoxIconProps = {
  onClick?: () => void;
  className?: string;
};

const SearchBoxIcon: React.FC<SearchBoxIconProps> = ({
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="1.3em"
        height="1.3em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7.91667" cy="7.91667" r="5.41667" />
        <rect
          x="8.33594"
          y="8.33398"
          width="9.16667"
          height="9.16667"
          rx="2.2"
        />
      </svg>
    </button>
  );
};

export default SearchBoxIcon;
