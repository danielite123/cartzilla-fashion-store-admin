import React from "react";

type SearchIconProps = {
  onClick?: () => void;
  className?: string;
};

const SearchIcon: React.FC<SearchIconProps> = ({ onClick, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M15.3269 14.44L18.8 17.8M17.68 8.84C17.68 13.1699 14.1699 16.68 9.84 16.68C5.51009 16.68 2 13.1699 2 8.84C2 4.51009 5.51009 1 9.84 1C14.1699 1 17.68 4.51009 17.68 8.84Z" />
      </svg>
    </button>
  );
};

export default SearchIcon;
