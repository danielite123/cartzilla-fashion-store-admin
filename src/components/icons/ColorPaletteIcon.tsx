import React from "react";

type ColorPaletteIconProps = {
  onClick?: () => void;
  className?: string;
};

const ColorPaletteIcon: React.FC<ColorPaletteIconProps> = ({
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      <svg
        width="1.3em"
        height="1.3em"
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M34.07 50.93S53.86 44.38 45.68 26.6c0 0-4.8-11.46-19.31-13.27S8.3 20.8 8.3 20.8 1.81 33.68 13.1 35c1.62.19 5-.56 6.4 1.33s.29 4.2 0 8.8c-.16 2.56 1.77 8.74 14.57 5.8Z" />
        <circle cx="17.2" cy="24.01" r="3.59" />
        <circle cx="38.02" cy="28.02" r="2.43" />
        <circle cx="38.02" cy="39.04" r="2.43" />
        <circle cx="28.14" cy="44.38" r="2.43" />
        <path d="M54 12.62c-.69 3.31-2.07 10.9-2.18 27a.41.41 0 0 0 .41.41h4.91a.41.41 0 0 0 .41-.42c-.1-2.82-.74-18.12-2.75-27a.41.41 0 0 0-.8 0Z" />
        <path d="M57.48 43.8c0 1.53-1.92 7.37-2.78 7.37s-2.78-5.84-2.78-7.37a2.78 2.78 0 1 1 5.56 0Z" />
      </svg>
    </button>
  );
};

export default ColorPaletteIcon;
